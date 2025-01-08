import {
  Input,
 
  Text,
  Flex,
  Stack,
  Box,
  
  Image,
  Textarea,
  Spinner,
  
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { currentUser } from "@/features/users/currentUser";
import { updateUser } from "@/features/users/updateuser";
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
  DialogActionTrigger,
} from "@/components/ui/dialog";

import useAuthStore from "../../hooks/newAuthStore";
import data_img from "@/assets/images.jpeg";

function EditProfile() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverPicPreview, setCoverPicPreview] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [coverPic, setCoverPic] = useState<File | null>(null);
  const [initialValues, setInitialValues] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user, setUser, token } = useAuthStore();
  useEffect(() => {
    const getCurrentUser = async () => {
      if (token) {
        try {
          const userData = await currentUser(token);
          setUser(userData);
          setInitialValues({
            username: userData.username,
            fullName: userData.fullName,
            bio: userData.bio || "",
          });
          setUsername(userData.username);
          setFullName(userData.fullName);
          setBio(userData.bio || "");
          setAvatarPreview(userData.avatar);
          setCoverPicPreview(userData.coverPic);
        } catch (err) {
          console.error("Error fetching user data:", err);
          console.log(errorMessage)
          
        }
      } else {
        console.log("No token found");
        
      }
    };

    getCurrentUser();
  }, [token, setUser]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleCoverPicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setCoverPic(file);
      setCoverPicPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !fullName) {
      setErrorMessage("Username and Full Name are required");
      return;
    } else {
      setErrorMessage(null);
    }

    if (!token) {
      console.log("You're not logged in");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("fullName", fullName);
    formData.append("bio", bio);

    if (avatar) {
      formData.append("avatar", avatar);
    }
    if (coverPic) {
      formData.append("coverPic", coverPic);
    }
    setLoading(true);
    try {
      await updateUser(token, formData);
      const response = await currentUser(token);
      setUser(response);
      console.log("User updated successfully:", response);
      alert("Data Updated!");
    } catch (error) {
      console.error("Error updating user:", error);
      setErrorMessage("Error updating user, please try again later.");
    } finally {
      setLoading(false);
    }
  };
  const formValuesChanged =
    username !== initialValues?.username ||
    fullName !== initialValues?.fullName ||
    bio !== initialValues?.bio ||
    avatarPreview !== user?.avatar ||
    coverPicPreview !== user?.coverPic;
  return (
    <>
      {loading && (
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
      <DialogRoot key={"top"} placement={"top"} motionPreset="slide-in-bottom">
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
              {coverPicPreview ? (
                <Image
                  src={coverPicPreview}
                  borderRadius={10}
                  height={"100px"}
                  width={"90%"}
                  m={"auto"}
                />
              ) : user?.coverPic ? (
                <Image
                  src={user.coverPic}
                  borderRadius={10}
                  height={"100px"}
                  width={"90%"}
                  m={"auto"}
                />
              ) : (
                <Box
                  borderRadius={10}
                  height={"100px"}
                  width={"90%"}
                  m={"auto"}
                  background={"white"}
                ></Box>
              )}

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
                  src={
                    avatarPreview
                      ? avatarPreview
                      : user?.avatar
                        ? user.avatar
                        : data_img
                  }
                  alt="Avatar"
                  style={{
                    borderRadius: "100%",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Box>
            </Box>
            <Stack mt={10}>
              <form onSubmit={onSubmit}>
                <Flex direction={"column"} gap={5}>
                  <Flex gap={3} justifyContent={"end"}>
                    <label htmlFor="avatar">
                      <Box
                        backgroundColor="black"
                        color="white"
                        borderRadius="md"
                        padding="8px 16px"
                        _hover={{ backgroundColor: "green.500" }}
                        _focus={{ boxShadow: "outline" }}
                        cursor="pointer"
                        display="inline-block"
                      >
                        Upload Avatar
                      </Box>
                      <Input
                        type="file"
                        mt={4}
                        id="avatar"
                        accept="image/*"
                        display={"none"}
                        onChange={handleAvatarChange}
                      />
                    </label>
                    <label htmlFor="cover">
                      <Box
                        backgroundColor="black"
                        color="white"
                        borderRadius="md"
                        padding="8px 16px"
                        _hover={{ backgroundColor: "green.500" }}
                        _focus={{ boxShadow: "outline" }}
                        cursor="pointer"
                        display="inline-block"
                      >
                        Upload Cover
                      </Box>
                      <Input
                        type="file"
                        id="cover"
                        mt={4}
                        accept="image/*"
                        display={"none"}
                        onChange={handleCoverPicChange}
                      />
                    </label>
                  </Flex>
                  <Box>
                    <label htmlFor="fullName">
                      <Text color={"white"}>Fullname</Text>
                    </label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </Box>
                  <Box>
                    <label htmlFor="username">
                      <Text color={"white"}>Username</Text>
                    </label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Box>

                  <Box>
                    <label htmlFor="Bio">
                      <Text color={"white"}>Bio</Text>
                    </label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      maxLength={1000}
                      placeholder="Tell us a little about yourself..."
                    />
                  </Box>
                </Flex>
              </form>
            </Stack>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger>
              <Button
                backgroundColor={"green"}
                type="submit"
                onClick={onSubmit}
                disabled={!formValuesChanged}
              >
                Update Info
              </Button>
            </DialogActionTrigger>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  );
}

export default EditProfile;
