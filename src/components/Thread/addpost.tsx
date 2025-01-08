import {
  Input,
  Container,
  Button,
  Flex,
  Stack,
  Box,
  Spinner,
  Textarea,
} from "@chakra-ui/react";

// const imageContext = require.context('../assets', false, /\.(jpg|jpeg|png)$/);
import data_img from "@/assets/images.jpeg";
import PostList from "./postlist";
import { FaImage } from "react-icons/fa";

import { fetchThreads } from "@/features/thread/fetchallthread";

import { createThread } from "@/features/thread/createthread";

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
import { useState, useEffect } from "react";
import { currentUser } from "@/features/users/currentUser";

function AddPost() {
  const { token, setAllThread, setUser, user } = useAuthStore();
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const onSubmit = async () => {
    if (!token) {
      console.log("You're not logged in");
      return;
    }
    const formData = new FormData();
    formData.append("content", content);

    if (image) {
      formData.append("image", image);
    }

    setIsLoading(true);

    try {
      const response = await createThread(token, formData);
      console.log(response.thread);
      const listThread = await fetchThreads(token);
      setAllThread(listThread);
      alert("Thread Uploaded");
      setContent("")
      setImage(null)
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const getCurrentUser = async () => {
      if (token) {
        try {
          const userData = await currentUser(token);
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.log("No token found");
      }
    };

    getCurrentUser();
  }, [token, setUser]);

  const isPostDisabled = !(content || image);
  return (
    <Stack
      ml={"20%"}
      mt={0}
      borderRightWidth={2}
      borderLeftWidth={2}
      borderColor="#3F3F3F"
      style={{ width: "45%", height: "100%" }}
    >
      <Container mt={6}>
        <h4 style={{ color: "white" }}>Home</h4>
      </Container>

      <Container borderBottomWidth={2} borderColor="#3F3F3F" pb={4} mx={"auto"}>
        <Flex gap={3}>
          {" "}
          <img
            src={user?.avatar ? user.avatar : data_img}
            style={{
              borderRadius: "100%",
              width: "40px",
              height: "40px",
              display: "block",
            }}
          />
          <DialogRoot
            key={"top"}
            placement={"top"}
            motionPreset="slide-in-bottom"
            size={"lg"}
          >
            <DialogTrigger asChild>
              <Input
                type="textarea"
                width={"80%"}
                border={"none"}
                placeholder="What is happening?!"
                color={"white"}
              />
            </DialogTrigger>
            <DialogContent background={"#1d1d1d"} color={"white"}>
              <DialogHeader>
                <DialogTitle>Addpost</DialogTitle>
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
                      {" "}
                      <img
                        src={user?.avatar ? user.avatar : data_img}
                        style={{
                          borderRadius: "100%",
                          width: "40px",
                          height: "40px",
                          display: "block",
                        }}
                      />
                      <Textarea
                        border={"none"}
                        borderRadius={"lg"}
                        id="content"
                        height={"200px"}
                        placeholder="What is happening?!"
                        color={"white"}
                        value={content}
                        required
                        onChange={onContentChange}
                      />
                      <Flex direction={"column"} gap={"2"}></Flex>
                    </Flex>
                    {preview && (
                      <img src={preview} alt="image preview" width={400} />
                    )}
                  </form>
                </Container>
              </DialogBody>
              <DialogFooter>
                <div>
                  <label htmlFor="image" className="upload-label">
                    <input
                      type="file"
                      id="image"
                      accept="image/png, image/jpeg"
                      style={{ display: "none" }}
                      onChange={onImageChange}
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
                    disabled={isPostDisabled || isLoading} // Disable when no content/image or during loading
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
          <Button backgroundColor={"green"} rounded={"2xl"} color={"white"}>
            Post
          </Button>
        </Flex>
      </Container>
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
      <PostList></PostList>
    </Stack>
  );
}
export default AddPost;
