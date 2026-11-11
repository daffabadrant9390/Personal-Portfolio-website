import { describe, expect, it } from "vitest";
import { formatMonth, formatPeriod, parseMonth, parsePeriod } from "./period";

const d = (y: number, m: number) => new Date(Date.UTC(y, m - 1, 1));

describe("formatPeriod", () => {
  it("shows Present when there is no end date and the position is current", () => {
    expect(formatPeriod(d(2026, 1), null, true)).toBe("Jan 2026 to Present");
  });

  it("shows both months when the position has ended", () => {
    expect(formatPeriod(d(2022, 3), d(2025, 12), false)).toBe("Mar 2022 to Dec 2025");
  });

  it("shows only the start month when there is no end date and it is not current", () => {
    expect(formatPeriod(d(2022, 3), null, false)).toBe("Mar 2022");
  });

  it("prefers the end date even when is_current is still true", () => {
    expect(formatPeriod(d(2022, 3), d(2023, 1), true)).toBe("Mar 2022 to Jan 2023");
  });
});

describe("parsePeriod", () => {
  it("round trips with formatPeriod", () => {
    for (const label of ["Jan 2026 to Present", "Aug 2018 to Jun 2022", "Dec 2020 to Apr 2021"]) {
      const { startDate, endDate, isCurrent } = parsePeriod(label);
      expect(formatPeriod(startDate, endDate, isCurrent)).toBe(label);
    }
  });

  it("formats and parses a month in UTC", () => {
    expect(formatMonth(parseMonth("Oct 2025"))).toBe("Oct 2025");
  });

  it("rejects an unknown month", () => {
    expect(() => parseMonth("Foo 2025")).toThrow();
  });
});
