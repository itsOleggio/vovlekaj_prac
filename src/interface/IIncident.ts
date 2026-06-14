export interface IIncident {
  service: string;
  start: Date;
  end: Date;
  durationSec: number;
  anomalyCount: number;
}