import { combineReducers, Reducer } from "@reduxjs/toolkit";
import { contactsReducer } from "./contact-list/slice";

const appReducer = combineReducers({
  contacts: contactsReducer,
});

export type RootCombine = ReturnType<typeof appReducer>;

export const rootReducer: Reducer = (state: RootCombine, action) => {
  return appReducer(state, action);
};
