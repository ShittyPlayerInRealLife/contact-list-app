import React, { FC, useCallback, useEffect, useState } from "react";
import { Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ContactButton } from "../../common/contact-button";
import { TContactsState } from "../../../state/contact-list/types";
import { useContactListSelector } from "../../../state/contact-list/selector";
import { SearchInput } from "./search-input";
import { SearchList } from "./search-list";

export const ContactModal: FC = () => {
  const contacts = useContactListSelector();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filteredContacts, setFilteredContacts] = useState<TContactsState>([]);

  const showModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  useEffect(() => {
    if (isModalOpen) {
      setFilteredContacts([]);
      setInputValue("");
    }
  }, [isModalOpen]);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim().toLowerCase();
      setInputValue(value);

      if (!value) {
        setFilteredContacts([]);
        return;
      }

      const filtered = contacts
        .map((group) => ({
          ...group,
          contacts: group.contacts.filter((contact) =>
            contact.name.toLowerCase().startsWith(value),
          ),
        }))
        .filter((group) => group.contacts.length > 0);

      setFilteredContacts(filtered);
    },
    [contacts],
  );

  const showAllContacts = useCallback(() => {
    setFilteredContacts(contacts);
    setInputValue("");
  }, [contacts]);

  return (
    <>
      <ContactButton onClick={showModal}>
        <SearchOutlined />
      </ContactButton>
      <Modal
        title="Search Contact"
        open={isModalOpen}
        onOk={closeModal}
        onCancel={closeModal}
      >
        <SearchInput value={inputValue} onChange={handleSearch} />
        <SearchList filteredContacts={filteredContacts} />
        <ContactButton onClick={showAllContacts}>Show all</ContactButton>
      </Modal>
    </>
  );
};
