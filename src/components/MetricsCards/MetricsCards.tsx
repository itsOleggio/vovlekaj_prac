import { Card } from "@consta/uikit/Card";
import { Layout } from "@consta/uikit/Layout";
import { Text } from "@consta/uikit/Text";

type Props = {
  recordsCount: number;
  errorRate: number;
  anomaliesCount: number;
  incidentsCount: number;
};

export const MetricsCards = ({
  recordsCount,
  errorRate,
  anomaliesCount,
  incidentsCount,
}: Props) => {
  const items = [
    {
      title: "Records",
      value: recordsCount,
    },
    {
      title: "Error Rate",
      value: `${errorRate}%`,
    },
    {
      title: "Anomalies",
      value: anomaliesCount,
    },
    {
      title: "Incidents",
      value: incidentsCount,
    },
  ];

  return (
    <Layout gap="m">
      {items.map((item) => (
        <Card
          key={item.title}
          verticalSpace="l"
          horizontalSpace="l"
        >
          <Text view="secondary">
            {item.title}
          </Text>

          <Text
            size="3xl"
            weight="bold"
          >
            {item.value}
          </Text>
        </Card>
      ))}
    </Layout>
  );
};