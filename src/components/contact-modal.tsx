import React, { FC, useState } from "react";
import { Input, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ContactButton } from "./common/contact-button";
import { useContactListContext } from "../services";
import { useContactListSelector } from "../state/contact-list/selector";
import { TContact } from "../state/contact-list/types";

export const ContactModal: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { findContact } = useContactListContext();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const submitHandler = () => {
    setIsModalOpen(false);
  };

  const cancelHandler = () => {
    setIsModalOpen(false);
  };

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    findContact(value);
  };

  return (
    <>
      <ContactButton onClick={showModal}>
        <SearchOutlined />
      </ContactButton>
      <Modal
        title="Search Contact"
        open={isModalOpen}
        onOk={submitHandler}
        onCancel={cancelHandler}
      >
        <Input
          placeholder="Search by name"
          value={inputValue}
          onChange={searchHandler}
          style={{ marginBottom: 16 }}
        />
      </Modal>
    </>
  );
};
