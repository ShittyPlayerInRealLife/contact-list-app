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
  findContactAction,
  removeContactAction,
} from "../state/contact-list/slice";

type TContext = {
  addContact: (contact: TContact) => void;
  clearContacts: () => void;
  removeContact: (letter: string, index: number) => void;
  findContact: (letter: string) => void;
};

const context = createContext<TContext>({
  addContact: () => {},
  clearContacts: () => {},
  removeContact: () => {},
  findContact: () => {},
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

  const findContact = useCallback((letter: string) => {
    dispatch(findContactAction(letter));
  }, []);

  return (
    <context.Provider
      value={{ addContact, clearContacts, removeContact, findContact }}
    >
      {children}
    </context.Provider>
  );
};
