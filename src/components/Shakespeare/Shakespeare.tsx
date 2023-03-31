import React from "react";
import s from "./Shakespeare.module.scss";
import { Container, TextEditor } from "../index";
import { EditModeContext } from "../../contexts/EditModeContext";

interface ShakespeareProps {
  editMode?: boolean;
}

export const Shakespeare = ({ editMode = true }) => {
  return (
    <EditModeContext.Provider value={editMode}>
      <Container>
        <TextEditor />
      </Container>
      <div className={s.Placeholder}>/ введите текст</div>
    </EditModeContext.Provider>
  );
};
