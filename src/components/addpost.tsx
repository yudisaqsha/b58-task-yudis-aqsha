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
import { zodResolver } from "@hookform/resolvers/zod";
// const images = imageContext.keys().map(imageContext);
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
interface IFormInput {
  content: string;
  file: FileList;
}
const formSchema = z.object({
  content: z
    .string()
    .min(1, "Content must not be empty")
    .max(500, "Content must not exceed 500 characters"),
  file: z
    .any() // Accept any type of file input
    .optional() // Make the image field optional
    .refine((files) => {
      // If no files are uploaded, validation passes
      if (!files || files.length === 0) return true;

      // Check the file type if files are uploaded
      const file = files[0];
      return ["image/jpeg", "image/png"].includes(file.type);
    }, "Only JPEG and PNG images are allowed"),
});
function AddPost() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(formSchema),
  });
  const contentValue = watch("content", "");
  const imageValue = watch("file");
  const onSubmit = (data: IFormInput) => {
    const { content, file } = data;
    console.log("Content:", content);
    console.log("Uploaded image:", file[0]);
    onClose();
  };
  const { open, onOpen, onClose } = useDisclosure();
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
                    </Flex>
                    {errors.content && <p>{errors.content.message}</p>}
                  </form>
                </Container>
              </DialogBody>
              <DialogFooter>
                <div>
                  <label htmlFor="file" className="upload-label">
                    <input
                      type="file"
                      id="file"
                      accept="image/png, image/jpeg"
                      style={{ display: "none" }}
                      {...register("file")}
                    />
                    <FaImage size={30} color="green" />
                  </label>
                  {errors.file && <p>{errors.file.message}</p>}
                </div>

                <Button
                  backgroundColor={"green"}
                  rounded={"2xl"}
                  color={"white"}
                  type="submit"
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
