import { useUser } from "@/auth/useUser";

const Home = () => {
  const user = useUser();
  console.log(user);
  return <div>Home</div>;
};

export default Home;
