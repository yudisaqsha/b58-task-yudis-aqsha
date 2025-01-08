import {
    Button,
  } from "@chakra-ui/react";
  import {  useState } from "react";
  import { deleteReply } from "@/features/thread/deletereply";
  import { fetchComment } from "@/features/thread/getcomment";
  import useAuthStore from "@/hooks/newAuthStore";
  
  interface DeleteThreadProps {
    threadId: number;
    commentId:number
  }
  
  function DeleteReply({ threadId,commentId }: DeleteThreadProps) {
    const { token, setComments } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    
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
        setError(err.message);
        console.error(error) // Set error message
      } finally {
        setLoading(false);
        console.log(successMessage)
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
  