import { BehaviorSubject, combineLatest } from "rxjs";
import type { VideosWithChannel } from "./supabase";
import { map } from "rxjs/operators";

// State subjects
const videosSubject = new BehaviorSubject<VideosWithChannel>([]);
const paginationSubject = new BehaviorSubject<number>(1); // Tracks current page

const pageSize = 9; // Videos per page

// Computed observable for paginated videos
const paginatedVideos$ = combineLatest([videosSubject, paginationSubject]).pipe(
  map(([videos, page]) => {
    const totalPages = Math.ceil(videos.length / pageSize);

    // Ensure the page number is within a valid range
    const validPage = Math.max(1, Math.min(page, totalPages));
    paginationSubject.next(validPage); // Auto-fix invalid page number

    const startIndex = (validPage - 1) * pageSize;
    return {
      paginatedVideos: videos.slice(startIndex, startIndex + pageSize),
      totalVideos: videos.length,
      totalPages,
      currentPage: validPage,
    };
  })
);

// API to update state
const videoService = {
  setVideos: (videos: VideosWithChannel) => videosSubject.next(videos),
  setPage: (page: number) => paginationSubject.next(page),
  getPaginatedVideos$: () => paginatedVideos$, // Observable for Home component
};

export default videoService;
