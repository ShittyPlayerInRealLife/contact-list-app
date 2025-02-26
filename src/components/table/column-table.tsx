import React, { FC, useState, useMemo } from "react";
import styled from "styled-components";
import { useContactListSelector } from "../../state/contact-list/selector";
import { LetterList } from "./letter-list";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Element = styled.div`
  display: flex;
  justify-content: space-between;
  background: white;
  border-radius: 6px;
  padding: 10px;
  cursor: pointer;
`;

type TProps = {
  letters: string[];
};

export const ColumnTable: FC<TProps> = ({ letters }) => {
  const contacts = useContactListSelector();
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const handleLetterClick = (letter: string) => {
    setSelectedLetter((prevLetter) => (prevLetter === letter ? null : letter));
  };

  const getContactsForLetter = (letter: string) => {
    const element = contacts.find((element) => element.letter === letter);
    return element ? element.contacts : [];
  };

  const renderLetterElements = (letter: string) => {
    const contactsForLetter = getContactsForLetter(letter);
    const hasContacts = contactsForLetter.length > 0;

    return (
      <React.Fragment key={letter}>
        <Element onClick={() => handleLetterClick(letter)}>
          <span>{letter}</span>
          {hasContacts && <span>{contactsForLetter.length}</span>}
        </Element>
        {selectedLetter === letter && hasContacts && (
          <LetterList
            currentLetter={selectedLetter}
            letterContacts={contactsForLetter}
          />
        )}
      </React.Fragment>
    );
  };

  return <Wrapper>{letters.map(renderLetterElements)}</Wrapper>;
};
