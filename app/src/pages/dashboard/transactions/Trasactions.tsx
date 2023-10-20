import services from "@/services";
import { Text } from "@chakra-ui/react";
import { DataTable } from "../table/data-table";
import { columns } from "./column";
import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";

const Transactions = () => {
  const { data: transactionData, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const res = await services.get("/transactions");
      return res.data.data;
    },
  });

  if (isLoading) return <Text>Loading ...</Text>;
  return (
    <div>
      <DataTable
        tableName="transactions"
        filter="costumerName"
        columns={columns}
        data={transactionData}
      />
      <Outlet />
    </div>
  );
};

export default Transactions;
