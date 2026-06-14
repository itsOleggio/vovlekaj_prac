import { useEffect, useState } from "react";

import { Theme, presetGpnDefault } from "@consta/uikit/Theme";
import { Layout } from "@consta/uikit/Layout";

import style from "./App.module.css";

import type { ILogRecord } from "./interface/IRecord";

import { parseLine } from "./helpers/parser";
import {
  getServiceStats,
  getStatusStats,
  getErrorRate,
} from "./helpers/functions";

import { findAnomalies, buildIncidents } from "./helpers/anomalies";

import { MetricsCards } from "./components/MetricsCards/MetricsCards";
import { ServicesCard } from "./components/ServicesCard/ServicesCard";
import { StatusesCard } from "./components/StatusesCard/StatusesCard";
import { LatencyChart } from "./components/LatencyChart/LatencyChart";
import { AnomaliesTable } from "./components/AnomaliesTable/AnomaliesTable";
import { IncidentsTable } from "./components/IncidentsTable/IncidentsTable";

function App() {
  const [records, setRecords] = useState<ILogRecord[]>([]);

  useEffect(() => {
    const loadLog = async () => {
      const response = await fetch(`${import.meta.env.BASE_URL}service_log.txt`);
      const textData = await response.text();

      const parsedRecords = textData
        .split("\n")
        .map(parseLine)
        .filter((r): r is ILogRecord => r !== null);

      setRecords(parsedRecords);
    };

    loadLog();
  }, []);

  const serviceStats = getServiceStats(records);
  const statusStats = getStatusStats(records);

  const errorRate = getErrorRate(records);

  const anomalies = findAnomalies(records);

  const incidents = buildIncidents(anomalies);

  return (
    <Theme preset={presetGpnDefault} className={style.app}>
      <Layout direction="column">
        <div className={style.container}>
          <MetricsCards
            recordsCount={records.length}
            errorRate={errorRate}
            anomaliesCount={anomalies.length}
            incidentsCount={incidents.length}
          />

          <Layout className={style.cards_row}>
            <ServicesCard stats={serviceStats} />
            <StatusesCard stats={statusStats} />
          </Layout>
        </div>

        {/* Временной ряд задежрки с наложением аномалий */}
        <LatencyChart records={records} anomalies={anomalies} />

        <AnomaliesTable anomalies={anomalies} />

        <IncidentsTable incidents={incidents} />
      </Layout>
    </Theme>
  );
}

export default App;
