import React, { FC } from "react";
import styled from "styled-components";
import { ColumnTable } from "./column-table";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  max-width: 100%;
  min-width: 460px;
  column-gap: 30px;
  row-gap: 6px;
  padding: 10px;
  box-shadow:
    rgba(0, 0, 0, 0.25) 0 54px 55px,
    rgba(0, 0, 0, 0.12) 0 -12px 30px,
    rgba(0, 0, 0, 0.12) 0 4px 6px,
    rgba(0, 0, 0, 0.17) 0 12px 13px,
    rgba(0, 0, 0, 0.09) 0 -3px 5px;

  span {
    color: rgba(0, 0, 0, 0.5);
  }
`;

const tableLetter = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i),
);

const firstColumnLetters = tableLetter.slice(0, 13);
const secondColumnLetters = tableLetter.slice(13);

export const ContactsTable: FC = () => (
  <Wrapper>
    <ColumnTable letters={firstColumnLetters} />
    <ColumnTable letters={secondColumnLetters} />
  </Wrapper>
);
