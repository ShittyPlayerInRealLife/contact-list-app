import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TContact, TContactsState } from "./types";

const initialState: TContactsState = {
  contacts: {},
};

const contactSlice = createSlice({
  name: "contacts",
  initialState: initialState as TContactsState,
  reducers: {
    addContactAction: (state, action: PayloadAction<TContact>) => {
      const { name } = action.payload;
      const firstLetter = name.charAt(0).toUpperCase();

      if (!state.contacts[firstLetter]) {
        state.contacts[firstLetter] = [];
      }
      state.contacts[firstLetter].push(action.payload);
    },
    clearContactsAction: (state) => {
      state.contacts = {};
    },
    removeContactAction: (
      state,
      action: PayloadAction<{ letter: string; index: number }>,
    ) => {
      const { letter, index } = action.payload;
      if (state.contacts[letter] && state.contacts[letter].length > index) {
        state.contacts[letter].splice(index, 1);
      }
    },
    findContactAction: (state, action: PayloadAction<string>) => {
      state.contacts.filter(
        (search) =>
          state &&
          search &&
          search &&
          search.toLowerCase().includes(action.payload),
      );
    },
  },
});

export const {
  addContactAction,
  clearContactsAction,
  removeContactAction,
  findContactAction,
} = contactSlice.actions;
export const contactsReducer = contactSlice.reducer;
