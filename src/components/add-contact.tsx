import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import styled from "styled-components";
import { Input } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { TContact } from "../state/contact-list/types";
import { useContactListContext } from "../services";
import { ContactModal } from "./contact-modal";
import { ContactButton } from "./common/contact-button";

const Wrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const StyledInput = styled(Input)`
  max-width: 210px;
  width: 100%;
`;

export const AddContact: FC = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [contact, setContact] = useState<Partial<TContact>>({});
  const { addContact, clearContacts } = useContactListContext();

  const onChangeHandler =
    (field: keyof TContact) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;

      if (field === "name" || field === "vacancy") {
        if (!/^[a-zA-Z]*$/.test(value)) return;
      }

      if (field === "phone") {
        if (!/^[+\d]*$/.test(value)) return;
        if (!value.startsWith("+")) {
          setError("Phone number must start with +");
          setContact((prev) => ({ ...prev, phone: "" }));
          return;
        }
      }
      setError(undefined);
      setContact((prev) => ({ ...prev, [field]: value }));
    };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error) {
      setError(undefined);
    }
    if (e.key === "Enter") {
      addItemHandler();
    }
  };

  const addItemHandler = () => {
    if (
      !contact.name?.trim() ||
      !contact.vacancy?.trim() ||
      !contact.phone?.trim()
    ) {
      setError("All fields are required");
      return;
    }
    addContact(contact as TContact);
    setContact({});
  };

  return (
    <Wrapper>
      <StyledInput
        placeholder={error ? "Name is required!" : "Name"}
        status={error ? "error" : undefined}
        value={contact.name || ""}
        onChange={onChangeHandler("name")}
        onKeyDown={onKeyPressHandler}
      />
      <StyledInput
        placeholder={error ? "Vacancy is required!" : "Vacancy"}
        status={error ? "error" : undefined}
        value={contact.vacancy || ""}
        onChange={onChangeHandler("vacancy")}
        onKeyDown={onKeyPressHandler}
      />
      <StyledInput
        placeholder={error ? "Phone is required" : "Phone: +X XXX XXX XX XX"}
        status={error ? "error" : undefined}
        value={contact.phone || ""}
        onChange={onChangeHandler("phone")}
        onKeyDown={onKeyPressHandler}
      />
      <ContactButton onClick={addItemHandler}>
        <PlusOutlined />
      </ContactButton>
      <ContactButton onClick={clearContacts}>
        <DeleteOutlined />
      </ContactButton>
      <ContactModal />
    </Wrapper>
  );
};
