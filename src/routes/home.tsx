import { Flex, Stack } from "@chakra-ui/react";

import Sidebar from "../components/Sidebar/sidebar";
import AddPost from "@/components/Thread/addpost";
import ProfileSidebar from "@/components/Sidebar/profilesidebar";
import SuggestedFollow from "@/components/Sidebar/suggestedfollow";

function Home() {
  return (
    <Flex overflowY={"auto"} scrollBehavior={"smooth"} height={"100vh"}>
      <Sidebar />
      <AddPost></AddPost>
      <Stack height={"100%"} position="sticky">
        <Flex
          height={"100vh"}
          gap={5}
          mt={10}
          ml={10}
          flexDirection={"column"}
          width={"450px"}
        >
          <ProfileSidebar></ProfileSidebar>
          <SuggestedFollow></SuggestedFollow>
        </Flex>
      </Stack>
    </Flex>
  );
}

export default Home;
