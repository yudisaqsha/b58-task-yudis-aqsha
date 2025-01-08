import { Link, useNavigate } from "react-router-dom";
import { Input, Container, Text, Button, Flex } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const schema = z.object({
  email: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof schema>;
function ForgotPassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    navigate("/resetpassword");
  };

  return (
    <>
      <Container pt={20} width="450px">
        <h1 style={{ color: "green" }}>circle</h1>
        <h2 style={{ color: "white" }}>ForgotPassword</h2>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <Flex flexDirection="column" gap="3">
            <Input {...register("email")} color={"white"} placeholder="Email" />
            {errors.email && (
              <p style={{ color: "white" }}>{errors.email.message}</p>
            )}
            <Button
              style={{ backgroundColor: "green", color: "white" }}
              type="submit"
              borderRadius="2xl"
            >
              Send Instruction
            </Button>
            <Text style={{ color: "white" }}>
              Already Have account?{" "}
              <Link
                to="/login"
                style={{ color: "green", textDecoration: "none" }}
              >
                Login
              </Link>
            </Text>
          </Flex>
        </form>
      </Container>
    </>
  );
}
export default ForgotPassword;
