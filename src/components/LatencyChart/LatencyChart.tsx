import { Card } from "@consta/uikit/Card";
import { Text } from "@consta/uikit/Text";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";

type IProps = {
  records: {
    timestamp: Date;
    latencyMs: number;
  }[];
  anomalies: {
    index: number;
    label?: string;
  }[];
};

export function LatencyChart({ records, anomalies }: IProps) {
  if (!records.length) {
    return (
      <Card verticalSpace="l" horizontalSpace="l">
        <Text view="secondary">No data for chart</Text>
      </Card>
    );
  }

  const sliced = records.slice(-100);
  const startIndex = records.length - sliced.length;

  const chartData = sliced.map((r, i) => ({
    globalIndex: startIndex + i,
    latency: r.latencyMs,
  }));

  const latencyMap = new Map(
    chartData.map((d) => [d.globalIndex, d.latency])
  );

  const visibleAnomalies = anomalies.filter(
    (a) => a.index >= startIndex
  );

  return (
    <Card verticalSpace="l" horizontalSpace="l">
      <Text size="xl" weight="bold">
        Задержка во времени
      </Text>

      <Text view="secondary" size="s">
        Последние 100 запросов
      </Text>

      <ResponsiveContainer width={960} height={500}>
        <LineChart data={chartData}>
          <XAxis dataKey="globalIndex" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="latency"
            stroke="#8884d8"
            dot={{ r: 2 }}
            strokeWidth={2}
          />

          {visibleAnomalies.map((a, i) => {
            const latency = latencyMap.get(a.index);
            if (latency === undefined) return null;

            return (
              <ReferenceDot
                key={i}
                x={a.index}
                y={latency}
                r={5}
                fill="red"
                stroke="none"
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}