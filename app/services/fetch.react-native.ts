import * as cheerio from "cheerio";
import type { OfficialBlogEntry, OfficialBlogResult } from "./official-blog";

async function fetchReactNativeBlog(): Promise<string> {
  const response = await fetch("https://reactnative.dev/blog");
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.text();
}

async function fetchReactNativePostContent(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) return "";
  const html = await response.text();
  const $ = cheerio.load(html);
  return (
    $(".markdown").first().text().trim() ||
    $("article").first().text().trim() ||
    $("main").first().text().trim()
  );
}

export async function getReactNativeBlogContents(): Promise<
  OfficialBlogResult<"React Native">
> {
  const html = await fetchReactNativeBlog();
  const $ = cheerio.load(html);

  const nav = $("nav.sidebar_brwN");
  const data: Record<string, OfficialBlogEntry[]> = {};
  let currentYear: string | null = null;
  const postsToFetch: {
    year: string;
    month: string;
    day: string;
    title: string;
    url: string;
    yearKey: string;
  }[] = [];

  nav
    .find("ul.sidebarItemList_QwSx")
    .children()
    .each((_, el) => {
      const $el = $(el);
      if ($el.is("h5")) {
        currentYear = $el.text().trim();
        if (!data[currentYear]) data[currentYear] = [];
      } else if ($el.is("li")) {
        const a = $el.find('a[href*="/blog/"]');
        if (a.length && currentYear) {
          const href = a.attr("href")!;
          const match = href.match(/\/blog\/(\d{4})\/(\d{2})\/(\d{2})/);
          if (match) {
            const [_, year, month, day] = match;
            postsToFetch.push({
              year,
              month,
              day,
              title: a.text().trim(),
              url: "https://reactnative.dev" + href,
              yearKey: currentYear,
            });
          }
        }
      }
    });

  await Promise.all(
    postsToFetch.map(async (post) => {
      const content = await fetchReactNativePostContent(post.url);
      data[post.yearKey].push({ ...post, content, framework: "React Native" });
    })
  );

  return {
    framework: "React Native",
    data,
  };
}
