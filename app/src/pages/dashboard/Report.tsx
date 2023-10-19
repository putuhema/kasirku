import CalendarChart from "@/components/dashboard/CalendarChart";
import Charts from "@/components/dashboard/Charts";
import services from "@/services";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";

const Report = () => {
  const { data: transactionData, isLoading } = useQuery({
    queryKey: ["transactions/today"],
    queryFn: async () => {
      const res = await services.get("/transactions/today");
      return res.data.data;
    },
  });

  const { data: today, isLoading: todayLoading } = useQuery({
    queryKey: ["transactions/sales"],
    queryFn: async () => {
      const res = await services.get("/transactions/sales");
      return res.data.data;
    },
  });
  if (isLoading || todayLoading) return <Text>is loading....</Text>;
  return (
    <Flex p="6" direction="column">
      <Box w="full" h="300px">
        <Box w="full" h="full">
          <CalendarChart data={today} />
        </Box>
      </Box>
      <Box boxShadow="md" w="full" p="4" rounded="lg">
        <Text fontWeight="bold" mb="4">
          Today Transaction's
        </Text>
        <Box w="full" h="300px">
          <Charts data={transactionData} />
        </Box>
      </Box>
      <Box>
        <Outlet />
      </Box>
    </Flex>
  );
};

export default Report;
