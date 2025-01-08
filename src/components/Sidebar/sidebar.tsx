import {
  Container,
  Button,
  Textarea,
  Flex,
  Stack,
  Box,
  Spinner,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useEffect } from "react";
import useAuthStore from "@/hooks/newAuthStore";
import { FaImage } from "react-icons/fa";

import { currentUser } from "@/features/users/currentUser";
import { User } from "@/types/user";
import { createThread } from "@/features/thread/createthread";

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
import data_img from "@/assets/images.jpeg";
import { fetchThreads } from "@/features/thread/fetchallthread";
function Sidebar() {
  const { token, setAllThread, logout } = useAuthStore();
  const [loggedin, setLoggedIn] = useState<User>();
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

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
  const onSubmit = async () => {
    if (!token) {
      console.log("You're not logged in");
      return;
    }
    const formData = new FormData();
    formData.append("content", content);

    if (image) {
      formData.append("image", image);
    }

    setIsLoading(true);

    try {
      const response = await createThread(token, formData);
      console.log(response.thread);
      const listThread = await fetchThreads(token);
      setAllThread(listThread);
      alert("Thread Uploaded");
      setContent("");
      setImage(null);
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const getCurrentUser = async () => {
      if (token) {
        try {
          const userData = await currentUser(token);
          setLoggedIn(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.log("No token found");
      }
    };

    getCurrentUser();
  }, [token, setLoggedIn]);

  const isPostDisabled = !(content || image);

  return (
    <>
      {isLoading && (
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
      <Stack
        position={"fixed"}
        borderRightWidth={2}
        height={"full"}
        borderColor="#3F3F3F"
        style={{ width: "20%", backgroundColor: "black" }}
      >
        <Container mt="4">
          <Link to="/" style={{ textDecoration: "none" }}>
            <h1 style={{ color: "green" }}>circle</h1>
          </Link>{" "}
        </Container>

        <Container mt="4" height={"100%"}>
          <Flex gap={3} flexDirection={"column"} height={"80%"}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Flex gap={3}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="40"
                  height="40"
                  viewBox="0 0 48 48"
                  style={{ fill: "white" }}
                >
                  <path d="M39.5,43h-9c-1.381,0-2.5-1.119-2.5-2.5v-9c0-1.105-0.895-2-2-2h-4c-1.105,0-2,0.895-2,2v9c0,1.381-1.119,2.5-2.5,2.5h-9	C7.119,43,6,41.881,6,40.5V21.413c0-2.299,1.054-4.471,2.859-5.893L23.071,4.321c0.545-0.428,1.313-0.428,1.857,0L39.142,15.52	C40.947,16.942,42,19.113,42,21.411V40.5C42,41.881,40.881,43,39.5,43z"></path>
                </svg>{" "}
                <h5 style={{ color: "white", marginTop: "auto" }}>Home</h5>
              </Flex>
            </Link>

            <Link to="/search" style={{ textDecoration: "none" }}>
              <Flex gap={3} mt={4}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="40"
                  height="40"
                  style={{ fill: "white" }}
                  viewBox="0 0 30 30"
                >
                  <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
                </svg>
                <h5 style={{ color: "white", marginTop: "auto" }}>Search</h5>
              </Flex>
            </Link>

            <Link to="/followlist" style={{ textDecoration: "none" }}>
              <Flex gap={3} mt={4}>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#ffffff"
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
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                      stroke="#ffffff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
                <h5 style={{ color: "white", marginTop: "auto" }}>Follow</h5>
              </Flex>
            </Link>

            <Link
              to={`/profile/${loggedin?.username}`}
              style={{ textDecoration: "none" }}
            >
              <Flex gap={3} mt={4}>
                <svg
                  width="40"
                  height="40"
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
                      d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
                <h5 style={{ color: "white", marginTop: "auto" }}>Profile</h5>
              </Flex>
            </Link>

            <Flex mt={3}>
              <DialogRoot
                key={"top"}
                placement={"top"}
                motionPreset="slide-in-bottom"
                size={"lg"}
              >
                <DialogTrigger asChild>
                  <Button
                    width="100%"
                    justifyContent="center"
                    rounded={"2xl"}
                    style={{ backgroundColor: "green" }}
                  >
                    Create Post
                  </Button>
                </DialogTrigger>
                <DialogContent background={"#1d1d1d"} color={"white"}>
                  <DialogHeader>
                    <DialogTitle>Addpost</DialogTitle>
                  </DialogHeader>
                  <DialogBody>
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
                            src={loggedin?.avatar ? loggedin.avatar : data_img}
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
                            height={"200px"}
                            placeholder="What is happening?!"
                            color={"white"}
                            value={content}
                            required
                            onChange={onContentChange}
                          />
                          <Flex direction={"column"} gap={"2"}></Flex>
                        </Flex>
                        {preview && (
                          <img src={preview} alt="image preview" width={400} />
                        )}
                      </form>
                    </Container>
                  </DialogBody>
                  <DialogFooter>
                    <div>
                      <label htmlFor="image" className="upload-label">
                        <input
                          type="file"
                          id="image"
                          accept="image/png, image/jpeg"
                          style={{ display: "none" }}
                          onChange={onImageChange}
                        />
                        <FaImage size={30} color="green" />
                      </label>
                    </div>
                    <DialogActionTrigger marginRight={"10%"}>
                      <Button
                        backgroundColor={"green"}
                        rounded={"2xl"}
                        color={"white"}
                        type="submit"
                        onClick={onSubmit}
                        disabled={isPostDisabled || isLoading} // Disable when no content/image or during loading
                      >
                        Post
                      </Button>
                    </DialogActionTrigger>
                  </DialogFooter>
                  <DialogCloseTrigger />
                </DialogContent>
              </DialogRoot>
            </Flex>
            <Flex width={"100%"}>
              <Button onClick={logout} background={"none"} p={0}>
                <Flex gap={3}>
                  <svg
                    width="25"
                    height="25"
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
                        opacity="0.5"
                        d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.2429 22 18.8286 22 16.0002 22H15.0002C12.1718 22 10.7576 22 9.87889 21.1213C9.11051 20.3529 9.01406 19.175 9.00195 17"
                        stroke="#ffffff"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      ></path>{" "}
                      <path
                        d="M15 12L2 12M2 12L5.5 9M2 12L5.5 15"
                        stroke="#ffffff"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>{" "}
                  <h5 style={{ color: "white", marginTop: "auto" }}>Logout</h5>
                </Flex>
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Stack>
    </>
  );
}
export default Sidebar;
