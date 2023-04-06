import React from "react";
import { Container, TextEditor } from "../index";
import { EditModeContext } from "../../contexts/EditModeContext";
import HEADING_WIDGET from "../../widgets/Heading";

const BASIC_WIDGETS: Record<string, any> = {
  heading: HEADING_WIDGET,
};

interface ShakespeareProps {
  editMode?: boolean;
}

export const Shakespeare = ({ editMode = true }) => {
  return (
    <EditModeContext.Provider value={editMode}>
      <Container widget={HEADING_WIDGET}>
        <TextEditor />
      </Container>
    </EditModeContext.Provider>
  );
};
