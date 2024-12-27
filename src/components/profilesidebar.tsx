import {
  Input,
  Container,
  Text,
  Flex,
  Stack,
  Box,
  Color,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { currentUser, CurrentUser } from "@/api/currentUser";
import { updateUser } from "@/api/updateuser";
import { Button } from "@/components/ui/button";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import useAuthStore from "../hooks/newAuthStore";
import data_img from "../assets/images.jpeg";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const editUserSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  bio: z
    .string()
    .max(1000, "Bio must be less than 1000 characters")
    .refine((bio) => {
      const wordCount = bio.trim().split(/\s+/).length;
      return wordCount <= 200;
    }, "Bio must be no more than 200 words.")
    .optional(),
});

type EditUserData = {
  fullName: string;
  username: string;
  email: string;
  bio: string;
};

function ProfileSidebar() {
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { token, loggedIn, setLoggedin, updateUserData } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EditUserData>({
    resolver: zodResolver(editUserSchema),
  });

  useEffect(() => {
    const getCurrentUser = async () => {
      if (token) {
        setLoading(true);
        const currentUserData = await currentUser(token);

        if (currentUserData) {
          setLoggedin(currentUserData);
          console.log(currentUserData);
          setValue("fullName", currentUserData.fullName);
          setValue("username", currentUserData.username);
          setValue("email", currentUserData.email);
          setValue("bio", currentUserData.bio)
        } else {
          console.error("User data not found or invalid token");
        }
        setLoading(false);
      } else {
        console.log("No token found");
      }
    };

    getCurrentUser();
  }, [token, setLoggedin]);

  const onSubmit = async (data: EditUserData) => {
    // updateProfile(data.email, data.fullName, data.username, data.bio);
    console.log(data);
    if (!token) {
      console.log("You're not logged in");
      return;
    }
    try {
      setLoading(true);
      const response = await updateUser(
        token,
        data.username,
        data.fullName,
        data.bio,
      );
      console.log(response);
      if (response.user) {
        console.log(response.user);

        updateUserData(response.user);
        setSuccessMessage("User updated successfully!");
        alert("User Updated");
        window.location.reload();
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("An error occurred while updating the user.");
    }
  };
  if (loading || !loggedIn) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box backgroundColor="#262626" borderRadius={"2xl"}>
      <h5 style={{ color: "white", marginTop: "25px", marginLeft: "25px" }}>
        My Profile
      </h5>

      <Box position={"relative"} mt={5}>
        <Box
          borderRadius={10}
          height={"100px"}
          width={"90%"}
          m={"auto"}
          backgroundColor={"white"}
        ></Box>
        <Box
          borderRadius={"100%"}
          borderWidth={2}
          borderColor={"black"}
          width={"75px"}
          height={"75px"}
          zIndex={1}
          marginTop={"-45px"}
          marginLeft={"75px"}
          position={"absolute"}
        >
          <img
            src={data_img}
            style={{
              borderRadius: "100%",
              width: "100%",
              height: "100%",
              display: "block",
            }}
          />
        </Box>
      </Box>

      <Flex mr={5} justifyContent={"end"}>
        <DialogRoot
          key={"top"}
          placement={"top"}
          motionPreset="slide-in-bottom"
        >
          <DialogTrigger asChild>
            <Button
              borderWidth={"2"}
              borderColor={"white"}
              mt={3}
              borderRadius={"3xl"}
              background={"none"}
            >
              Edit Profile{" "}
            </Button>
          </DialogTrigger>
          <DialogContent background={"#1d1d1d"} color={"white"}>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <Box position={"relative"} mt={5}>
                <Box
                  borderRadius={10}
                  height={"100px"}
                  width={"90%"}
                  m={"auto"}
                  backgroundColor={"white"}
                ></Box>
                <Box
                  borderRadius={"100%"}
                  borderWidth={2}
                  borderColor={"black"}
                  width={"75px"}
                  height={"75px"}
                  zIndex={1}
                  marginTop={"-45px"}
                  marginLeft={"75px"}
                  position={"absolute"}
                >
                  <img
                    src={data_img}
                    style={{
                      borderRadius: "100%",
                      width: "100%",
                      height: "100%",
                      display: "block",
                    }}
                  />
                </Box>
              </Box>
              <Stack mt={10}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Flex direction={"column"} gap={5}>
                    <Box>
                      <label htmlFor="fullName">
                        <Text color={"white"}>Fullname</Text>
                      </label>
                      <Input id="fullName" {...register("fullName")} />
                      {errors.fullName && errors.fullName.message}
                    </Box>
                    <Box>
                      <label htmlFor="username">
                        <Text color={"white"}>Username</Text>
                      </label>
                      <Input id="username" {...register("username")} />
                      {errors.username && errors.username.message}
                    </Box>

                    <Box>
                      <label htmlFor="Bio">
                        <Text color={"white"}>Bio</Text>
                      </label>
                      <Textarea
                        id="bio"
                        {...register("bio")}
                        maxLength={1000} // Set max character length to 1000
                        placeholder="Tell us a little about yourself..."
                      />
                    </Box>
                  </Flex>
                </form>
              </Stack>
            </DialogBody>
            <DialogFooter>
              <Button
                backgroundColor={"green"}
                type="submit"
                onClick={handleSubmit(onSubmit)}
                loading={loading}
              >
                Update Info
              </Button>
              <DialogTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </DialogTrigger>
            </DialogFooter>
            <DialogCloseTrigger />
          </DialogContent>
        </DialogRoot>
      </Flex>
      <Box ml="25px">
        <Text color={"white"}>
          <h4>{loggedIn?.fullName}</h4>{" "}
        </Text>
        <Text color={"#8a8986"}>@{loggedIn?.username}</Text>
        <Text color={"white"}>
          {loggedIn?.bio ? loggedIn?.bio : "No Bio Yet"}
        </Text>
        <Flex gap={3}>
          <Flex gap={1}>
            <Text color={"white"}>{loggedIn?._count?.following}</Text>
            <Text color={"#8a8986"}>Following</Text>
          </Flex>
          <Flex gap={1}>
            <Text color={"white"}>{loggedIn?._count?.followers}</Text>
            <Text color={"#8a8986"}>Followers</Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}

export default ProfileSidebar;
