import React, { FC, useState } from "react";
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

  const letterClickHandler = (letter: string) => {
    setSelectedLetter(selectedLetter === letter ? null : letter);
  };

  return (
    <Wrapper>
      {letters.map((l: string) => {
        const contactsForLetter = contacts[l] || [];
        return (
          <React.Fragment key={l}>
            <Element onClick={() => letterClickHandler(l)}>
              <span>{l}</span>
              {contactsForLetter.length > 0 && (
                <span>{contactsForLetter.length}</span>
              )}
            </Element>
            {selectedLetter === l && contactsForLetter.length > 0 && (
              <LetterList
                currentLetter={selectedLetter}
                letterContacts={contactsForLetter}
              />
            )}
          </React.Fragment>
        );
      })}
    </Wrapper>
  );
};
