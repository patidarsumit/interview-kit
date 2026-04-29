import {startTransition, useOptimistic, useState} from 'react';

async function saveLike(liked: boolean) {
  return liked;
}

export function OptimisticLikeButton() {
  const [liked, setLiked] = useState(false);
  const [optimisticLiked, setOptimisticLiked] = useOptimistic(liked);

  function toggleLike() {
    const next = !liked;

    startTransition(async () => {
      setOptimisticLiked(next);
      const saved = await saveLike(next);
      setLiked(saved);
    });
  }

  return (
    <button type="button" onClick={toggleLike}>
      {optimisticLiked ? 'Liked' : 'Like'}
    </button>
  );
}

