import { Image, Text, Flex, Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import useAuthStore from "../../hooks/newAuthStore";
import data_img from "@/assets/images.jpeg";
import FollowButton from "../Follow/followbutton";
import { profilePage } from "@/features/users/profilepageuser";
import { currentUser } from "@/features/users/currentUser";
import { User } from "@/types/user";

import EditProfile from "./editprofile";
interface ProfileHeaderProps {
  username?: string;
}
const ProfileHeader: React.FC<ProfileHeaderProps> = ({ username }) => {
  const [loggedIn, setLoggedin] = useState<User>();
  const { token, user, setUser } = useAuthStore();
  // const { user: loggedInUser } = useAuthStore((state) => state)

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
        } catch (err) {
          setError("User not found or error occurred");
          console.error("Error fetching user data:", err);
          console.log(error);
        }
      }
    };

    if (username && token) {
      getUserData();
    }
  }, [username, token, setLoggedin, setUser]);

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

      <Flex mr={8} justifyContent={"end"}>
        {user?.id === loggedIn?.id ? (
          <EditProfile />
        ) : (
          loggedIn && (
            <>
              <Box mt={3}>
                <FollowButton
                  userId={Number(user?.id)}
                  currentUserId={loggedIn.id}
                />
              </Box>
            </>
          )
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
