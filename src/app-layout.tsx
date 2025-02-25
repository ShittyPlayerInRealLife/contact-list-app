import React, { FC } from "react";
import styled from "styled-components";
import { Title } from "./components/title";
import { AddContact } from "./components/add-contact";
import { ContactsTable } from "./components/table/contacts-table";

const Wrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

export const AppLayout: FC = () => (
  <Wrapper>
    <Title />
    <AddContact />
    <ContactsTable />
  </Wrapper>
);
