import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express, { Request as ExpressRequest, Response as ExpressResponse } from "express";
import bodyParser from "body-parser";
import { ViteDevServer } from "vite";

////////////////////////
// Types
////////////////////////
export type Request = ExpressRequest;
export type Response = ExpressResponse;

////////////////////////
// Constants
////////////////////////
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p: string) => path.resolve(__dirname, p);
const isTest = process.env.VITEST;

////////////////////////
// Framework Server
////////////////////////
async function createServer(root = process.cwd(), isProd = process.env.NODE_ENV === "production", hmrPort?: number) {
  const indexProd = isProd ? fs.readFileSync(resolve("dist/client/index.html"), "utf-8") : "";

  const app = express();

  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());

  ////////////////////////
  // Framework Middleware
  ////////////////////////
  const { middleware } = await import("./src/middleware.ts");
  app.use((req, res, next) => {
    middleware(req, res);
    next();
  });

  ////////////////////////
  // Framework API Routes
  ////////////////////////
  const routeHandlers = await Promise.all(
    fs
      .readdirSync(resolve("src/routes/api"))
      .filter((file) => file.endsWith(".ts"))
      .map(async (file) => {
        const route = `/api/${file.replace(".ts", "")}`;
        const { GET } = await import(`./src/routes/api/${file}`);
        return { route, GET };
      })
  );
  app.use("/api", (req, res) => {
    const url = req.originalUrl;
    const routeHandler = routeHandlers.find((handler) => handler.route === url);

    if (routeHandler) {
      routeHandler.GET(req, res);
    } else {
      res.status(404).send({ error: "Not found" });
    }
  });

  ////////////////////////
  // Vite Server
  ////////////////////////
  let vite: ViteDevServer | null = null;
  if (!isProd) {
    vite = await (
      await import("vite")
    ).createServer({
      root,
      logLevel: isTest ? "error" : "info",
      server: {
        middlewareMode: true,
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100,
        },
        hmr: {
          port: hmrPort,
        },
      },
      appType: "custom",
    });
    // use vite's connect instance as middleware
    app.use(vite.middlewares);
  } else {
    app.use((await import("compression")).default());
    app.use(
      (await import("serve-static")).default(resolve("dist/client"), {
        index: false,
      })
    );
  }

  ////////////////////////
  // Framework SSR
  ////////////////////////
  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;

      let template, render;
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve("index.html"), "utf-8");
        template = await vite!.transformIndexHtml(url, template);
        render = (await vite!.ssrLoadModule("/src/entry-server.tsx")).render;
      } else {
        template = indexProd;
        // @ts-ignore
        render = (await import("./dist/server/entry-server.tsx")).render;
      }

      const { appHtml, styles, ssrContext } = await render(url);

      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(`/*injected-styles*/`, styles)
        .replace(`// <!--ssr-context-->`, `window.__BP_DATA__=${JSON.stringify(ssrContext).replace(/</g, "\\u003c")}`);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e: any) {
      !isProd && vite!.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
}

if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(5173, () => {
      console.log("http://localhost:5173");
    })
  );
}
