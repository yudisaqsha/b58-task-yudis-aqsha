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
import EditProfile from "./editprofile";
interface ProfileHeaderProps {
  username?: string;
}
const ProfileHeader: React.FC<ProfileHeaderProps> = ({ username }) => {
  
  const [loggedIn, setLoggedin] = useState<User | null>(null);
  const { token,user, setUser } = useAuthStore();
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
          <EditProfile/>
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
