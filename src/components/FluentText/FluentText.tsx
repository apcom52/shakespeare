import s from "./FluentText.module.scss";
import React, { useCallback, useId, useRef, useState } from "react";
import sanitize from "sanitize-html";
import ContentEditable from "react-contenteditable";
import { useShakespeareActions } from "../../contexts/ShakespeareActionsContext";
import { ButtonContainer, FloatingBox } from "altrone-ui";
import { FluentTextCommand } from "./FluentTextCommand";

export const FluentText = () => {
  const { focusedText, focusText } = useShakespeareActions();

  const textId = useId();

  const editorRef = useRef<ContentEditable>(null);

  const [text, setText] = useState("");

  const isToolbarVisible = focusedText === textId;

  const onChange = useCallback((e) => {
    console.log(">>>", e.currentTarget.innerHTML);
    const sanitizeConf = {
      allowedTags: ["b", "i", "u", "code", "a", "p"],
      allowedAttributes: { a: ["href"] },
    };

    setText(sanitize(e.currentTarget.innerHTML, sanitizeConf));
  }, []);

  const onFocus = useCallback(() => {
    focusText(textId);
  }, [textId]);

  console.log(text);

  return (
    <>
      {isToolbarVisible && editorRef.current.el.current && (
        <FloatingBox
          targetElement={editorRef.current.el.current}
          useRootContainer
          className="shakespeare-fluent-text-toolbar"
          placement="top-start"
          onClose={() => null}
        >
          <ButtonContainer>
            <FluentTextCommand
              icon="format_bold"
              command="bold"
              title="Полужирный (Cmd+B)"
              hotkey="b"
              inFocus={true}
              checked
            />
            <FluentTextCommand
              icon="format_italic"
              command="italic"
              title="Курсив (Cmd+I)"
            />
            <FluentTextCommand
              icon="format_underlined"
              command="underline"
              title="Подчеркивание (Cmd+U)"
            />
            <FluentTextCommand
              icon="link"
              args="https://github.com/lovasoa/react-contenteditable"
              command="createLink"
              title="Ссылка (Cmd+H)"
            />
            <FluentTextCommand
              icon="code"
              command="insertHTML"
              title="Код (Cmd+M)"
              args=" <code>code</code> "
            />
          </ButtonContainer>
        </FloatingBox>
      )}
      <ContentEditable
        // @ts-ignore
        ref={editorRef}
        html={text}
        onChange={onChange}
        className={s.FluentText}
        onFocus={onFocus}
      />
    </>
  );
};
