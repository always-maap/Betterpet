export function Banner() {
  return (
    <div className="relative rounded overflow-hidden">
      <div className="relative text-black z-10 px-8 py-5">
        <div className="font-semibold">Hey buddy 👋 </div>
        <h2 className="font-bold text-2xl">Welcome to your new community</h2>
        <div className="text-md opacity-95 w-full mt-3">
          <article className="prose">
            <p>
              <strong>This is the Basic, </strong>starter kit that provides pre-built spaces and customizable components
              to get you started quickly. Everything—content, layout, and components—is fully editable, and just for
              your jumpstart, so you can tailor it to your unique vision.
              <br />
              <br />
              <strong>Get started building your community from basic.</strong>
              <br />
            </p>
          </article>
        </div>
      </div>
      <div className="w-full h-full absolute inset-0">
        <img
          src="https://tribe-s3-production.imgix.net/mZsl3jtoyp6wyVR5gyn7D?w=2000&amp;auto=compress,format&amp;dl"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
}
