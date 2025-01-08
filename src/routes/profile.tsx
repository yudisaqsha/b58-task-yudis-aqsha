import {
  Input,
  Container,
  Text,
  Button,
  Flex,
  Stack,
  Box,
  For,
  Grid,
  SimpleGrid,
  Textarea,
  Tabs,
} from "@chakra-ui/react";
import data_img from "../assets/images.jpeg";
import { Link,useParams, useNavigate } from "react-router-dom";
import useAuthStore from "../hooks/newAuthStore";
import Sidebar from "../components/sidebar";
import ProfileHeader from "../components/profileheader";
import PostList from "@/components/postlist";
import PostProfile from "@/components/profilepostlist";
import SuggestedFollow from "@/components/suggestedfollow";
import { profilePage } from "@/features/profilepageuser";
import { User, currentUser } from "@/features/currentUser";
import { useState, useEffect } from "react";
import { LuCheckSquare, LuFolder, LuUser } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createThread } from "@/features/createthread";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUpload, FaImage } from "react-icons/fa";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogActionTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProfileGallery from "@/components/picturegallery";
const threadSchema = z.object({
  content: z.string().min(1, { message: "Content is required" }),

  image: z.instanceof(FileList).optional(), // Optional file input
});

type ThreadData = z.infer<typeof threadSchema>;
function Profile() {
  
  const { username } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setLoggedin] = useState<User | null>(null);
  const [preview, setPreview] = useState<string | null>('')
  const [error, setError] = useState<string | null>('')
  const { token } = useAuthStore();
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
    <>
      <Flex>
        <Sidebar></Sidebar>
        <Stack
          ml={"20%"}
          width={"45%"}
          mt={4}
          borderRightWidth={2}
          borderColor={"#3F3F3F"}
          
        >
          <Container>
            <Flex gap={3}>
              <Link to="/" style={{ textDecoration: "none" }}>
                <svg
                  viewBox="0 0 24 24"
                  width={30}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M9.66088 8.53078C9.95402 8.23813 9.95442 7.76326 9.66178 7.47012C9.36913 7.17698 8.89426 7.17658 8.60112 7.46922L9.66088 8.53078ZM4.47012 11.5932C4.17698 11.8859 4.17658 12.3607 4.46922 12.6539C4.76187 12.947 5.23674 12.9474 5.52988 12.6548L4.47012 11.5932ZM5.51318 11.5771C5.21111 11.2936 4.73648 11.3088 4.45306 11.6108C4.16964 11.9129 4.18475 12.3875 4.48682 12.6709L5.51318 11.5771ZM8.61782 16.5469C8.91989 16.8304 9.39452 16.8152 9.67794 16.5132C9.96136 16.2111 9.94625 15.7365 9.64418 15.4531L8.61782 16.5469ZM5 11.374C4.58579 11.374 4.25 11.7098 4.25 12.124C4.25 12.5382 4.58579 12.874 5 12.874V11.374ZM15.37 12.124V12.874L15.3723 12.874L15.37 12.124ZM17.9326 13.1766L18.4614 12.6447V12.6447L17.9326 13.1766ZM18.25 15.7351C18.2511 16.1493 18.5879 16.4841 19.0021 16.483C19.4163 16.4819 19.7511 16.1451 19.75 15.7309L18.25 15.7351ZM8.60112 7.46922L4.47012 11.5932L5.52988 12.6548L9.66088 8.53078L8.60112 7.46922ZM4.48682 12.6709L8.61782 16.5469L9.64418 15.4531L5.51318 11.5771L4.48682 12.6709ZM5 12.874H15.37V11.374H5V12.874ZM15.3723 12.874C16.1333 12.8717 16.8641 13.1718 17.4038 13.7084L18.4614 12.6447C17.6395 11.8276 16.5267 11.3705 15.3677 11.374L15.3723 12.874ZM17.4038 13.7084C17.9435 14.245 18.2479 14.974 18.25 15.7351L19.75 15.7309C19.7468 14.572 19.2833 13.4618 18.4614 12.6447L17.4038 13.7084Z"
                      fill="#ffffff"
                    ></path>{" "}
                  </g>
                </svg>
              </Link>
              <h3 style={{ color: "white" }}>Profile</h3>
            </Flex>
          </Container>
          <Stack height={"100%"} px={8}>
            <ProfileHeader username={username}/>
          </Stack>
          
          <Tabs.Root defaultValue="post">
            
            <Tabs.List>
            
            <Tabs.Trigger value="post" asChild>
                <Box px={"25%"} borderBottomWidth={2} borderRightWidth={2}>
                  <Link
                    style={{ textUnderlineOffset: "2", color: "white" }}
                    to="#post"
                  >
                    Post
                  </Link>
                </Box>
              </Tabs.Trigger>
              <Tabs.Trigger value="photo" asChild>
                <Box px={"25%"}>
                  <Link
                    style={{ textUnderlineOffset: "2", color: "white" }}
                    to="#photo"
                  >
                    Photo
                  </Link>
                </Box>
              </Tabs.Trigger>
          
              
            </Tabs.List>
            <Tabs.Content value="post">
              <PostProfile username={username}/>
            </Tabs.Content>
            <Tabs.Content value="photo">
              <ProfileGallery username={username}></ProfileGallery>
            </Tabs.Content>
          </Tabs.Root>
        </Stack>
        <Stack width={"450px"} ml={10} mt={"14"}>
          <SuggestedFollow></SuggestedFollow>
        </Stack>
      </Flex>
    </>
  );
}
export default Profile;
