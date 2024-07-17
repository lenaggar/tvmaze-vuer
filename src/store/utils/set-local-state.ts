import { LOCAL_STORAGE_KEY } from "../../constants";
import { LocalState } from "../../schemas/local-state-schema";

/** sets state for show store in local storage */
export function setLocalState(state: LocalState) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
}
