export interface ILogRecord {
  timestamp: Date;
  level: "INFO" | "WARN" | "ERROR";
  service: "auth" | "notifications" | "payments";
  latencyMs: number;
  status: "ok" | "retry" | "error" | "timeout";
}
