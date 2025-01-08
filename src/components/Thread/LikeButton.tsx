// File: components/LikeButton.tsx

import React, {  useEffect } from "react";
// import {Button} from '@chakra-ui/react'

import { IconButton, Text } from "@chakra-ui/react";
import useAuthStore, {useLikeStore} from "@/hooks/newAuthStore";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

interface LikeButtonProps {
  threadId: number;
  initialLiked: boolean;
  initialLikesCount: number;

}

const LikeButton: React.FC<LikeButtonProps> = ({
  threadId,
  initialLiked,
  initialLikesCount,
}) => {
  const { token } = useAuthStore();
  const { toggleLike, likedThreads, likeCounts, loading, initializeLikeState } = useLikeStore();

  
  useEffect(() => {
    initializeLikeState(threadId, initialLiked, initialLikesCount);
  }, [threadId, initialLiked, initialLikesCount, initializeLikeState]);

  const isLiked = likedThreads[threadId] ?? initialLiked;
  const count = likeCounts[threadId] ?? initialLikesCount;
  const isLoading = loading[threadId] ?? false;

  const handleLikeToggle = () => {
    if(!token){
      return
    }
    toggleLike(threadId, token);
  };

  return (
    <IconButton
      onClick={handleLikeToggle}
      colorScheme="gray"
      aria-label="Like Post"
      disabled={isLoading}
      size="sm"
      p={0}
      background={"none"}
    >
      {isLiked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
      <Text m={"auto"} color={"white"}>
        {count}
      </Text>
    </IconButton>
  );
};

export default LikeButton;
