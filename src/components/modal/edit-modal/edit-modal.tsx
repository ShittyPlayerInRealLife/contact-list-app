import { Input, Modal } from "antd";
import React, { FC } from "react";
import styled from "styled-components";
import { TCurrentContact } from "../../../types/types";

const StyledInput = styled(Input)`
  margin-bottom: 6px;
`;

type TProps = {
  isModalOpen: boolean;
  currentContact: TCurrentContact;
  editContact: () => void;
  onCancel: () => void;
  nameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  vacancyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  phoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const EditModal: FC<TProps> = ({
  isModalOpen,
  currentContact,
  editContact,
  onCancel,
  nameChange,
  vacancyChange,
  phoneChange,
}) => (
  <Modal
    title="Edit Contact"
    open={isModalOpen}
    onOk={editContact}
    onCancel={onCancel}
  >
    <div>Name:</div>
    <StyledInput
      placeholder="Name"
      value={currentContact.name}
      onChange={(e) => nameChange(e)}
    />
    <div>Vacancy:</div>
    <StyledInput
      placeholder="Vacancy"
      value={currentContact.vacancy}
      onChange={(e) => vacancyChange(e)}
    />
    <div>Phone:</div>
    <StyledInput
      placeholder="Phone"
      value={currentContact.phone}
      onChange={(e) => phoneChange(e)}
    />
  </Modal>
);
