const BASE_URL = "https://api.tvmaze.com/";

export async function getValidShowsForPage(page: number) {
  const params = new URLSearchParams();
  params.append("page", page.toString());

  const response = await fetch(`${BASE_URL}shows?${params}`);
  const shows = await response.json();

  if (!Array.isArray(shows)) {
    console.error("Response is not an array");
    return [];
  }
  return shows;
}

export async function searchShows(query: string) {
  const params = new URLSearchParams();
  params.append("q", query);

  return fetch(`${BASE_URL}search/shows?${params}`).then((res) => res.json());
}
