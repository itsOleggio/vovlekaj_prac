import type { ILogRecord } from "../interface/IRecord";
import type { IIncident } from "../interface/IIncident";

export interface IAnomaly extends ILogRecord {
  zScore: number;
}

export function findAnomalies(
  records: ILogRecord[],
  threshold = 3,
): IAnomaly[] {
  const anomalies: IAnomaly[] = [];

  const services = ["auth", "payments", "notifications"] as const;

  for (const service of services) {
    const serviceRecords = records.filter(
      (record) => record.service === service,
    );

    if (serviceRecords.length === 0) continue;

    const latencies = serviceRecords.map((record) => record.latencyMs);

    const mean =
      latencies.reduce((sum, value) => sum + value, 0) / latencies.length;

    const variance =
      latencies.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) /
      latencies.length;

    const stdDev = Math.sqrt(variance);

    if (stdDev === 0) continue;

    for (const record of serviceRecords) {
      const zScore = (record.latencyMs - mean) / stdDev;

      if (Math.abs(zScore) > threshold) {
        anomalies.push({
          ...record,
          zScore,
        });
      }
    }
  }

  return anomalies;
}

export function buildIncidents(
  anomalies: IAnomaly[],
  gapMinutes = 5,
): IIncident[] {
  const incidents: IIncident[] = [];

  const services = ["auth", "payments", "notifications"];

  for (const service of services) {
    const serviceAnomalies = anomalies
      .filter((a) => a.service === service)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

    if (serviceAnomalies.length === 0) {
      continue;
    }

    let start = serviceAnomalies[0].timestamp;
    let end = serviceAnomalies[0].timestamp;
    let count = 1;

    for (let i = 1; i < serviceAnomalies.length; i++) {
      const current = serviceAnomalies[i];

      const diffMinutes =
        (current.timestamp.getTime() - end.getTime()) / 1000 / 60;

      if (diffMinutes <= gapMinutes) {
        end = current.timestamp;
        count++;
      } else {
        incidents.push({
          service,
          start,
          end,
          durationSec: (end.getTime() - start.getTime()) / 1000,
          anomalyCount: count,
        });

        start = current.timestamp;
        end = current.timestamp;
        count = 1;
      }
    }

    incidents.push({
      service,
      start,
      end,
      durationSec: (end.getTime() - start.getTime()) / 1000,
      anomalyCount: count,
    });
  }

  return incidents;
}
