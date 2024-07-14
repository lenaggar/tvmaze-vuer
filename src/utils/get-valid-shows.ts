import { Show, validateShow } from "../show-schema";

export function getValidShows(data: unknown[]) {
  const validShows: Show[] = [];

  data.forEach((show) => {
    try {
      const validShow = validateShow(show);
      validShows.push(validShow);
    } catch (error) {
      console.error(">>> invalid schema for show with id", error);
    }
  });

  return validShows;
}
