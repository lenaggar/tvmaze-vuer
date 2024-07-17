import { Show, validateShow } from "../schemas/show-schema";

export function validateShows(data: unknown[]) {
  const validShows: Show[] = [];

  data.forEach((show) => {
    try {
      const validShow = validateShow(show);
      validShows.push(validShow);
    } catch (error) {
      console.error("invalid schema for show", show, error);
    }
  });

  return validShows;
}
