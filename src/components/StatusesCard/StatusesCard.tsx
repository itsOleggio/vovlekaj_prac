import { Card } from "@consta/uikit/Card";
import { Layout } from "@consta/uikit/Layout";
import { Badge } from "@consta/uikit/Badge";
import { Text } from "@consta/uikit/Text";
import style from './StatusesCard.module.css'

type Props = {
  stats: Record<string, number>;
};

export const StatusesCard = ({ stats }: Props) => {
  return (
    <Card verticalSpace="l" horizontalSpace="l">
      <Layout direction="column" gap="m">
        <Text weight="bold">Statuses</Text>
        <div className={style.badge}>
          {Object.entries(stats).map(([status, count]) => (
            <Badge key={status} label={`${status}: ${count}`} />
          ))}
        </div>
      </Layout>
    </Card>
  );
};
