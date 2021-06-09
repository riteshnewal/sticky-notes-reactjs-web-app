import { combineReducers } from "redux";
import StickyDataReducer from "./StickyDataReducer";

export const reducers = combineReducers({
  stickyData: StickyDataReducer,
});
