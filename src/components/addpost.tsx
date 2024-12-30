import {
  Input,
  Container,
  Text,
  Button,
  Flex,
  Stack,
  Box,
  Color,
  Image,
  useDisclosure,
  Textarea,
} from "@chakra-ui/react";
import { CreatePost } from "./createpost";
import { Link } from "react-router-dom";
// const imageContext = require.context('../assets', false, /\.(jpg|jpeg|png)$/);
import data_img from "../assets/images.jpeg";
import PostList from "./postlist";
import { FaUpload, FaImage } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createThread } from "@/api/createthread";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useState } from "react";

const threadSchema = z.object({
  content: z.string().min(1, { message: "Content is required" }),

  image: z.instanceof(FileList).optional(), // Optional file input
});

type ThreadData = z.infer<typeof threadSchema>;
function AddPost() {
  const { token } = useAuthStore();
  const [preview, setPreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ThreadData>({
    resolver: zodResolver(threadSchema),
  });
  const contentValue = watch("content", "");
  const imageValue = watch("image");
  const onSubmit = async (data: any) => {
    console.log(data);
    if (!token) {
      console.log("You're not logged in");
      return;
    }
    const formData = new FormData();
    formData.append("content", data.content);

    if (data.image[0]) {
      formData.append("image", data.image[0]);
      setPreview(data.image[0]);
    }

    try {
      const response = await createThread(token, formData);
      console.log(response.thread);
      alert("Thread Uploaded");
      window.location.reload();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  

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
            src={data_img}
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
                    onSubmit={handleSubmit(onSubmit)}
                    encType="multipart/form-data"
                    style={{ width: "90%" }}
                  >
                    <Flex gap={5}>
                      {" "}
                      <img
                        src={data_img}
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
                        {...register("content", {
                          required: "This can't be empty",
                        })}
                      />
                      <Flex direction={"column"} gap={"2"}>
                        <div>
                          <label htmlFor="image" className="upload-label">
                            <input
                              type="file"
                              id="image"
                              accept="image/png, image/jpeg"
                              style={{ display: "none" }}
                              {...register("image")}
                            />
                            <FaImage size={30} color="green" />
                          </label>
                          {preview && (
                            <img
                              src={preview}
                              alt="image preview"
                              width={100}
                            />
                          )}
                        </div>
                      </Flex>
                    </Flex>
                    {errors.content && <p>{errors.content.message}</p>}
                  </form>
                </Container>
              </DialogBody>
              <DialogFooter>
                <Button
                  backgroundColor={"green"}
                  rounded={"2xl"}
                  color={"white"}
                  type="submit"
                  mr={"10%"}
                  onClick={handleSubmit(onSubmit)}
                >
                  Post
                </Button>
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
      <PostList></PostList>
    </Stack>
  );
}
export default AddPost;
