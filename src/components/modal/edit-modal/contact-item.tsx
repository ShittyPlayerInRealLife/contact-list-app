import { ContactButton } from "../../common/contact-button";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import React, { FC } from "react";
import styled from "styled-components";
import { TContact, TContactsGroup } from "../../../state/contact-list/types";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #666;
  &:last-child {
    border-bottom: none;
  }

  div:last-child {
    display: flex;
    gap: 4px;
  }
`;

const ContactDetail = styled.div`
  margin-bottom: 5px;
  color: #666;

  &:last-child {
    margin-bottom: 0;
  }
`;

type TProps = {
  group: TContactsGroup;
  removeContact: (letter: string, index: number) => void;
  showEditModal: (letter: string, index: number, contact: TContact) => void;
};

export const ContactItem: FC<TProps> = ({
  group,
  removeContact,
  showEditModal,
}) => (
  <>
    {group.contacts.map((contact, index) => {
      const { name, vacancy, phone } = contact;
      return (
        <Wrapper key={index}>
          <div>
            <ContactDetail>Name: {name}</ContactDetail>
            <ContactDetail>Vacancy: {vacancy}</ContactDetail>
            <ContactDetail>Phone: {phone}</ContactDetail>
          </div>
          <div>
            <ContactButton
              onClick={() => showEditModal(group.letter, index, contact)}
            >
              <EditOutlined />
            </ContactButton>
            <ContactButton onClick={() => removeContact(group.letter, index)}>
              <CloseOutlined />
            </ContactButton>
          </div>
        </Wrapper>
      );
    })}
  </>
);
