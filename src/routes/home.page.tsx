import { PostCard } from "@/components/posts/PostCard";
import { usePostsInfiniteQuery } from "@/hooks/posts/usePostsInfiniteQuery";
import { invariant } from "@apollo/client/utilities/globals";

import { ModeToggle } from "@/components/layout/mode-toggle";

export function HomePage() {
  // const { data, loading, error } = usePostsInfiniteQuery();

  // if (loading) return "Loading...";
  // if (error) return `Error! ${error.message}`;

  // invariant(data, "Data should be available at this point");

  return (
    <main>
      <ModeToggle />
      <ul className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* <PostCard title={data.posts.title} description={data.posts.description} slug={data.posts.slug} /> */}
        <PostCard
          title="Notifications"
          description="Learn the basic fundamentals of getting started with Bettermode!
In this video, Jacob will walk you through how to manage notifications at the community level and the space level."
          slug="/"
        />
      </ul>
    </main>
  );
}
