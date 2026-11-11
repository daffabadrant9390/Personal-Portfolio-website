const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "Mar 2022". DATE columns come back as UTC midnight, so read them in UTC. */
export function formatMonth(date: Date): string {
  return `${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

/**
 * "Jan 2026 to Present" while the position is running (no end date and
 * is_current), "Mar 2022 to Dec 2025" when it has ended, and just the start
 * month when neither is known.
 */
export function formatPeriod(startDate: Date, endDate: Date | null, isCurrent: boolean): string {
  const start = formatMonth(startDate);
  if (endDate) return `${start} to ${formatMonth(endDate)}`;
  return isCurrent ? `${start} to Present` : start;
}

/** Parses "Mar 2022" into the first day of that month (UTC). */
export function parseMonth(label: string): Date {
  const [mon, year] = label.trim().split(/\s+/);
  const month = MONTHS.indexOf(mon);
  if (month === -1 || !/^\d{4}$/.test(year ?? "")) {
    throw new Error(`Cannot parse month "${label}"`);
  }
  return new Date(Date.UTC(Number(year), month, 1));
}

/** Splits an old style "Jan 2026 to Present" string into dates for the seed. */
export function parsePeriod(period: string): { startDate: Date; endDate: Date | null; isCurrent: boolean } {
  const [start, end] = period.split(/\s+to\s+/);
  const isCurrent = end?.trim() === "Present";
  return {
    startDate: parseMonth(start),
    endDate: end && !isCurrent ? parseMonth(end) : null,
    isCurrent,
  };
}
