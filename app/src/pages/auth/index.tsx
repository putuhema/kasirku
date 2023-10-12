import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

const Auth = () => {
  return (
    <Container>
      <Text textAlign="center" padding="4" fontWeight="bold">
        Halo, Welcome Back!
      </Text>
      <Box border="3px" borderColor="gray.500" p={4}>
        <Container>
          <Tabs variant="enclosed" isFitted>
            <TabList>
              <Tab>Signin</Tab>
              <Tab>Signup</Tab>
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
