import { PostCard } from "@/components/posts/post-card";
import { usePostsInfiniteQuery } from "@/hooks/post/usePostsInfiniteQuery";
import { Container } from "@/components/ui/container";
import { Banner } from "@/components/home/banner";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Skeleton } from "@/components/ui/skeleton";

export function HomePage() {
  const { data, fetchMore, loading } = usePostsInfiniteQuery();

  if (loading && data === undefined) {
    return <HomePageSkeleton />;
  }

  return (
    <>
      <Header />

      <main className="py-4">
        <Container>
          <Banner />

          <div className="mt-3">
            <ul className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {data?.posts.nodes?.map((post) => (
                <PostCard
                  key={post.id}
                  id={post.id}
                  title={post.title!}
                  description={post.description!}
                  thumbnail={post.thumbnail as any}
                />
              ))}
            </ul>
          </div>
          {data?.posts.pageInfo.hasNextPage && (
            <Button variant="outline" className="w-full my-4" onClick={() => fetchMore(data.posts.pageInfo.endCursor!)}>
              Show more
            </Button>
          )}
        </Container>
      </main>
    </>
  );
}

function HomePageSkeleton() {
  return (
    <>
      <Header />

      <main className="py-4">
        <Container>
          <Banner />

          <div className="mt-3">
            <ul className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <Skeleton key={index} className="h-80" />
              ))}
            </ul>
          </div>
        </Container>
      </main>
    </>
  );
}
