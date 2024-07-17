import { LOCAL_STORAGE_KEY } from "../../constants";
import {
  LocalState,
  // validateLocalState,
} from "../../schemas/local-state-schema";

/** gets initial state for show store from local storage */
export function getInitialState(): LocalState {
  const item = localStorage.getItem(LOCAL_STORAGE_KEY);
  try {
    const parsedData = JSON.parse(item ?? "");
    return parsedData as LocalState;

    // TODO: validate the parsed data (for some reason it's not working, needs more time to debug and fix)
    // but basically we want to be sure that the parsed data from local storage is of the valid type of state we have
    // const validState = validateLocalState(parsedData);
    // return validState;
  } catch (error) {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    console.error("invalid schema for local state", error);

    return {
      page: 0,
      isLoading: false,
      showsById: {},
      showIdsByGenre: {},
    };
  }
}
