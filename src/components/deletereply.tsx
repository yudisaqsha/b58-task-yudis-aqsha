import {
    Button,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import { deleteReply } from "@/features/deletereply";
  import { fetchComment } from "@/features/getcomment";
  import useAuthStore from "@/hooks/newAuthStore";
  import { useNavigate } from "react-router-dom";
  interface DeleteThreadProps {
    threadId: number;
    commentId:number
  }
  
  function DeleteReply({ threadId,commentId }: DeleteThreadProps) {
    const { token, setAllThread,setComments } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    const handleDelete = async () => {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);
      if (!token) {
        return;
      }
      try {
        const result = await deleteReply(token, threadId,commentId);
        setSuccessMessage(result.message);
      } catch (err: any) {
        setError(err.message); // Set error message
      } finally {
        setLoading(false);
        alert("Thread Deleted")
        const thread = await fetchComment(token, String(threadId));
        setComments(thread)
        
      }
    };
  
    return (
      <>
       
        <Button
          onClick={handleDelete}
          disabled={loading}
          color={"white"}
          background={"none"}
        >
          Delete
        </Button>
      </>
    );
  }
  
  export default DeleteReply;
  