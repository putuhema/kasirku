import CalendarChart from "@/components/dashboard/CalendarChart";
import services from "@/services";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";

const Report = () => {
  const { data: today, isLoading: todayLoading } = useQuery({
    queryKey: ["transactions/sales"],
    queryFn: async () => {
      const res = await services.get("/transactions/sales");
      return res.data.data;
    },
  });
  if (todayLoading) return <Text>is loading....</Text>;
  return (
    <Flex p="6" direction="column">
      <Box w="full" h="300px">
        <Box w="full" h="full">
          <CalendarChart data={today} />
        </Box>
      </Box>
      <Box>
        <Outlet />
      </Box>
    </Flex>
  );
};

export default Report;
