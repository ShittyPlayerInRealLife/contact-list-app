import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TContact, TContactsGroup, TContactsState } from "./types";

const initialState: TContactsState = [];

const contactSlice = createSlice({
  name: "contacts",
  initialState: initialState as TContactsState,
  reducers: {
    addContactAction: (state, action: PayloadAction<TContact>) => {
      const { name } = action.payload;
      const firstLetter = name.charAt(0).toUpperCase();
      const group = state.find((group) => group.letter === firstLetter);

      if (group) {
        group.contacts.push(action.payload);
      } else {
        state.push({ letter: firstLetter, contacts: [action.payload] });
      }
    },
    clearContactsAction: (state) => {
      state.length = 0;
    },
    removeContactAction: (
      state,
      action: PayloadAction<{ letter: string; index: number }>,
    ) => {
      const { letter, index } = action.payload;
      const group = state.find((group) => group.letter === letter);

      if (group && group.contacts.length > index) {
        group.contacts.splice(index, 1);
        if (group.contacts.length === 0) {
          state.splice(state.indexOf(group), 1);
        }
      }
    },
    updateContactAction: (
      state,
      action: PayloadAction<{
        letter: string;
        index: number;
        contact: TContact;
      }>,
    ) => {
      return state.map((group) =>
        group.letter === action.payload.letter
          ? {
              ...group,
              contacts: group.contacts.map((contact, i) =>
                i === action.payload.index
                  ? { ...action.payload.contact }
                  : contact,
              ),
            }
          : group,
      );
    },
  },
});

export const {
  addContactAction,
  clearContactsAction,
  removeContactAction,
  updateContactAction,
} = contactSlice.actions;
export const contactsReducer = contactSlice.reducer;
