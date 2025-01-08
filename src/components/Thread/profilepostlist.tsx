import {
    
    Container,
    Text,
    Button,
    Flex,
    
    Spinner
  } from "@chakra-ui/react";
  import { fetchProfileThreads } from "@/features/thread/profilethread";
  import { Link, useLocation } from "react-router-dom";
  import useAuthStore from "@/hooks/newAuthStore";
  import data_img from "@/assets/images.jpeg";
  import { useEffect,useState } from "react";
  import LikeButton from "./LikeButton";
  interface ProfileHeaderProps {
    username?: string;
  }
  function PostProfile({ username }: ProfileHeaderProps) {
    const { threads, setAllThread, token } = useAuthStore();
    const [error, setError] = useState<string | null>(null);
   
    const [loading, setLoading] = useState<boolean>(false);
    const location = useLocation();

     useEffect(() => {
        const loadThreads = async () => {
          if (!token || !username) {
            setError('Authentication token is missing');
            
            return;
          }
          setError(null);     
          setLoading(true);
          try {
            const fetchedThreads = await fetchProfileThreads(token,username);  
            setAllThread(fetchedThreads);
            console.log(fetchedThreads)
          } catch (err) {
            setError('Failed to load threads');  
          } finally {
            setLoading(false); 
          }
        };
    
        loadThreads(); 
      }, [setAllThread, token, location]);
    // const postDetail = (postId: string) => {
    //   navigate(`/post/${postId}`);
    // };
    // const handleLike = (postId: string) => {
    //   likePost(postId);
    // };
    return (
      <>
      {loading ? (
        <Flex justify="center" align="center" height="200px">
          <Spinner size="xl" color="white" />
        </Flex>
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : threads?.length === 0 ? (
        <Text color="white">No Thread Available</Text>
      ) : (
        threads?.map((data) => {
          return (
            <Container borderBottomWidth={2} borderColor="#3F3F3F" mt={3} key={data.id}>
              <Flex gap={4}>
                <Link to={`/profile/${data.author.username}`} style={{ textDecoration: "none" }}>
                  <img
                    src={data.author.avatar ? data.author.avatar : data_img}
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
                  <Link to={`/detailpost/${data.id}`} style={{ textDecoration: "none", width: "100%" }}>
                    <Text color={"white"}>{data.content}</Text>
                    {data.image && <img src={data.image} height={"200px"} />}
                  </Link>

                  <Flex gap={3}>
                    <Flex gap={2}>
                    <LikeButton threadId={data.id} initialLiked={data.userHasLiked} initialLikesCount={data._count.likes}></LikeButton>
                      <Button p={0} pb={0} mt={"3.5"} height={"50%"} background={"none"}>
                        <Flex gap={1}>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 -0.5 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.0001 8.517C8.58589 8.517 8.2501 8.85279 8.2501 9.267C8.2501 9.68121 8.58589 10.017 9.0001 10.017V8.517ZM16.0001 10.017C16.4143 10.017 16.7501 9.68121 16.7501 9.267C16.7501 8.85279 16.4143 8.517 16.0001 8.517V10.017ZM9.8751 11.076C9.46089 11.076 9.1251 11.4118 9.1251 11.826C9.1251 12.2402 9.46089 12.576 9.8751 12.576V11.076ZM15.1251 12.576C15.5393 12.576 15.8751 12.2402 15.8751 11.826C15.8751 11.4118 15.5393 11.076 15.1251 11.076V12.576ZM9.1631 5V4.24998L9.15763 4.25002L9.1631 5ZM15.8381 5L15.8438 4.25H15.8381V5ZM19.5001 8.717L18.7501 8.71149V8.717H19.5001ZM19.5001 13.23H18.7501L18.7501 13.2355L19.5001 13.23ZM18.4384 15.8472L17.9042 15.3207L17.9042 15.3207L18.4384 15.8472ZM15.8371 16.947V17.697L15.8426 17.697L15.8371 16.947ZM9.1631 16.947V16.197C9.03469 16.197 8.90843 16.23 8.79641 16.2928L9.1631 16.947ZM5.5001 19H4.7501C4.7501 19.2662 4.89125 19.5125 5.12097 19.6471C5.35068 19.7817 5.63454 19.7844 5.86679 19.6542L5.5001 19ZM5.5001 8.717H6.25012L6.25008 8.71149L5.5001 8.717ZM6.56175 6.09984L6.02756 5.5734H6.02756L6.56175 6.09984ZM9.0001 10.017H16.0001V8.517H9.0001V10.017ZM9.8751 12.576H15.1251V11.076H9.8751V12.576ZM9.1631 5.75H15.8381V4.25H9.1631V5.75ZM15.8324 5.74998C17.4559 5.76225 18.762 7.08806 18.7501 8.71149L20.2501 8.72251C20.2681 6.2708 18.2955 4.26856 15.8438 4.25002L15.8324 5.74998ZM18.7501 8.717V13.23H20.2501V8.717H18.7501ZM18.7501 13.2355C18.7558 14.0153 18.4516 14.7653 17.9042 15.3207L18.9726 16.3736C19.7992 15.5348 20.2587 14.4021 20.2501 13.2245L18.7501 13.2355ZM17.9042 15.3207C17.3569 15.8761 16.6114 16.1913 15.8316 16.197L15.8426 17.697C17.0201 17.6884 18.1461 17.2124 18.9726 16.3736L17.9042 15.3207ZM15.8371 16.197H9.1631V17.697H15.8371V16.197ZM8.79641 16.2928L5.13341 18.3458L5.86679 19.6542L9.52979 17.6012L8.79641 16.2928ZM6.2501 19V8.717H4.7501V19H6.2501ZM6.25008 8.71149C6.24435 7.93175 6.54862 7.18167 7.09595 6.62627L6.02756 5.5734C5.20098 6.41216 4.74147 7.54494 4.75012 8.72251L6.25008 8.71149ZM7.09595 6.62627C7.64328 6.07088 8.38882 5.75566 9.16857 5.74998L9.15763 4.25002C7.98006 4.2586 6.85413 4.73464 6.02756 5.5734L7.09595 6.62627Z"
                              fill="#ffffff"
                            ></path>
                          </svg>
                          <Text color={"white"}>{data._count.comments}</Text>
                        </Flex>
                      </Button>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Container>
          );
        })
      )}
    </>
    );
  }
  export default PostProfile;
  