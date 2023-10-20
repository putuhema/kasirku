import { useParams } from "react-router-dom";

const TransactionDetail = () => {
  const { id } = useParams();
  return <div>TransactionDetail {id}</div>;
};

export default TransactionDetail;
