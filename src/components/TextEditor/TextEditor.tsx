import { Editor, EditorState } from "draft-js";
import React, { useState } from "react";
import "draft-js/dist/Draft.css";
import s from "./TextEditor.module.scss";

export const TextEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  return (
    <div className={s.TextEditor}>
      <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  );
};
