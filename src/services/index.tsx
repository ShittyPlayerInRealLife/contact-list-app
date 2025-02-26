import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
} from "react";
import { useAppDispatch } from "../state";
import { TContact } from "../state/contact-list/types";
import {
  addContactAction,
  clearContactsAction,
  removeContactAction,
  updateContactAction,
} from "../state/contact-list/slice";

type TContext = {
  addContact: (contact: TContact) => void;
  clearContacts: () => void;
  removeContact: (letter: string, index: number) => void;
  updateContact: (letter: string, index: number, contact: TContact) => void;
};

const context = createContext<TContext>({
  addContact: () => {},
  clearContacts: () => {},
  removeContact: () => {},
  updateContact: () => {},
});

export const useContactListContext = () => useContext(context);

export const ContactListService: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();

  const addContact = useCallback(
    (contact: TContact) => dispatch(addContactAction(contact)),
    [],
  );

  const clearContacts = useCallback(() => dispatch(clearContactsAction()), []);

  const removeContact = useCallback(
    (letter: string, index: number) =>
      dispatch(removeContactAction({ letter, index })),
    [],
  );

  const updateContact = useCallback(
    (letter: string, index: number, contact: TContact) =>
      dispatch(updateContactAction({ letter, index, contact })),
    [],
  );

  return (
    <context.Provider
      value={{ addContact, clearContacts, removeContact, updateContact }}
    >
      {children}
    </context.Provider>
  );
};
