import { Card } from "@consta/uikit/Card";
import { Collapse } from "@consta/table/Collapse";
import { Table } from '@consta/uikit/Table';

export function AnomaliesTable({ anomalies }: any) {
  const columns = [
    { title: "Time", accessor: "timestamp" },
    { title: "Service", accessor: "service" },
    { title: "Latency", accessor: "latencyMs" },
    { title: "Status", accessor: "status" },
    { title: "Z-score", accessor: "zScore" },
  ];

  const data = anomalies.map((a: any) => ({
    timestamp: a.timestamp.toISOString().slice(0, 19),
    service: a.service,
    latencyMs: a.latencyMs,
    status: a.status,
    zScore: a.zScore.toFixed(2),
  }));

  return (
    <Card verticalSpace="l" horizontalSpace="l">
      <Collapse leftSide="Аномалии" expandButton>
        <Table columns={columns} rows={data} />
      </Collapse>
    </Card>
  );
}
