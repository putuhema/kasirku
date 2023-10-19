import { Point, ResponsiveLine } from "@nivo/line";
import { useNavigate } from "react-router-dom";

interface ChartData {
  id: string;
  data: {
    id: number;
    x: string;
    y: number;
  }[];
}

interface ChartComponentProps {
  data: ChartData;
}

const Charts = ({ data }: ChartComponentProps) => {
  const navigate = useNavigate();
  const handleNavigateToDetails = (e: Point) => {
    navigate(`/dashboard/transaction-detail/${e.data.id}`);
  };
  return (
    <ResponsiveLine
      data={[data]}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      curve="monotoneX"
      axisTop={null}
      axisRight={null}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Transaction Total",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 10,
        tickRotation: 0,
        legend: "Transaction Time of The Day",
        legendOffset: 40,
        legendPosition: "middle",
      }}
      colors={{ scheme: "nivo" }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      onClick={handleNavigateToDetails}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
        },
      ]}
    />
  );
};

export default Charts;
