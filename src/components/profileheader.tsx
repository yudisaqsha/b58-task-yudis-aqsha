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
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { profilePage } from "@/api/profilepageuser";
import { User, currentUser } from "@/api/currentUser";
import { updateUser } from "@/api/updateuser";
const editUserSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  fullName: z.string().min(1, { message: "Full name is required" }),
  bio: z.string().optional(),
  avatar: z.instanceof(FileList).optional(), // Optional file input
  coverPic: z.instanceof(FileList).optional(), // Optional file input
});

type ProfileFormData = z.infer<typeof editUserSchema>;
interface ProfileHeaderProps {
  username?: string;
}
const ProfileHeader: React.FC<ProfileHeaderProps> = ({ username }) => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverPicPreview, setCoverPicPreview] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState<ProfileFormData | null>(
    null,
  );
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setLoggedin] = useState<User | null>(null);
  const { token } = useAuthStore();
  // const { user: loggedInUser } = useAuthStore((state) => state)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(editUserSchema),
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      if (token && username) {
        try {
          const data = await profilePage(token, username);
          const loginuser = await currentUser(token);
          setUser(data);
          setLoggedin(loginuser);
          console.log(data);
          console.log(loginuser);
          setInitialValues({
            username: data.username,
            fullName: data.fullName,
            bio: data.bio || "",
          });
          setValue("fullName", data.fullName);
          setValue("username", data.username);
          setValue("bio", data.bio);
          setAvatarPreview(data.avatar);
          setCoverPicPreview(data.coverPic);
        } catch (err) {
          setError("User not found or error occurred");
          console.error("Error fetching user data:", err);
        }
      }
    };

    if (username && token) {
      getUserData();
    }
  }, [username, token, setLoggedin, setUser]);

  const onSubmit = async (data: any) => {
    // updateProfile(data.email, data.fullName, data.username, data.bio);
    console.log(data);
    if (!token) {
      console.log("You're not logged in");
      return;
    }
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("fullName", data.fullName);
    formData.append("bio", data.bio);

    if (data.avatar[0]) {
      formData.append("avatar", data.avatar[0]);
    }
    if (data.coverPic[0]) {
      formData.append("coverPic", data.coverPic[0]);
    }

    try {
      const response = await updateUser(token, formData);
      setUser(response.user);
      console.log("User updated successfully:", response.user);
      alert("Data Updated!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleCoverPicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setCoverPicPreview(URL.createObjectURL(file));
    }
  };
  const formValues = watch();
  const isFormChanged = () => {
    if (!initialValues || !user) return false;
    return (
      formValues.username !== initialValues.username ||
      formValues.fullName !== initialValues.fullName ||
      formValues.bio !== initialValues.bio ||
      avatarPreview !== user.avatar ||
      coverPicPreview !== user.coverPic
    );
  };
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
            src={user?.avatar ? user.avatar : data_img}
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
        {user?.id === loggedIn?.id && (
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
                      <Flex gap={3}>
                        <Input
                          type="file"
                          {...register("avatar")}
                          mt={4}
                          accept="image/*"
                          onChange={handleAvatarChange}
                        />
                        <Input
                          type="file"
                          {...register("coverPic")}
                          mt={4}
                          accept="image/*"
                          onChange={handleCoverPicChange}
                        />
                      </Flex>
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
                          maxLength={1000}
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
                  disabled={!isFormChanged()}
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
        )}
        {user?.id != loggedIn?.id && (
          <Button
            borderWidth={"2"}
            borderColor={"white"}
            mt={3}
            borderRadius={"3xl"}
            background={"none"}
          >
            Follow{" "}
          </Button>
        )}
      </Flex>
      <Box ml="25px">
        <Text color={"white"}>
          <h4>{user?.fullName}</h4>{" "}
        </Text>
        <Text color={"#8a8986"}>@{user?.username}</Text>
        <Text color={"white"}>{user?.bio ? user.bio : "No Bio Yet"}</Text>
        <Flex gap={3}>
          <Flex gap={1}>
            <Text color={"white"}>{user?._count?.following}</Text>
            <Text color={"#8a8986"}>Following</Text>
          </Flex>
          <Flex gap={1}>
            <Text color={"white"}>{user?._count?.followers}</Text>
            <Text color={"#8a8986"}>Followers</Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};
export default ProfileHeader;
