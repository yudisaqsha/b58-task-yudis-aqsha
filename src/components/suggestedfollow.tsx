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
import useAuthStore from "@/hooks/newAuthStore";

function SuggestedFollow() {
  const [user, setUser] = useState<User[] | null>(null);
  const {token} = useAuthStore()
  if(!token){
    return
  }
  useEffect(() => {
    const fetchSuggested = async () => {
      try {
        const Followdata = await getSuggested(token);
        setUser(Followdata);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchSuggested();
  }, [setUser]);
  return (
    <Box backgroundColor="#262626" height={"400px"} borderRadius={"2xl"}overflowY={"auto"} scrollBehavior={"smooth"}>
      <Container my={5}>
        <Text color={"white"} >
          <h5>Suggested for you</h5>
        </Text>
      </Container>
      <Container>
        <Flex flexDirection="column">
          {user?.map((x) => {
            return (
              <Flex gap={3}>
                <Link to={`/profile/${x.username}`} style={{ textDecoration: "none" }}>
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
                      <Text color={"white"} >
                        {x.fullName}{" "}
                      </Text>
                      <Text color={"#8a8986"}>{x.username}</Text>
                    </Flex>
                  </Flex>
                </Link>
                <Flex justifyContent={"end"} width={"70%"}>
                  {" "}
                  <Button
                    background={"none"}
                    borderRadius={"xl"}
                    borderColor={"white"}
                  >
                    Follow
                  </Button>{" "}
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
