export type TContact = {
  name: string;
  vacancy: string;
  phone: string;
};

export type TContactsState = {
  contacts: Record<string, TContact[]>;
};
