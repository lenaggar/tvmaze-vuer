const BASE_URL = "https://api.tvmaze.com/";

export async function getShowsForPage(page: number) {
  const params = new URLSearchParams();
  params.append("page", page.toString());

  const response = await fetch(`${BASE_URL}shows?${params}`);
  const shows = await response.json();

  if (!Array.isArray(shows)) {
    console.error(`"${getShowsForPage.name}" Response is not a list`);
    return [];
  }

  return shows;
}

export async function getShowById(showId: number) {
  const response = await fetch(`${BASE_URL}shows/${showId}`);
  const show = await response.json();

  return show;
}

export async function searchShows(query: string) {
  const params = new URLSearchParams();
  params.append("q", query);

  const response = await fetch(`${BASE_URL}search/shows?${params}`);
  const searchResults = await response.json();

  if (!Array.isArray(searchResults)) {
    console.error(`"${searchShows.name}" Response is not a list`);
    return [];
  }

  return searchResults.map((x) => x.show);
}
