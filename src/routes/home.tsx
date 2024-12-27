import {
  Input,
  Container,
  Text,
  Button,
  Flex,
  Stack,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import data_img from "../assets/images.jpeg";
import Sidebar from "../components/sidebar";
import AddPost from "@/components/addpost";
import ProfileSidebar from "@/components/profilesidebar";
import SuggestedFollow from "@/components/suggestedfollow";
import useAuthStore from '../hooks/newAuthStore';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from "react";
function Home() {
 
  

  return (
    <Flex overflowY={"auto"} scrollBehavior={"smooth"} height={"100vh"}>
      <Sidebar/>
      <AddPost></AddPost>
      <Stack  height={"100%"} position="sticky">
        <Flex  height={"100vh"} gap={5} mt={10} ml={10} flexDirection={"column"} width={"450px"}>
          <ProfileSidebar></ProfileSidebar>
          <SuggestedFollow></SuggestedFollow>
          
        </Flex>
      </Stack >
    </Flex>
  );
}

export default Home;
