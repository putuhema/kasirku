import Charts from "@/components/dashboard/Charts";
import services from "@/services";
import { Box, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const ReportToday = () => {
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date");
  const { data: today, isLoading: todayLoading } = useQuery({
    queryKey: ["transactions/today", date],
    queryFn: async () => {
      const res = await services.get(`/transactions/today`, {
        params: { date: date },
      });
      return res.data.data;
    },
    enabled: !!date,
  });
  if (todayLoading) return <Text>loading ...</Text>;
  return (
    <>
      <Box boxShadow="md" w="full" p="4" rounded="lg">
        <Text fontWeight="bold" mb="4">
          {date} Transaction's
        </Text>
        <Box w="full" h="300px">
          <Charts data={today} />
        </Box>
      </Box>
    </>
  );
};

export default ReportToday;
