import {
  Input,
  Container,
  Text,
  Button,
  Flex,
  Stack,
  Box,
  IconButton
} from "@chakra-ui/react";
import data_img from "../assets/images.jpeg";
import { Link } from "react-router-dom";
import Sidebar from "@/components/sidebar";
import ProfileSidebar from "@/components/profilesidebar";
import PostList from "@/components/postlist";
import SuggestedFollow from "@/components/suggestedfollow";
import { useParams } from 'react-router-dom';
import useAuthStore from "@/hooks/useAuthStore";
import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function DetailPost() {
  const { id } = useParams();
  const { posts, addComment, users, currentUser,likePost } = useAuthStore((state) => state);
  const [commentText, setCommentText] = useState('');
  const post = posts.find((post) => post.id === id);
  const postId = post?.id
  if (!post) {
    return <Text color={"white"}>Post not found.</Text>;
  }
  
  const handleAddComment = (postId: string) => {
    if (commentText.trim() && currentUser && currentUser.username && currentUser.fullName) {
      
      const newComment = {
        comment_id: Date.now().toString(),
        text: commentText,
        user: { username: currentUser?.username, fullName: currentUser?.fullName }
      };
      addComment(postId, newComment);
      setCommentText(''); 
    }
  };
  return (
    <>
      <Flex scrollbar="hidden"overflowY="auto" height={"200vh"}>
        <Sidebar></Sidebar>
        <Stack
          ml={"20%"}
          width={"45%"}
          height={"100%"}
          mt={4}
          borderRightWidth={2}
          borderColor={"#3F3F3F"}
        >
          <Container >
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
              <h3 style={{ color: "white" }}>Status</h3>
            </Flex>
          </Container>
          <Container borderBottomWidth={2} borderColor="#3F3F3F" mt={3}>
            <Flex gap={3}>
              {" "}
              <Link to="/profile" style={{ textDecoration: "none" }}>
                <img
                  src={data_img}
                  style={{
                    borderRadius: "100%",
                    width: "40px",
                    height: "40px",
                    display: "block",
                  }}
                />
              </Link>
              <Flex gap={1} flexDirection={"column"}>
                <Link to="/profile" style={{ textDecoration: "none", height: "20%" }}>
                  <Flex gap={3}>
                    <Text fontWeight={"bold"} color={"white"}>
                      {post.user.fullName}
                    </Text>
                    <Text color={"#3F3F3F"}>@{post.user.username}</Text>
                  </Flex>
                </Link>
                <Link to="/detailpost" style={{ textDecoration: "none" }}>
                  <Text color={"white"}>{post.status}</Text>
                  {/* {data.imagedata && <img src={data.imagedata} height={"200px"}/>} */}
                  
                </Link>
                

                <Flex gap={3} mt={3}>
                <IconButton
                    onClick={() => likePost(post.id)}
                    colorScheme="gray"
                    aria-label="Like Post"
                    size="sm"
                    p={0}
                    background={"none"}
                  >
                    {post.liked ? (
                      <AiFillHeart color="red" />
                    ) : (
                      <AiOutlineHeart />
                    )}
                    <Text m={"auto"}  color={"white"}>{post.likes}</Text>
                  </IconButton>
                  <Button p={0} pb={0} mt={"3.5"} height={"50%"} background={"none"}>
                    <Flex gap={1}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 -0.5 25 25"
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
                            d="M9.0001 8.517C8.58589 8.517 8.2501 8.85279 8.2501 9.267C8.2501 9.68121 8.58589 10.017 9.0001 10.017V8.517ZM16.0001 10.017C16.4143 10.017 16.7501 9.68121 16.7501 9.267C16.7501 8.85279 16.4143 8.517 16.0001 8.517V10.017ZM9.8751 11.076C9.46089 11.076 9.1251 11.4118 9.1251 11.826C9.1251 12.2402 9.46089 12.576 9.8751 12.576V11.076ZM15.1251 12.576C15.5393 12.576 15.8751 12.2402 15.8751 11.826C15.8751 11.4118 15.5393 11.076 15.1251 11.076V12.576ZM9.1631 5V4.24998L9.15763 4.25002L9.1631 5ZM15.8381 5L15.8438 4.25H15.8381V5ZM19.5001 8.717L18.7501 8.71149V8.717H19.5001ZM19.5001 13.23H18.7501L18.7501 13.2355L19.5001 13.23ZM18.4384 15.8472L17.9042 15.3207L17.9042 15.3207L18.4384 15.8472ZM15.8371 16.947V17.697L15.8426 17.697L15.8371 16.947ZM9.1631 16.947V16.197C9.03469 16.197 8.90843 16.23 8.79641 16.2928L9.1631 16.947ZM5.5001 19H4.7501C4.7501 19.2662 4.89125 19.5125 5.12097 19.6471C5.35068 19.7817 5.63454 19.7844 5.86679 19.6542L5.5001 19ZM5.5001 8.717H6.25012L6.25008 8.71149L5.5001 8.717ZM6.56175 6.09984L6.02756 5.5734H6.02756L6.56175 6.09984ZM9.0001 10.017H16.0001V8.517H9.0001V10.017ZM9.8751 12.576H15.1251V11.076H9.8751V12.576ZM9.1631 5.75H15.8381V4.25H9.1631V5.75ZM15.8324 5.74998C17.4559 5.76225 18.762 7.08806 18.7501 8.71149L20.2501 8.72251C20.2681 6.2708 18.2955 4.26856 15.8438 4.25002L15.8324 5.74998ZM18.7501 8.717V13.23H20.2501V8.717H18.7501ZM18.7501 13.2355C18.7558 14.0153 18.4516 14.7653 17.9042 15.3207L18.9726 16.3736C19.7992 15.5348 20.2587 14.4021 20.2501 13.2245L18.7501 13.2355ZM17.9042 15.3207C17.3569 15.8761 16.6114 16.1913 15.8316 16.197L15.8426 17.697C17.0201 17.6884 18.1461 17.2124 18.9726 16.3736L17.9042 15.3207ZM15.8371 16.197H9.1631V17.697H15.8371V16.197ZM8.79641 16.2928L5.13341 18.3458L5.86679 19.6542L9.52979 17.6012L8.79641 16.2928ZM6.2501 19V8.717H4.7501V19H6.2501ZM6.25008 8.71149C6.24435 7.93175 6.54862 7.18167 7.09595 6.62627L6.02756 5.5734C5.20098 6.41216 4.74147 7.54494 4.75012 8.72251L6.25008 8.71149ZM7.09595 6.62627C7.64328 6.07088 8.38882 5.75566 9.16857 5.74998L9.15763 4.25002C7.98006 4.2586 6.85413 4.73464 6.02756 5.5734L7.09595 6.62627Z"
                            fill="#ffffff"
                          ></path>{" "}
                        </g>
                      </svg>
                      <Text color={"white"}>{post.comments.length}</Text>
                    </Flex>
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Container>
          <Container borderBottomWidth={2} borderColor="#3F3F3F" pb={4} mx={"auto"}>
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
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
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
          <Button backgroundColor={"green"} rounded={"2xl"} color={"white"} onClick={() => postId && handleAddComment(postId)}>
            Post
          </Button>
        </Flex>
      </Container>
      {post.comments.map((data) => {
        return (
          <Container borderBottomWidth={2} borderColor="#3F3F3F" mt={3}>
            <Flex gap={3}>
              {" "}
              <Link to="/profile" style={{ textDecoration: "none" }}>
                <img
                  src={data_img}
                  style={{
                    borderRadius: "100%",
                    width: "40px",
                    height: "40px",
                    display: "block",
                  }}
                />
              </Link>
              <Flex gap={1} flexDirection={"column"}>
                <Link
                  to="/profile"
                  style={{ textDecoration: "none", height: "20%" }}
                >
                  <Flex gap={3}>
                    <Text fontWeight={"bold"} color={"white"}>
                      {data.user.fullName}
                    </Text>
                    <Text color={"#3F3F3F"}>@{data.user.username}</Text>
                  </Flex>
                </Link>
                
                  <Text color={"white"}>{data.text}</Text>
                  {/* {data.imagedata && <img src={data.imagedata} height={"200px"}/>} */}
               

                
                  
                  
                </Flex>
              </Flex>
            
          </Container>
        );
      })}
        </Stack>
        <Stack height={"100%"} position="sticky">
          <Flex
            height={"100%"}
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
    </>
  );
}

export default DetailPost;
