import s from "./FluentText.module.scss";
import React, { useCallback, useId, useRef, useState } from "react";
import sanitize from "sanitize-html";
import ContentEditable from "react-contenteditable";
import { useShakespeareActions } from "../../contexts/ShakespeareActionsContext";
import {
  Button,
  ButtonContainer,
  ButtonVariant,
  FloatingBox,
  Icon,
  Size,
} from "altrone-ui";

export const FluentText = () => {
  const { focusedText, focusText } = useShakespeareActions();

  const textId = useId();

  const editorRef = useRef<ContentEditable>(null);

  const [text, setText] = useState("");

  const isToolbarVisible = focusedText === textId;

  const onChange = useCallback((e) => {
    const sanitizeConf = {
      allowedTags: ["b", "i", "u", "code", "a", "p"],
      allowedAttributes: { a: ["href"] },
    };

    setText(sanitize(e.currentTarget.innerHTML, sanitizeConf));
  }, []);

  const onFocus = useCallback(() => {
    focusText(textId);
  }, [textId]);

  console.log(editorRef.current);

  return (
    <>
      {isToolbarVisible && editorRef.current.el.current && (
        <FloatingBox
          targetElement={editorRef.current.el.current}
          useRootContainer
          placement="top-start"
          onClose={() => null}
        >
          <ButtonContainer>
            <Button
              variant={ButtonVariant.transparent}
              size={Size.small}
              isIcon
            >
              <Icon i="format_bold" />
            </Button>
            <Button
              variant={ButtonVariant.transparent}
              size={Size.small}
              isIcon
            >
              <Icon i="format_italic" />
            </Button>
            <Button
              variant={ButtonVariant.transparent}
              size={Size.small}
              isIcon
            >
              <Icon i="format_underlined" />
            </Button>
            <Button
              variant={ButtonVariant.transparent}
              size={Size.small}
              isIcon
            >
              <Icon i="link" />
            </Button>
            <Button
              variant={ButtonVariant.transparent}
              size={Size.small}
              isIcon
            >
              <Icon i="code" />
            </Button>
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
