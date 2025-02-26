import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import styled from "styled-components";
import { Input } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { TContact } from "../state/contact-list/types";
import { useContactListContext } from "../services";
import { ContactModal } from "./modal/contact-modal/contact-modal";
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

const validateName = (value: string): boolean => /^[a-zA-Z]*$/.test(value);
const validatePhone = (value: string): boolean =>
  /^[+\d]*$/.test(value) && value.startsWith("+");

export const AddContact: FC = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [contact, setContact] = useState<Partial<TContact>>({});
  const { addContact, clearContacts } = useContactListContext();

  const { name, vacancy, phone } = contact;

  const onChangeHandler =
    (field: keyof TContact) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;

      if (field === "name" && !validateName(value)) return;
      if (field === "phone" && !validatePhone(value)) {
        setError("Phone number must start with +");
        setContact((prev) => ({ ...prev, phone: "" }));
        return;
      }

      setError(undefined);
      setContact((prev) => ({ ...prev, [field]: value }));
    };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error) setError(undefined);
    if (e.key === "Enter") addItemHandler();
  };

  const addItemHandler = () => {
    if (!name?.trim() || !vacancy?.trim() || !phone?.trim()) {
      setError("All fields are required");
      return;
    }
    addContact(contact as TContact);
    setContact({});
  };

  const inputProps = (field: keyof TContact, placeholder: string) => ({
    placeholder: error ? `${placeholder} is required!` : placeholder,
    status: (error ? "error" : undefined) as
      | ""
      | "error"
      | "warning"
      | undefined,
    value: contact[field] || "",
    onChange: onChangeHandler(field),
    onKeyDown: onKeyPressHandler,
  });

  return (
    <Wrapper>
      <StyledInput {...inputProps("name", "Name")} />
      <StyledInput {...inputProps("vacancy", "Vacancy")} />
      <StyledInput {...inputProps("phone", "Phone")} />
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
