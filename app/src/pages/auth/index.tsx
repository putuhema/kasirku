import {
  Box,
  Container,
  Img,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { useAuth } from "@/auth/useAuth";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import logo from "@/assets/kasirku.svg";

const Auth = () => {
  const [params, setParams] = useSearchParams({
    form: "sign-in",
  });
  const form = params.get("form");
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (auth) return navigate("/home");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  return (
    <Container
      my="20"
      border="1px"
      borderRadius="xl"
      borderColor="blackAlpha.300"
      dropShadow="lg"
      p="8"
    >
      <VStack mb="10" spacing="8">
        <Img src={logo} alt="logo" width={150} />
        <VStack spacing={0}>
          <Text textAlign="start" fontWeight="bold" fontSize="2xl">
            {form === "sign-in" && "Halo, Welcome to Kasirku!"}
          </Text>
          <Text textAlign="justify">
            {form === "sign-in"
              ? "Your gateway to efficient cash management. Log in now to take control of your transactions."
              : "Join Kasirku, simplify cash management. Sign up now and start streamlining your transactions effortlessly."}
          </Text>
        </VStack>
      </VStack>
      <Box border="3px" borderColor="gray.500">
        <Container>
          <Tabs index={form === "sign-in" ? 0 : 1} variant="enclosed" isFitted>
            <TabList>
              <Tab
                onClick={() =>
                  setParams((prev) => {
                    prev.set("form", "sign-in");
                    return prev;
                  })
                }
              >
                Signin
              </Tab>
              <Tab
                onClick={() =>
                  setParams((prev) => {
                    prev.set("form", "sign-up");
                    return prev;
                  })
                }
              >
                Signup
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Signin />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Box>
    </Container>
  );
};

export default Auth;
