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

interface followsuggest {
  name: string;
  username: string;
}
const listFollow: followsuggest[] = [
  {
    name: "Name1",
    username: "username1",
  },
  {
    name: "Name2",
    username: "username2",
  },
  {
    name: "Name1",
    username: "username2",
  },
];
function SuggestedFollow() {
  return (
    <Box backgroundColor="#262626" borderRadius={"2xl"}>
      <Container my={5}>
        <Text color={"white"}>
          <h5>Suggested for you</h5>
        </Text>
      </Container>
      <Container mt={4}>
        <Flex flexDirection="column" gap={1}>
          {listFollow.map((x) => {
            return (
              <Flex gap={3}>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Flex gap={3}>
                    <img
                      src={data_img}
                      style={{
                        borderRadius: "100%",
                        width: "40px",
                        height: "40px",
                        display: "block",
                      }}
                    />
                    <Flex flexDirection={"column"}>
                      <Text color={"white"} height={"15%"}>
                        {x.name}{" "}
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
