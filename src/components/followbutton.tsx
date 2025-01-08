import React, { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import useAuthStore from "../hooks/newAuthStore";
import { followFunction } from "@/features/followfunction";
import { checkFollow } from "@/features/checkfollow";
interface FollowButtonProps {
  userId: number;
  currentUserId: number;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  userId,
  currentUserId,
}) => {
  const { token } = useAuthStore();
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (token) {
      const fetchFollowStatus = async () => {
        try {
          console.log(currentUserId)
          const status = await checkFollow(token, userId, currentUserId);
          setIsFollowing(status);
          console.log(status)
        } catch (err) {
          setError("User not found or error occurred");
          console.error("Error fetching user data:", err);
        }
      };

      fetchFollowStatus();
    }
  }, [token, userId, currentUserId]);

  const handleToggleFollow = async () => {
    setLoading(true);
    setError(null);
    if (token) {
      try {
        await followFunction(token, userId);

        
        setIsFollowing((prevState) => !prevState);

        
      } catch (err) {
        setError("User not found or error occurred");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      {token && (
        <Button
        
          onClick={handleToggleFollow}
          disabled={loading}
          background={"none"}
          borderRadius={"xl"}
          borderColor={"white"}
        >
          {loading ? "Processing..." : isFollowing ? "Unfollow" : "Follow"}
        </Button>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default FollowButton;
