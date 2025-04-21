// blogUtils.ts

export type OfficialBlogEntry = {
  framework: string;
  year: string;
  month: string;
  day: string;
  title: string;
  url: string;
  content: string;
};

export type OfficialBlogResult<T extends string = string> = {
  framework: T;
  data: Record<string, OfficialBlogEntry[]>;
};

export const monthNames: { [month: string]: string } = {
  January: "01",
  February: "02",
  March: "03",
  April: "04",
  May: "05",
  June: "06",
  July: "07",
  August: "08",
  September: "09",
  October: "10",
  November: "11",
  December: "12",
};

export function normalizeDateString(dateStr: string): string {
  return dateStr.replace(/(\d+)(st|nd|rd|th)/, "$1");
}

export function parseDateParts(
  cleanDate: string
): { year: string; month: string; day: string } | null {
  const m = cleanDate.match(/^([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})$/);
  if (!m) return null;
  const [, monName, dayStr, yearStr] = m;
  return {
    year: yearStr,
    month: monthNames[monName] || "00",
    day: dayStr.padStart(2, "0"),
  };
}
