import React, { FC, ChangeEvent } from "react";
import styled from "styled-components";
import { Input } from "antd";

const StyledInput = styled(Input)`
  margin-bottom: 16px;
`;

type TProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const SearchInput: FC<TProps> = ({ value, onChange }) => (
  <StyledInput placeholder="Search by name" value={value} onChange={onChange} />
);
