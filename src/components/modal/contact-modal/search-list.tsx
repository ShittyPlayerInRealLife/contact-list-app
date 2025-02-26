import React, { FC, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { TContactsState } from "../../../state/contact-list/types";
import { useContactListContext } from "../../../services";
import { EditModal } from "../edit-modal/edit-modal";
import { TCurrentContact } from "../../../types/types";
import { ContactItem } from "../edit-modal/contact-item";

const Wrapper = styled.div`
  margin-bottom: 10px;

  button {
    padding: 0 8px;
  }
`;

const GroupTitle = styled.h3`
  font-size: 1.5em;
  color: #333;
  margin: 0 0 10px 0;
`;

type TProps = {
  filteredContacts: TContactsState;
};

export const SearchList: FC<TProps> = ({ filteredContacts }) => {
  const { removeContact, updateContact } = useContactListContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState<TCurrentContact>({
    letter: "",
    index: 0,
    name: "",
    vacancy: "",
    phone: "",
  });
  const [searchContacts, setSearchContacts] = useState(filteredContacts);

  useEffect(() => {
    setSearchContacts(filteredContacts);
  }, [filteredContacts]);

  const handleRemoveContact = useCallback((letter: string, index: number) => {
    removeContact(letter, index);
    setSearchContacts((prevContacts) =>
      prevContacts
        .map((group) =>
          group.letter === letter
            ? {
                ...group,
                contacts: group.contacts.filter((_, i) => i !== index),
              }
            : group,
        )
        .filter((group) => group.contacts.length > 0),
    );
  }, []);

  const showEditModal = (letter: string, index: number, contact: any) => {
    setCurrentContact({ letter, index, ...contact });
    setIsModalOpen(true);
  };

  const onCancel = () => {
    setIsModalOpen(false);
  };

  const handleEditContact = () => {
    updateContact(currentContact.letter, currentContact.index, {
      name: currentContact.name,
      vacancy: currentContact.vacancy,
      phone: currentContact.phone,
    });
    setIsModalOpen(false);
    setSearchContacts((prevContacts) =>
      prevContacts.map((group) =>
        group.letter === currentContact.letter
          ? {
              ...group,
              contacts: group.contacts.map((contact, idx) =>
                idx === currentContact.index ? { ...currentContact } : contact,
              ),
            }
          : group,
      ),
    );
  };

  const handleInputChange =
    (field: keyof typeof currentContact) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      let updatedValue = value;

      if (field === "name") {
        const firstLetter = currentContact.name.charAt(0);
        updatedValue = firstLetter + value.slice(1);
      }

      setCurrentContact({
        ...currentContact,
        [field]: updatedValue,
      });
    };

  const handleNameChange = handleInputChange("name");
  const handleVacancyChange = handleInputChange("vacancy");
  const handlePhoneChange = handleInputChange("phone");

  return (
    <>
      {searchContacts.map((group) => (
        <Wrapper key={group.letter}>
          <GroupTitle>{group.letter}</GroupTitle>
          <div>
            <ContactItem
              group={group}
              showEditModal={showEditModal}
              removeContact={handleRemoveContact}
            />
            <EditModal
              isModalOpen={isModalOpen}
              currentContact={currentContact}
              editContact={handleEditContact}
              onCancel={onCancel}
              nameChange={handleNameChange}
              vacancyChange={handleVacancyChange}
              phoneChange={handlePhoneChange}
            />
          </div>
        </Wrapper>
      ))}
    </>
  );
};
