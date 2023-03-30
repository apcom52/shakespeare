import React from "react";
import s from "./Shakespeare.module.scss";
import { Container, TextEditor } from "../index";

export const Shakespeare = () => {
  return (
    <>
      <Container>
        <TextEditor />
      </Container>
      <div className={s.Placeholder}>/ введите текст</div>
    </>
  );
};
