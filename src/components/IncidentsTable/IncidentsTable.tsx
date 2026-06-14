import { Card } from "@consta/uikit/Card";
import { Collapse } from "@consta/table/Collapse";
import { Table } from "@consta/uikit/Table";

export function IncidentsTable({ incidents }: any) {
  const columns = [
    { title: "Service", accessor: "service" },
    { title: "Start", accessor: "start" },
    { title: "End", accessor: "end" },
    { title: "Duration (sec)", accessor: "durationSec" },
    { title: "Count", accessor: "anomalyCount" },
  ];

  const data = incidents.map((i: any) => ({
    service: i.service,
    start: i.start.toISOString().slice(0, 19),
    end: i.end.toISOString().slice(0, 19),
    durationSec: Math.round(i.durationSec),
    anomalyCount: i.anomalyCount,
  }));

  return (
    <Card verticalSpace="l" horizontalSpace="l">
      <Collapse leftSide="Инциденты" expandButton>
        <Table columns={columns} rows={data} />
      </Collapse>
    </Card>
  );
}
