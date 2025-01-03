import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import useAuthStore, { useFollowStore } from "../hooks/newAuthStore";


interface FollowButtonProps {
  userId: number;
}

const FollowButton: React.FC<FollowButtonProps> = ({ userId }) => {
  const { followedUser, toggleFollow, isLoading } = useFollowStore();
  const isFollowing = followedUser.includes(userId);
  const { token } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleToggleFollow = async () => {
    if(!token){
      return
    }
    try {
      await toggleFollow(token, userId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle follow');
    }
  };
 
  return (
    
    <div>
    {token && <Button
        onClick={handleToggleFollow}
        disabled={loading}
        background={"none"}
        borderRadius={"xl"}
        borderColor={"white"}
      >
        {loading ? "Processing..." : isFollowing ? "Unfollow" : "Follow"}
      </Button>}
      
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default FollowButton;
