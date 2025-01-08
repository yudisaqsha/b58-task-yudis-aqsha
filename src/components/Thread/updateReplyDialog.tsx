import {
  Container,
  Text,
  Button,
  Flex,
  Box,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import { FaImage } from "react-icons/fa";
import { useEffect, useState } from "react";
import { updateReply } from "@/features/thread/updateReply";
import { fetchComment } from "@/features/thread/getcomment";
import { fetchCommentbyId } from "@/features/thread/getreplybyid";
import useAuthStore from "@/hooks/newAuthStore";
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogActionTrigger,
  DialogCloseTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

interface EditReplyProps {
  threadId: number;
  commentId: number;
}

function EditReply({ threadId, commentId }: EditReplyProps) {
  const { token, setComments } = useAuthStore();
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<string | null>(null);

  useEffect(() => {
    const getCurrentReply = async () => {
      if (token) {
        try {
          const replyData = await fetchCommentbyId(token, threadId, commentId);
          setContent(replyData.content);
          if (replyData.image) {
            setCurrentImage(replyData.image);
          }
        } catch (error) {
          console.error("Error fetching reply data:", error);
        }
      }
    };
    getCurrentReply();
  }, [token, threadId, commentId]);

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setContent(event.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const imagePreviewUrl = URL.createObjectURL(file);
      setPreviewImage(imagePreviewUrl);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      console.log("You're not logged in");
      return;
    }

    if (content.trim() === "") {
      setErrors("Content is required");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    setIsLoading(true);
    try {
      await updateReply(token, formData, String(threadId), String(commentId));
      const listReply = await fetchComment(token, String(threadId));
      setComments(listReply);
      alert("Reply Updated");
    } catch (error) {
      console.error("Error updating reply:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isPostDisabled = !(content.trim() !== "" || imageFile !== null);

  return (
    <>
      {isLoading && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width="100%"
          height="100%"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          display="flex"
          justifyContent="center"
          alignItems="center"
          zIndex={9999}
        >
          <Spinner size="xl" color="white" />
        </Box>
      )}
      <DialogRoot
        key={"top"}
        placement={"top"}
        motionPreset="slide-in-bottom"
        size={"lg"}
      >
        <DialogTrigger asChild>
          <Button background={"none"} p={0} color={"white"}>
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent background={"#1d1d1d"} color={"white"}>
          <DialogHeader>
            <DialogTitle>Update Reply</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Container
              borderBottomWidth={2}
              borderColor="#3F3F3F"
              pb={4}
              mx={"auto"}
            >
              <form onSubmit={onSubmit} style={{ width: "90%" }}>
                <Flex gap={5}>
                  <Flex direction={"column"}>
                    <Textarea
                      width={"50vh"}
                      mx={"auto"}
                      border={"none"}
                      borderRadius={"lg"}
                      id="content"
                      height={"200px"}
                      placeholder="What is happening?!"
                      color={"white"}
                      value={content}
                      onChange={handleContentChange}
                    />
                    {currentImage && !previewImage && (
                      <img
                        src={currentImage}
                        alt="Current thread image"
                        style={{
                          borderRadius: "10px",
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Image Preview"
                        style={{
                          borderRadius: "10px",
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </Flex>
                  <Flex direction={"column"} gap={"2"}></Flex>
                </Flex>
                {errors && <Text color="red.500">{errors}</Text>}
              </form>
            </Container>
          </DialogBody>
          <DialogFooter>
            <label htmlFor="imageeditreply" className="upload-label">
              <input
                type="file"
                id="imageeditreply"
                accept="image/png, image/jpeg"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <FaImage size={30} color="green" />
            </label>
            <DialogActionTrigger marginRight={"10%"}>
              <Button
                backgroundColor={"green"}
                rounded={"2xl"}
                color={"white"}
                type="submit"
                onClick={onSubmit}
                disabled={isPostDisabled || isLoading} // Disable when no content/image or during loading
              >
                Post
              </Button>
            </DialogActionTrigger>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  );
}

export default EditReply;
