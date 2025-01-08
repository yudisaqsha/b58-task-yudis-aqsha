import {
  Container,
  Text,
  Button,
  Flex,
  Stack,
  Box,
  Textarea,
  Spinner,
  Image,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import data_img from "@/assets/images.jpeg";
import { fetchComment } from "@/features/thread/getcomment";
import useAuthStore from "@/hooks/newAuthStore";
import { useState, useEffect } from "react";
import { fetchThreadsbyId } from "@/features/thread/threadbyid";
import { FaImage } from "react-icons/fa";
import { currentUser } from "@/features/users/currentUser";
import LikeButton from "@/components/Thread/LikeButton";
import EditThread from "@/components/Thread/updatethreaddialog";
import DeleteThread from "@/components/Thread/deletethread";
import EditReply from "@/components/Thread/updateReplyDialog";
import DeleteReply from "@/components/Thread/deletereply";
import { addReply } from "@/features/thread/addreply";
import FollowButton from "../Follow/followbutton";

function ImageDetail() {
  const { id } = useParams();
  const { token, thread, setThread, comments, setComments, user, setUser } =
    useAuthStore((state) => state);
  const [error, setError] = useState("");
  // const [commentText, setCommentText] = useState('');
  const [content, setContent] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getThread = async () => {
      if (token && id) {
        setLoading(true);
        try {
          const userdata = await currentUser(token);
          const data = await fetchThreadsbyId(token, String(id));
          const commentData = await fetchComment(token, String(id));
          setUser(userdata);
          setThread(data);
          setComments(commentData);
          console.log(data);
          console.log(commentData);
        } catch (err) {
          setError("User not found or error occurred");
          console.error("Error fetching user data:", err);
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (id && token) {
      getThread();
    }
  }, [id, token, setThread, setComments, setUser]);
  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      console.log("You're not logged in");
      return;
    }
    const formData = new FormData();
    formData.append("content", content);

    if (image) {
      formData.append("image", image);
    }

    setLoading(true);
    try {
      const response = await addReply(token, String(id), formData);
      console.log(response.comment);
      const datacomment = await fetchComment(token, String(id));
      setComments(datacomment);
      alert("Reply Uploaded");
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
      setContent("");
      setImage(null);
      setPreview(null);
    }
  };
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
      {/* <DialogRoot
        size="cover"
        placement="center"
        motionPreset="slide-in-bottom"
      >
        <DialogTrigger asChild>
          <Image src={thread?.image} width={"100%"} height={"100%"} key={id}/>
        </DialogTrigger>
        <DialogContent background={"#1d1d1d"} height={"auto"}>
          <DialogHeader>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody> */}
      <Flex mx={10} gap={0} justifyContent={"center"} alignContent={"center"}>
        <Image
          src={thread?.image}
          width={"35%"}
          my={"100px"}
          mx={10}
          height={"auto"}
        />
        <Stack
          width={"45%"}
          height={"100%"}
          mt={4}
          borderRightWidth={2}
          borderColor={"#3F3F3F"}
        >
          <Container borderBottomWidth={2} borderColor="#3F3F3F" mt={3}>
            {thread && (
              <Flex gap={3}>
                {" "}
                <Link
                  to={`/profile/${thread.author.username}`}
                  style={{ textDecoration: "none" }}
                >
                  <img
                    src={
                      thread?.author.avatar ? thread.author.avatar : data_img
                    }
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
                    to={`/profile/${thread.author.username}`}
                    style={{ textDecoration: "none", height: "20%" }}
                  >
                    <Flex gap={3}>
                      <Text fontWeight={"bold"} color={"white"}>
                        {thread?.author.fullName}
                      </Text>
                      <Text color={"#3F3F3F"}>@{thread?.author.username}</Text>
                    </Flex>
                  </Link>

                  <Text color={"white"}>{thread?.content}</Text>

                  <Flex gap={3} mt={3}>
                    <LikeButton
                      threadId={thread!.id}
                      initialLiked={thread!.userHasLiked}
                      initialLikesCount={thread!._count.likes}
                    ></LikeButton>
                    <Button
                      p={0}
                      pb={0}
                      mt={"3.5"}
                      height={"50%"}
                      background={"none"}
                    >
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
                        <Text color={"white"}>{thread?._count.comments}</Text>
                      </Flex>
                    </Button>
                  </Flex>
                </Flex>
                {user && thread.author.id !== user.id && (
                  <>
                    <Box ml={4}>
                      <FollowButton
                        userId={thread.author.id}
                        currentUserId={user.id}
                      />
                    </Box>
                  </>
                )}
                {thread.author.id === user?.id && (
                  <Flex justifyContent={"end"} width={"60%"}>
                    <EditThread threadId={Number(id)} />
                    <DeleteThread threadId={Number(id)} />
                  </Flex>
                )}
              </Flex>
            )}
          </Container>

          <Container
            borderBottomWidth={2}
            borderColor="#3F3F3F"
            pb={4}
            mx={"auto"}
          >
            <form
              onSubmit={onSubmit}
              encType="multipart/form-data"
              style={{ width: "90%" }}
            >
              <Flex gap={5}>
                {" "}
                <img
                  src={user?.avatar ? user.avatar : data_img}
                  style={{
                    borderRadius: "100%",
                    width: "40px",
                    height: "40px",
                    display: "block",
                  }}
                />
                <Textarea
                  border={"none"}
                  borderRadius={"lg"}
                  id="content"
                  height={"50px"}
                  overflowY={"auto"}
                  scrollBehavior={"smooth"}
                  placeholder="What is happening?!"
                  color={"white"}
                  value={content}
                  onChange={onContentChange}
                />
                <Flex direction={"column"} gap={"2"}>
                  <div>
                    <label htmlFor="imagereply" className="upload-label">
                      <input
                        type="file"
                        id="imagereply"
                        accept="image/png, image/jpeg"
                        style={{ display: "none" }}
                        onChange={onImageChange}
                      />
                      <FaImage size={30} color="green" />
                    </label>
                  </div>
                </Flex>
                <Button
                  type="submit"
                  background={"green"}
                  color={"white"}
                  borderRadius={"lg"}
                >
                  Post
                </Button>
              </Flex>
              {preview && <img src={preview} alt="image preview" width={100} />}
            </form>
          </Container>
          <Container
            borderBottomWidth={2}
            borderColor="#3F3F3F"
            mt={3}
            maxHeight="700px"
            overflowY="auto"
            p={2}
            scrollBehavior={"smooth"}
            scrollbar={"hidden"}
          >
            {comments?.map((data) => {
              return (
                <Container borderBottomWidth={2} borderColor="#3F3F3F" mt={3}>
                  <Flex gap={3}>
                    {" "}
                    <Link
                      to={`/profile/${data.author.username}`}
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        src={
                          data?.author.avatar ? data.author.avatar : data_img
                        }
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
                        to={`/profile/${data.author.username}`}
                        style={{ textDecoration: "none", height: "20%" }}
                      >
                        <Flex gap={3}>
                          <Text fontWeight={"bold"} color={"white"}>
                            {data.author.fullName}
                          </Text>
                          <Text color={"#3F3F3F"}>@{data.author.username}</Text>
                        </Flex>
                      </Link>

                      <Text color={"white"}>{data.content}</Text>
                      {data.image && (
                        <img
                          src={data.image}
                          height={"200px"}
                          style={{ marginBottom: "20px" }}
                        />
                      )}
                      {data.author.id === user?.id && (
                        <>
                          <Flex>
                            <EditReply
                              threadId={Number(id)}
                              commentId={Number(data.id)}
                            />
                            <DeleteReply
                              threadId={Number(id)}
                              commentId={data.id}
                            />
                          </Flex>
                        </>
                      )}
                    </Flex>
                  </Flex>
                </Container>
              );
            })}
          </Container>
        </Stack>
      </Flex>
      {/* </DialogBody>
        </DialogContent>
      </DialogRoot> */}
    </>
  );
}

export default ImageDetail;
