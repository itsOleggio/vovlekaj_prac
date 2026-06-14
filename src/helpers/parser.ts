import type { ILogRecord } from "../interface/IRecord";

export function parseLine(line: string): ILogRecord | null {
  try {
    const parts = line.split("|").map((p) => p.trim());

    if (parts.length < 5) {
      return null;
    }

    const timestamp = new Date(parts[0]);
    const level = parts[1] as ILogRecord["level"];

    const service = parts[2].match(/service=(.+)/)?.[1];

    if (
      service !== "auth" &&
      service !== "payments" &&
      service !== "notifications"
    ) {
      return null;
    }

    const latencyMs = Number(parts[3].match(/latency_ms=(\d+)/)?.[1]);

    const status = parts[4].match(/status=(.+)/)?.[1] as ILogRecord["status"];

    if (Number.isNaN(timestamp.getTime()) || Number.isNaN(latencyMs)) {
      return null;
    }

    return {
      timestamp,
      level,
      service,
      latencyMs,
      status,
    };
  } catch {
    return null;
  }
}
