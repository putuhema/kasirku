import UserForm from "@/components/UserForm";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Container,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";

const EditUserPage = () => {
  const { userId } = useParams();
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem color="blackAlpha.500">
          <Link to="/dashboard/users/cashier">users</Link>
        </BreadcrumbItem>
        <BreadcrumbItem color="teal.500">
          <Link to={`/dashboard/users/edit/${userId}`}>edit user</Link>
        </BreadcrumbItem>
      </Breadcrumb>
      <Container mb="10">
        <Stack spacing={10}>
          <Heading>Edit User</Heading>
          <UserForm userId={Number(userId)} />
          <Button
            form="create-user"
            type="submit"
            colorScheme="teal"
            rounded="full"
          >
            Edit User
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default EditUserPage;
