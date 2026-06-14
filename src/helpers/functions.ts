import type { ILogRecord } from "../interface/IRecord";

// Фукция для сбора количества записей по сервисам
export function getServiceStats(records: ILogRecord[]) {
  return records.reduce(
    (acc, record) => {
      acc[record.service] = (acc[record.service] || 0) + 1;

      return acc;
    },
    {} as Record<string, number>,
  );
}

// функция для распределения статусов
export function getStatusStats(records: ILogRecord[]) {
  return records.reduce(
    (acc, record) => {
      acc[record.status] = (acc[record.status] || 0) + 1;

      return acc;
    },
    {} as Record<string, number>,
  );
}

// процент ошибок
export function getErrorRate(records: ILogRecord[]): number {
  const errors = records.filter(
    (r) => r.status === "error" || r.status === "timeout",
  );

  return Number(((errors.length / records.length) * 100).toFixed(2));
}
