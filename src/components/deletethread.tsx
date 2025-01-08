import {
  Button,
} from "@chakra-ui/react";
import {  useState } from "react";
import { deleteThread } from "@/features/thread/deleteThread";
import { fetchThreads } from "@/features/thread/fetchallthread";
import useAuthStore from "@/hooks/newAuthStore";
import { useNavigate } from "react-router-dom";
interface DeleteThreadProps {
  threadId: number;
}

function DeleteThread({ threadId }: DeleteThreadProps) {
  const { token, setAllThread } = useAuthStore();
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
      const result = await deleteThread(token, threadId);
      setSuccessMessage(result.message);
    } catch (err: any) {
      setError(err.message); // Set error message
    } finally {
      setLoading(false);
      alert("Thread Deleted")
      const thread = await fetchThreads(token);
      setAllThread(thread);
      navigate("/");
    }
  };

  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

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

export default DeleteThread;
