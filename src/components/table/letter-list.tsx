import React, { FC } from "react";
import styled from "styled-components";
import { TContact } from "../../state/contact-list/types";
import { ContactButton } from "../common/contact-button";
import { CloseOutlined } from "@ant-design/icons";
import { useContactListContext } from "../../services";

const Wrapper = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-radius: 6px;

  button {
    padding: 0 8px;
  }

  svg {
    color: white;
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: white;
  border: 0.4px rgba(0, 0, 0, 0.2) solid;
  border-radius: 6px;

  div:first-child {
    display: flex;
    flex-direction: column;
  }
`;

type TProps = {
  currentLetter: string;
  letterContacts: TContact[];
};

export const LetterList: FC<TProps> = ({ currentLetter, letterContacts }) => {
  const { removeContact } = useContactListContext();

  return (
    <Wrapper>
      {letterContacts.map((contact, index) => (
        <Item key={index}>
          <div>
            <span>Name: {contact.name}</span>
            <span>Vacancy: {contact.vacancy}</span>
            <span>Phone: {contact.phone}</span>
          </div>
          <div>
            <ContactButton onClick={() => removeContact(currentLetter, index)}>
              <CloseOutlined />
            </ContactButton>
          </div>
        </Item>
      ))}
    </Wrapper>
  );
};
