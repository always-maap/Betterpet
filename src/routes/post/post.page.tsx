import { useParams } from "react-router-dom";
import invariant from "tiny-invariant";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

import { Container } from "@/components/ui/container";
import { Header } from "@/components/layout/header";
import { usePostQuery } from "@/hooks/post/usePostQuery";
import { PostRenderer } from "@/components/posts/post-renderer";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReaction } from "@/hooks/post/useReaction";
import { Skeleton } from "@/components/ui/skeleton";

export function PostPage() {
  const { id } = useParams();
  if (!id) {
    toast.error("Post ID is required");
    return null;
  }

  const { data, loading, refetch } = usePostQuery(id);
  const { addReaction, removeReaction } = useReaction();

  if (loading) {
    return <PostPageSkeleton />;
  }

  invariant(data?.post.createdBy?.member?.profilePicture?.__typename === "Image", "Expected an image");

  const fromNowTime = formatDistanceToNow(new Date(data.post.createdAt as string), { addSuffix: true });

  const handleReaction = async () => {
    if (data.post.reactions && data.post.reactions.length > 0) {
      const resp = await removeReaction(id);
      if (resp.data?.removeReaction.status === "failed") {
        toast.error("Failed to remove reaction");
        return;
      }
      refetch();
    } else {
      const resp = await addReaction(id);
      if (resp.data?.addReaction.status === "failed") {
        toast.error("Failed to add reaction");
        return;
      }
      refetch();
    }
  };

  return (
    <>
      <Header />
      <main className="py-4">
        <Container>
          <div className="bg-muted p-6 rounded">
            <div className="flex gap-2 mb-4">
              <img
                width={48}
                height={48}
                src={data.post.createdBy.member.profilePicture.url}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <span>{data.post.createdBy.member.name}</span>
                <span className="text-muted-foreground text-sm">{fromNowTime}</span>
              </div>
            </div>
            <PostRenderer fields={data?.post.fields as any} />

            <Button className="mt-4" variant="secondary" size="icon" onClick={handleReaction}>
              {data.post.reactions && data.post.reactions.length > 0 ? (
                <div className="flex gap-2 items-center">
                  <Heart fill="red" color="red" />
                  <span>{data.post.reactions[0].count}</span>
                </div>
              ) : (
                <Heart />
              )}
            </Button>
          </div>
        </Container>
      </main>
    </>
  );
}

function PostPageSkeleton() {
  return (
    <>
      <Header />
      <main className="py-4">
        <Container>
          <div className="bg-muted p-6 rounded">
            <div className="flex gap-2 mb-4">
              <Skeleton className="rounded-full w-[48px] h-[48px]" />
              <div className="flex flex-col">
                <Skeleton className="w-[100px]" />
                <Skeleton className="w-[50px]" />
              </div>
            </div>
            <Skeleton className="h-[800px]" />
          </div>
        </Container>
      </main>
    </>
  );
}
