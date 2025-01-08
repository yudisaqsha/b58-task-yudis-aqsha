import {
  Container,
  Button,
  Flex,
  Box,
  Spinner,
  Textarea,
} from "@chakra-ui/react";

import { FaImage } from "react-icons/fa";

import {
  DialogBody,
  DialogCloseTrigger,
  DialogActionTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAuthStore from "@/hooks/newAuthStore";
import { useEffect, useState } from "react";
import { updateThread } from "@/features/thread/updateThread";
import { fetchThreadsbyId } from "@/features/thread/threadbyid";
interface EditThreadProps {
  threadId: number;
}

function EditThread({ threadId }: EditThreadProps) {
  const { token, setThread } = useAuthStore();
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

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
  useEffect(() => {
    const getCurrentThread = async () => {
      if (token) {
        try {
          const threadData = await fetchThreadsbyId(token, String(threadId));
          setContent(threadData.content);
          if (threadData.image) {
            setCurrentImage(threadData.image);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.log("No token found");
      }
    };

    getCurrentThread();
  }, [token]);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      console.log("You're not logged in");
      return;
    }
    const formData = new FormData();
    formData.append("content", content);

    if (imageFile) {
      formData.append("image", imageFile);
    }
    setIsLoading(true);
    try {
      await updateThread(token, formData, threadId);
      const listThread = await fetchThreadsbyId(token, String(threadId));
      setThread(listThread);
      alert("Thread Updated");
    } catch (error) {
      console.error("Error updating user:", error);
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
          <Button background={"none"} color={"white"}>
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent background={"#1d1d1d"} color={"white"}>
          <DialogHeader>
            <DialogTitle>Update Thread</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Container
              borderBottomWidth={2}
              borderColor="#3F3F3F"
              pb={4}
              mx={"auto"}
            >
              <form
                onSubmit={onSubmit}
                encType="multipart/form-data"
                style={{ width: "90%" }}
              >
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
                    {currentImage && !previewImage ? (
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
                    ) : null}

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
              </form>
            </Container>
          </DialogBody>
          <DialogFooter>
            <div>
              <label htmlFor="imageeditthread" className="upload-label">
                <input
                  type="file"
                  id="imageeditthread"
                  accept="image/png, image/jpeg"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <FaImage size={30} color="green" />
              </label>
            </div>
            <DialogActionTrigger marginRight={"10%"}>
              <Button
                backgroundColor={"green"}
                rounded={"2xl"}
                color={"white"}
                type="submit"
                onClick={onSubmit}
                disabled={isPostDisabled || isLoading}
              >
                Post
              </Button>
            </DialogActionTrigger>

            {/* <DialogTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogTrigger> */}
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  );
}
export default EditThread;
