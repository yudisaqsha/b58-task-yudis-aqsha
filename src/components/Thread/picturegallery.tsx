import { Text, Flex, Box, Image, Grid, Spinner } from "@chakra-ui/react";

import { fetchProfileThreads } from "@/features/thread/profilethread";
import { useLocation, Link } from "react-router-dom";
import useAuthStore from "@/hooks/newAuthStore";

import { useEffect, useState } from "react";

interface ProfileHeaderProps {
  username?: string;
}
function ProfileGallery({ username }: ProfileHeaderProps) {
  const { threads, setAllThread, token } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const loadThreads = async () => {
      if (!token || !username) {
        setError("Authentication token is missing");

        return;
      }
      setError(null);
      setLoading(true);
      try {
        const fetchedThreads = await fetchProfileThreads(token, username);
        setAllThread(fetchedThreads);
        console.log(fetchedThreads);
      } catch (err) {
        setError("Failed to load threads");
      } finally {
        setLoading(false);
      }
    };

    loadThreads();
  }, [setAllThread, token, location]);

  return (
    <>
      {loading ? (
        <Flex justify="center" align="center" height="200px">
          <Spinner size="xl" color="white" />
        </Flex>
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : threads?.length === 0 ? (
        <Text color="white">No Image Available</Text>
      ) : (
        <Grid
          templateColumns="repeat(auto-fill, minmax(30%, 1fr))"
          gap={4}
          p={4}
          mb={7}
        >
          {threads.map((x) => (
            <>
              {x.image && (
                <Link to={`/imagedetail/${x.id}`}>
                  <Box
                    key={x.id}
                    position="relative"
                    overflow="hidden"
                    borderRadius="10px"
                    boxShadow="md"
                    height={"250px"}
                    transition="transform 0.3s ease"
                    _hover={{
                      transform: "scale(1.05)",
                    }}
                  >
                    <Image
                      src={x.image}
                      alt={`Gallery Image ${x.id}`}
                      width="100%"
                      height="100%"
                      borderRadius="10px"
                    />
                  </Box>
                </Link>
              )}
            </>
          ))}
        </Grid>
      )}
    </>
  );
}
export default ProfileGallery;
