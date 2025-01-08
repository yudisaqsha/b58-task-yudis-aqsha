import { Input, Container, Button, Flex } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const schema = z
  .object({
    passwordold: z.string().min(8, "Password must be at least 8 characters"),
    passwordnew: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.passwordold !== data.passwordnew, {
    message: "Cannot use the same password",
    path: ["passwordnew"],
  });

type FormData = z.infer<typeof schema>;
function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    navigate("/login");
  };

  return (
    <>
      <Container pt={20} width="450px">
        <h1 style={{ color: "green" }}>circle</h1>
        <h2 style={{ color: "white" }}>Reset Password</h2>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <Flex flexDirection="column" gap="3">
            <Input
              {...register("passwordold")}
              type="password"
              color={"white"}
              placeholder="Password Old"
              id="passwordold"
            />
            {errors.passwordold && (
              <p style={{ color: "white" }}>{errors.passwordold.message}</p>
            )}
            <Input
              {...register("passwordnew")}
              type="password"
              color={"white"}
              placeholder="Password New"
              id="passwordnew"
            />
            {errors.passwordnew && (
              <p style={{ color: "white" }}>{errors.passwordnew.message}</p>
            )}
            <Button
              style={{ backgroundColor: "green", color: "white" }}
              type="submit"
              borderRadius="2xl"
            >
              Create New Password
            </Button>
          </Flex>
        </form>
      </Container>
    </>
  );
}
export default ResetPassword;
