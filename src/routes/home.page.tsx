import { PostCard } from "@/components/posts/PostCard";
import { usePostsInfiniteQuery } from "@/hooks/posts/usePostsInfiniteQuery";
import { invariant } from "@apollo/client/utilities/globals";

import { ModeToggle } from "@/components/layout/mode-toggle";
import { Container } from "@/components/ui/container";
import { Banner } from "@/components/home/banner";
import { Button } from "@/components/ui/button";

export function HomePage() {
  // const { data, loading, error } = usePostsInfiniteQuery();

  // if (loading) return "Loading...";
  // if (error) return `Error! ${error.message}`;

  // invariant(data, "Data should be available at this point");

  return (
    <>
      <header className="bg-muted py-2">
        <Container>
          <ModeToggle />
        </Container>
      </header>

      <main className="py-4">
        <Container>
          <Banner />

          <div className="mt-3">
            <ul className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {/* <PostCard title={data.posts.title} description={data.posts.description} slug={data.posts.slug} /> */}
              {Array.from({ length: 6 }).map((_, index) => (
                <PostCard
                  key={index}
                  title="Notifications"
                  description="Learn the basic fundamentals of getting started with Bettermode!
In this video, Jacob will walk you through how to manage notifications at the community level and the space level."
                  slug="/"
                />
              ))}
            </ul>
          </div>

          <Button variant="outline" className="w-full my-4">
            Show more
          </Button>
        </Container>
      </main>
    </>
  );
}
