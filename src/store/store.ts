import { defineStore } from "pinia";
import { Show } from "../show-schema";

type ShowId = Show["id"];
type ShowGenre = Show["genres"][number];
type ShowRating = Show["rating"]["average"];

type ShowState = {
  showsById: Record<ShowId, Show>;
  showIdsByGenre: Record<ShowGenre, Record<NonNullable<ShowRating>, ShowId[]>>;
};

export const showStore = defineStore("show", {
  state: (): ShowState => ({
    showsById: {},
    showIdsByGenre: {},
  }),
  actions: {
    fill(shows: Show[]) {
      // create new dictionaries to avoid mutating the state while processing inputs
      const newShowsById: ShowState["showsById"] = {};
      const newShowIdsByGenre: ShowState["showIdsByGenre"] = {};

      // iterate over shows to fill dictionaries
      for (const show of shows) {
        const showId = show.id;
        // some shows don't have a rating, so we default to 0
        const showRating = show.rating.average ?? 0;

        newShowsById[showId] = show;

        // iterate over genres to fill show ratings
        for (const genre of show.genres) {
          const existingGenre = { ...this.showIdsByGenre[genre] };
          existingGenre[showRating] = [
            ...(existingGenre[showRating] ?? []),
            showId,
          ];
          newShowIdsByGenre[genre] = existingGenre;
        }
      }

      // update state only once after looping through all shows
      this.showsById = { ...this.showsById, ...newShowsById };
      this.showIdsByGenre = { ...this.showIdsByGenre, ...newShowIdsByGenre };
    },
  },
  getters: {
    shows: (state) => Object.values(state.showsById),
    showsByGenre: (state) => (genre: ShowGenre) => {
      const showIdsByRating = state.showIdsByGenre[genre] ?? {};
      return Object.entries(showIdsByRating)
        .toSorted(([ratingA], [ratingB]) => Number(ratingB) - Number(ratingA))
        .flatMap(([, showIds]) =>
          showIds.map((showId) => state.showsById[showId]),
        );
    },
    genresWithCount: (state) => {
      return Object.entries(state.showIdsByGenre).map(
        ([genre, showIdsByRating]) => ({
          genre,
          count: Object.values(showIdsByRating).reduce(
            (acc, showIds) => acc + showIds.length,
            0,
          ),
        }),
      );
    },
  },
});
