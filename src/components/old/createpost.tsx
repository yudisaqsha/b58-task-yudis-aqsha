import {
 
  Container,
 
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useAuthStore from "@/hooks/newAuthStore";
import { useState } from "react";
import { createThread } from "@/features/thread/createthread";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const threadSchema = z.object({
  content: z.string().min(1, { message: "Content is required" }),

  image: z.instanceof(FileList).optional(), // Optional file input
});
type ThreadData = z.infer<typeof threadSchema>;
export function CreatePost() {
  const { token } = useAuthStore();
  const [, setPreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    
    formState: { errors },
  } = useForm<ThreadData>({
    resolver: zodResolver(threadSchema),
  });
  // const contentValue = watch("content", "");
  // const imageValue = watch("image");
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
      setPreview(data.image[0])
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
        {/* <button type="submit" disabled={isButtonDisabled}>Submit</button> */}
      </form>
      </form>
    </Container>
  );
}
