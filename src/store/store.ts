import { defineStore } from "pinia";
import { Show } from "../schemas/show-schema";
import { getShowById, getShowsForPage } from "../api";
import { validateShows } from "../utils/validate-shows";
import { LocalState } from "../schemas/local-state-schema";
import { setLocalState } from "./utils/set-local-state";
import { getInitialState } from "./utils/get-initial-state";

export const showStore = defineStore("show", {
  // initial state is fetched from local storage
  state: getInitialState,
  actions: {
    async getNextPage() {
      this.isLoading = true;
      const pageShows = await getShowsForPage(this.page);
      const validPageShows = validateShows(pageShows);
      this.fill(validPageShows);
      this.page++;
      this.isLoading = false;
    },
    async fetchShow(showId: number) {
      this.isLoading = true;
      const show = await getShowById(showId);
      const validPageShows = validateShows([show]);
      this.fill(validPageShows);
      this.isLoading = false;
    },
    fill(shows: Show[]) {
      // create new dictionaries to avoid mutating the state while processing inputs
      const newShowsById: LocalState["showsById"] = {};
      const newShowIdsByGenre: LocalState["showIdsByGenre"] = {
        ...this.showIdsByGenre,
      };

      // iterate over shows to fill dictionaries
      for (const show of shows) {
        const showId = show.id;
        // some shows don't have a rating, so we default to 0
        const showRating = show.rating.average ?? 0;

        newShowsById[showId] = show;

        // iterate over genres to fill show ratings
        for (const genre of show.genres) {
          // normalize genre to lowercase to avoid case sensitivity and also for a prettier url path :)
          const properGenre = genre.toLowerCase();
          const existingGenre = { ...newShowIdsByGenre[properGenre] };

          existingGenre[showRating] = [
            ...(existingGenre[showRating] ?? []),
            showId,
          ];
          newShowIdsByGenre[properGenre] = existingGenre;
        }
      }

      // update state only once after looping through all shows
      this.showsById = { ...this.showsById, ...newShowsById };
      this.showIdsByGenre = { ...this.showIdsByGenre, ...newShowIdsByGenre };

      // save state to local storage after each state update
      setLocalState(this.$state);
    },
  },
  getters: {
    shows: (state) => Object.values(state.showsById),
    count: (state) => Object.values(state.showsById).length,
    hasItems: (state) => Object.keys(state.showsById).length > 0,
    getShowById: (state) => (id: number) => state.showsById[id],
    showsByGenre: (state) => (genre: string) => {
      const showIdsByRating = state.showIdsByGenre[genre] ?? {};
      return Object.entries(showIdsByRating)
        .toSorted(([ratingA], [ratingB]) => Number(ratingB) - Number(ratingA))
        .flatMap(([, showIds]) =>
          showIds.map((showId) => state.showsById[showId]),
        )
        .filter((x) => !!x);
    },
    genresWithCount: (state) => {
      return Object.entries(state.showIdsByGenre)
        .map(([genre, showIdsByRating]) => ({
          genre,
          count: Object.values(showIdsByRating).reduce(
            (acc, showIds) => acc + showIds.length,
            0,
          ),
        }))
        .toSorted(({ genre: genreA }, { genre: genreB }) =>
          genreA.localeCompare(genreB),
        );
    },
  },
});
