import { Link, useNavigate } from "react-router-dom";
import { Input, Container, Text, Button, Flex } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useAuth } from "@/hooks/authcontext";
// import useAuthStore from "@/hooks/useAuthStore";

import { registerUser } from "@/features/authentication/registerapi";
const schema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;
function Register() {
  // const { register: registerStore } = useAuthStore();

  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { email } = data;
    const username = email.split("@")[0];
    // registerUser(username,fullName,email,password)

    try {
      const result = await registerUser(
        data.fullName,
        username,
        data.email,
        data.password,
      );

      if (result.user) {
        alert("Registration successful!");
        navigate("/home");
      } else {
        setErrorMessage(result.message || "Registration failed");
        console.log(errorMessage);
        alert(result.message);
      }
    } catch (err) {
      setErrorMessage("An error occurred while registering.");
      console.error(err);
    }
  };

  return (
    <>
      <Container pt={20} width="450px">
        <h1 style={{ color: "green" }}>circle</h1>
        <h2 style={{ color: "white" }}>Create account Circle</h2>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <Flex flexDirection="column" gap="3">
            <Input
              {...register("fullName")}
              color={"white"}
              placeholder="Full Name"
            />
            {errors.fullName && (
              <p style={{ color: "white" }}>{errors.fullName.message}</p>
            )}
            <Input {...register("email")} color={"white"} placeholder="Email" />
            {errors.email && (
              <p style={{ color: "white" }}>{errors.email.message}</p>
            )}
            <Input
              {...register("password")}
              type="password"
              color={"white"}
              placeholder="Password"
            />
            {errors.password && (
              <p style={{ color: "white" }}>{errors.password.message}</p>
            )}

            <Button
              style={{ backgroundColor: "green", color: "white" }}
              type="submit"
              borderRadius="2xl"
            >
              Create
            </Button>
            <Text style={{ color: "white" }}>
              Already have account?{" "}
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
export default Register;
