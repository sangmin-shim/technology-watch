import * as cheerio from "cheerio";
import {
  normalizeDateString,
  parseDateParts,
  type OfficialBlogEntry,
  type OfficialBlogResult,
} from "./official-blog";

export async function getLynxBlogContents(): Promise<
  OfficialBlogResult<"Lynx">
> {
  const response = await fetch("https://lynxjs.org/blog/");
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const html = await response.text();
  const $ = cheerio.load(html);

  const data: Record<string, OfficialBlogEntry[]> = {};
  const container = $("div.rspress-doc");

  container.find("h2").each((_, h2) => {
    const $h2 = $(h2);
    const link = $h2.find('a[href^="/blog/"]');
    if (!link.length) return;

    const title = link.text().trim();
    const url = new URL(link.attr("href")!, "https://lynxjs.org").href;

    // Find the next <p> with <em> date
    let p = $h2.next();
    while (p.length && !p.is("p")) p = p.next();
    if (!p.length) return;

    const emText = p.find("em").text() || "";
    const [rawDate] = emText.split(" by ");
    const cleanDate = normalizeDateString(rawDate.trim());
    const dateParts = parseDateParts(cleanDate);
    if (!dateParts) return;

    // Collect all <p> siblings after the meta <p> until the next <h2> or end
    let contentParts: string[] = [];
    let sibling = p.next();
    while (sibling.length && !sibling.is("h2")) {
      if (sibling.is("p")) contentParts.push(sibling.text().trim());
      sibling = sibling.next();
    }
    const content = contentParts.join("\n\n");

    if (!data[dateParts.year]) data[dateParts.year] = [];
    data[dateParts.year].push({ ...dateParts, title, url, content });
  });

  return {
    framework: "Lynx",
    data,
  };
}
