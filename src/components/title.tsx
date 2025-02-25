import { FC } from "react";
import styled from "styled-components";

const Wrapper = styled.h1`
  display: block;
  font-size: 2em;
  color: white;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0;
  margin-inline-end: 0;
  font-weight: bold;
  unicode-bidi: isolate;
`;

export const Title: FC = () => <Wrapper>Contact List</Wrapper>;
