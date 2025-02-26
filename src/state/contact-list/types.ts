export type TContact = {
  name: string;
  vacancy: string;
  phone: string;
};

export type TContactsGroup = {
  letter: string;
  contacts: TContact[];
};

export type TContactsState = TContactsGroup[];
