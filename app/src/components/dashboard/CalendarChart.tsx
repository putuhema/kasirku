import { Datum, ResponsiveCalendar } from "@nivo/calendar";
import { useNavigate } from "react-router-dom";
interface Data {
  value: number;
  day: string;
}
interface CalendarChartProps {
  data: Data[];
}
const CalendarChart = ({ data }: CalendarChartProps) => {
  const navigate = useNavigate();
  const handleTransactionOnDate = (
    d: Datum | Omit<Datum, "data" | "value">
  ) => {
    navigate(`/dashboard/reports?date=${d.day}`);
  };
  return (
    <ResponsiveCalendar
      data={data}
      from="2023-10-19"
      to="2023-10-31"
      emptyColor="#eeeeee"
      colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      yearSpacing={40}
      monthBorderColor="#ffffff"
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
      onClick={handleTransactionOnDate}
      legends={[
        {
          anchor: "bottom-right",
          direction: "row",
          translateY: 36,
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: "right-to-left",
        },
      ]}
    />
  );
};

export default CalendarChart;
