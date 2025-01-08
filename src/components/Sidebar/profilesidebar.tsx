import { Image, Text, Flex, Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { currentUser } from "@/features/users/currentUser";

import EditProfile from "../Users/editprofile";
import useAuthStore from "../../hooks/newAuthStore";
import data_img from "@/assets/images.jpeg";

function ProfileSidebar() {
  const { user, setUser, token } = useAuthStore();

  // const avatar = watch("avatar");
  // const coverPic = watch("coverPic");
  useEffect(() => {
    const getCurrentUser = async () => {
      if (token) {
        try {
          const userData = await currentUser(token);
          setUser(userData);
          // setInitialValues({
          //   username: userData.username,
          //   fullName: userData.fullName,
          //   bio: userData.bio || "",
          // });
          // setUsername(userData.username);
          // setFullName(userData.fullName);
          // setBio(userData.bio || "");
          // setAvatarPreview(userData.avatar);
          // setCoverPicPreview(userData.coverPic);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.log("No token found");
      }
    };

    getCurrentUser();
  }, [token, setUser]);

  // const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files ? e.target.files[0] : null;
  //   if (file) {
  //     setAvatar(file);
  //     setAvatarPreview(URL.createObjectURL(file));
  //   }
  // };

  // const handleCoverPicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files ? e.target.files[0] : null;
  //   if (file) {
  //     setCoverPic(file);
  //     setCoverPicPreview(URL.createObjectURL(file));
  //   }
  // };

  // const onSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!username || !fullName) {
  //     setErrorMessage("Username and Full Name are required");
  //     return;
  //   } else {
  //     setErrorMessage(null);
  //   }

  //   if (!token) {
  //     console.log("You're not logged in");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("username", username);
  //   formData.append("fullName", fullName);
  //   formData.append("bio", bio);

  //   if (avatar) {
  //     formData.append("avatar", avatar);
  //   }
  //   if (coverPic) {
  //     formData.append("coverPic", coverPic);
  //   }

  //   try {
  //     await updateUser(token, formData);
  //     const response = await currentUser(token);
  //     setUser(response);
  //     console.log("User updated successfully:", response);
  //     alert("Data Updated!");
  //   } catch (error) {
  //     console.error("Error updating user:", error);
  //     setErrorMessage("Error updating user, please try again later.");
  //   }
  // };
  // const formValuesChanged =
  //   username !== initialValues?.username ||
  //   fullName !== initialValues?.fullName ||
  //   bio !== initialValues?.bio ||
  //   avatarPreview !== user?.avatar ||
  //   coverPicPreview !== user?.coverPic;
  return (
    <Box backgroundColor="#262626" borderRadius={"2xl"}>
      <h5 style={{ color: "white", marginTop: "25px", marginLeft: "25px" }}>
        My Profile
      </h5>

      <Box position={"relative"} mt={5}>
        {user?.coverPic ? (
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
        <EditProfile></EditProfile>
      </Flex>
      <Box ml="25px">
        <Text color={"white"}>
          <h4>{user?.fullName}</h4>{" "}
        </Text>
        <Text color={"#8a8986"}>@{user?.username}</Text>
        <Text color={"white"}>{user?.bio ? user?.bio : "No Bio Yet"}</Text>
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
}

export default ProfileSidebar;
