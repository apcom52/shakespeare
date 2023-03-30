import { Editor, EditorState } from "draft-js";
import React, { useState } from "react";

export const TextEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  console.log(editorState);

  return (
    <>
      <p>value: {JSON.stringify(editorState)}</p>
      <Editor editorState={editorState} onChange={setEditorState} />;
    </>
  );
};
