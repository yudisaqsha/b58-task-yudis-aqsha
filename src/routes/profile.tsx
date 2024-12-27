import {
  Input,
  Container,
  Text,
  Button,
  Flex,
  Stack,
  Box,
  For,
  SimpleGrid,
  Tabs,
} from "@chakra-ui/react";
import data_img from "../assets/images.jpeg";
import { Link,useParams, useNavigate } from "react-router-dom";
import useAuthStore from "../hooks/useAuthStore";
import Sidebar from "../components/sidebar";
import ProfileHeader from "../components/profileheader";
import PostList from "@/components/postlist";
import PostProfile from "@/components/profilepostlist";
import SuggestedFollow from "@/components/suggestedfollow";
import { LuCheckSquare, LuFolder, LuUser } from "react-icons/lu";
function Profile() {
  // const {isAuthenticated, users, currentUser, updateProfile } = useAuthStore();
  
  //  const { username } = useParams();
  //  const navigate = useNavigate();
   
  //    if (!isAuthenticated) {
  //      navigate('/login'); 
  //    }

  //  const user = users.find((user) => user.username === username);
   
  // if(!user){
    
  //   console.log(username)
  //   console.log(users[0])
  //   console.log(user)
    
  //   return <Text color={"white"}>User not found.</Text>
  // }
  const { username } = useParams();
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
          <Container
            borderBottomWidth={2}
            borderTopWidth={2}
            borderColor="#3F3F3F"
            mt={9}
            pt={4}
            pb={4}
            mx={"auto"}
          >
            <Flex gap={3}>
              {" "}
              <img
                src={data_img}
                style={{
                  borderRadius: "100%",
                  width: "40px",
                  height: "40px",
                  display: "block",
                }}
              />
              <Input
                type="textarea"
                width={"80%"}
                border={"none"}
                placeholder="What is happening?!"
                color={"white"}
              />
              <Button p={0} background={"none"}>
                <svg
                  viewBox="0 0 24 24"
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
                      d="M14.2647 15.9377L12.5473 14.2346C11.758 13.4519 11.3633 13.0605 10.9089 12.9137C10.5092 12.7845 10.079 12.7845 9.67922 12.9137C9.22485 13.0605 8.83017 13.4519 8.04082 14.2346L4.04193 18.2622M14.2647 15.9377L14.606 15.5991C15.412 14.7999 15.8149 14.4003 16.2773 14.2545C16.6839 14.1262 17.1208 14.1312 17.5244 14.2688C17.9832 14.4253 18.3769 14.834 19.1642 15.6515L20 16.5001M14.2647 15.9377L18.22 19.9628M18.22 19.9628C17.8703 20 17.4213 20 16.8 20H7.2C6.07989 20 5.51984 20 5.09202 19.782C4.7157 19.5903 4.40973 19.2843 4.21799 18.908C4.12583 18.7271 4.07264 18.5226 4.04193 18.2622M18.22 19.9628C18.5007 19.9329 18.7175 19.8791 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V13M11 4H7.2C6.07989 4 5.51984 4 5.09202 4.21799C4.7157 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.0799 4 7.2V16.8C4 17.4466 4 17.9066 4.04193 18.2622M18 9V6M18 6V3M18 6H21M18 6H15"
                      stroke="#07b029"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </Button>
              <Button backgroundColor={"green"} rounded={"2xl"} color={"white"}>
                Post
              </Button>
            </Flex>
          </Container>
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
            <Tabs.Content value="photo"></Tabs.Content>
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
