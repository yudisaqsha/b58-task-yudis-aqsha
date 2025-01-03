import {
  Input,
  Container,
  Text,
  Button,
  Flex,
  Stack,
  Box,
  Color,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import data_img from "../assets/images.jpeg";
import { User } from "@/api/currentUser";
import { getSuggested } from "@/api/suggesteduser";
import React, { useEffect, useState } from "react";
import useAuthStore, { useFollowStore } from "@/hooks/newAuthStore";
import  FollowButton  from "./followbutton";

function SuggestedFollow() {
  const [user, setUser] = useState<User[] | null>(null);
  const { token } = useAuthStore();
  const { suggestedUsers, fetchSuggestedUsers, isLoading, fetchFollowed } =
    useFollowStore();
    const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      fetchSuggestedUsers(token)
      fetchFollowed(token);
    }
  }, [token]);
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
                  {" "}
                  <FollowButton
                    userId={x.id}
                  />
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
