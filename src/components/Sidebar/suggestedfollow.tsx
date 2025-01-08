import { Container, Text, Flex, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import data_img from "@/assets/images.jpeg";
import { currentUser } from "@/features/users/currentUser";
import { User } from "@/types/user";
import { getSuggested } from "@/features/follow/suggesteduser";
import { useEffect, useState } from "react";
import useAuthStore from "@/hooks/newAuthStore";

import FollowButton from "../Follow/followbutton";

function SuggestedFollow() {
  const { token } = useAuthStore();
  // const { suggestedUsers, fetchSuggestedUsers, isLoading, fetchFollowed } =
  //   useFollowStore();
  const [suggestedUsers, setSuggestedUsers] = useState<User[]>();
  const [loggedIn, setLoggedin] = useState<User>();

  useEffect(() => {
    const fetchSuggested = async () => {
      if (token) {
        const listSuggested = await getSuggested(token);
        const loggedin = await currentUser(token);
        setSuggestedUsers(listSuggested);
        setLoggedin(loggedin);
      }
    };
    fetchSuggested();
  }, [token, setSuggestedUsers, setLoggedin]);
  return (
    <Box
      backgroundColor="#262626"
      height={"400px"}
      borderRadius={"2xl"}
      overflowY={"auto"}
      scrollBehavior={"smooth"}
    >
      <Container my={5}>
        <Text color={"white"}>
          <h5>Suggested for you</h5>
        </Text>
      </Container>
      <Container>
        <Flex flexDirection="column">
          {suggestedUsers?.map((x) => {
            return (
              <Flex gap={3}>
                <Link
                  to={`/profile/${x.username}`}
                  style={{ textDecoration: "none" }}
                >
                  <Flex gap={3}>
                    <img
                      src={x.avatar ? x.avatar : data_img}
                      style={{
                        borderRadius: "100%",
                        width: "40px",
                        height: "40px",
                        display: "block",
                      }}
                    />
                    <Flex flexDirection={"column"} width={"20vh"}>
                      <Text color={"white"}>{x.fullName} </Text>
                      <Text color={"#8a8986"}>{x.username}</Text>
                    </Flex>
                  </Flex>
                </Link>
                <Flex justifyContent={"end"} width={"70%"}>
                  {loggedIn && (
                    <FollowButton userId={x.id} currentUserId={loggedIn.id} />
                  )}{" "}
                  {/*  */}
                </Flex>
              </Flex>
            );
          })}
        </Flex>
      </Container>
    </Box>
  );
}

export default SuggestedFollow;
