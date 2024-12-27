import {
  Input,
  Container,
  Text,
  Button,
  Flex,
  Stack,
  Box,
  Color,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { FaUpload } from 'react-icons/fa';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
interface IFormInput {
  content: string;
  image: FileList;
}
const formSchema = z.object({
  content: z
    .string()
    .min(5, "Content must be at least 5 characters long")
    .max(500, "Content must not exceed 500 characters"),
  // image: z
  //   .instanceof(FileList)
  //   .refine((files) => files.length > 0, "Please upload an image.")
  //   .refine((files) => {
  //     const file = files[0];
  //     return ["image/jpeg", "image/png"].includes(file.type);
  //   }, "Only JPEG and PNG images are allowed"),
});
import data_img from "../assets/images.jpeg";
export function CreatePost() {
  const {
    register,
    handleSubmit,
    formState: { errors },watch
  } = useForm<IFormInput>({
    resolver: zodResolver(formSchema),
  });
  const formValues = watch();
  const isButtonDisabled = !formValues.content || !formValues.image;
  const onSubmit = (data: IFormInput) => {
    const { content, image } = data;
    console.log("Content:", content);
    console.log("Uploaded image:", image);
  };
  return (
    <Container borderBottomWidth={2} borderColor="#3F3F3F" pb={4} mx={"auto"}>
      <form onSubmit={handleSubmit(onSubmit)} style={{width:"80%"}}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Username Field */}
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            {...register("content", { required: "Username is required" })}
          />
          {errors.content && <p>{errors.content?.message}</p>}
        </div>

        {/* Email Field */}
        

        {/* File Upload Field */}
        <div>
          <label htmlFor="file">Upload File:</label>
          <input
            id="file"
            type="file"
            {...register("image")}
          />
          {errors.image && <p>{errors.image?.message}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={isButtonDisabled}>Submit</button>
      </form>
      </form>
    </Container>
  );
}
