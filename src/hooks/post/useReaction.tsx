import { useMutation } from "@apollo/client";

import { AddReaction, RemoveReaction } from "@/apis/reaction";

export function useReaction() {
  const [addReactionMutation] = useMutation(AddReaction);
  const [removeReactionMutation] = useMutation(RemoveReaction);

  const addReaction = async (postId: string) => {
    return await addReactionMutation({
      variables: {
        input: {
          reaction: "heart",
        },
        postId,
      },
    });
  };

  const removeReaction = async (postId: string) => {
    return await removeReactionMutation({
      variables: {
        reaction: "heart",
        postId,
      },
    });
  };

  return {
    addReaction,
    removeReaction,
  };
}
