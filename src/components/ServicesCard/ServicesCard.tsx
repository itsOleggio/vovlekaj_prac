import { Card } from "@consta/uikit/Card";
import { Layout } from "@consta/uikit/Layout";
import { Badge } from "@consta/uikit/Badge";
import { Text } from "@consta/uikit/Text";
import style from "./ServicesCard.module.css";

type Props = {
  stats: Record<string, number>;
};

export const ServicesCard = ({ stats }: Props) => {
  return (
    <Card verticalSpace="l" horizontalSpace="l">
      <Layout direction="column" gap="m">
        <Text weight="bold">Services</Text>
        <div className={style.badge}>
          {Object.entries(stats).map(([service, count]) => (
            <Badge key={service} label={`${service}: ${count}`} />
          ))}
        </div>
      </Layout>
    </Card>
  );
};
