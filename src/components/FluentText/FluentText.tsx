import s from "./FluentText.module.scss";
import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import sanitize from "sanitize-html";
import ContentEditable from "react-contenteditable";
import { useShakespeareActions } from "../../contexts/ShakespeareActionsContext";
import { ButtonContainer, FloatingBox } from "altrone-ui";
import { FluentTextCommand } from "./FluentTextCommand";
import { LinkModal } from "./LinkModal";

type Formatters = {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  link: boolean;
  code: boolean;
};

interface FluentTextProps {
  text: string;
  onChange: (text: string) => void;
}

export const FluentText = ({ text = "", onChange }) => {
  const { focusedText, focusText } = useShakespeareActions();

  const textId = useId();

  const editorRef = useRef<ContentEditable>(null);

  const [isLinkModalVisible, setIsLinkModalVisible] = useState(false);
  const [formatters, setFormatters] = useState<Formatters>({
    bold: false,
    italic: false,
    underline: false,
    link: false,
    code: false,
  });

  const isToolbarVisible = focusedText === textId;

  const onTextChange = useCallback(
    (e) => {
      const sanitizeConf = {
        allowedTags: ["b", "i", "u", "code", "a", "p"],
        allowedAttributes: { a: ["href"] },
      };

      onChange(sanitize(e.currentTarget.innerHTML, sanitizeConf));
    },
    [onChange]
  );

  const onFocus = useCallback(() => {
    focusText(textId);
  }, [textId]);

  const onLinkButtonClick = useCallback(() => {
    setIsLinkModalVisible(true);
  }, []);

  const addLinkCommand = useCallback((name, link) => {
    editorRef.current.el.current.focus();
    document.execCommand(
      "insertHTML",
      false,
      ` <a href="${link}">${name}</a> `
    );
    setIsLinkModalVisible(false);
  }, []);

  const getSelection = useCallback(() => {
    const selection = window.getSelection();

    const selectionRange = selection.getRangeAt(0);

    const parent =
      selectionRange.commonAncestorContainer !== editorRef.current.el.current
        ? selectionRange.commonAncestorContainer.parentElement.closest(
            "[contenteditable]"
          )
        : selectionRange.commonAncestorContainer;

    const start = selectionRange.startContainer;
    const end = selectionRange.endContainer;

    const childrenNodes = Array.from(parent.childNodes);

    const treeToArray = (branch: ChildNode[]): ChildNode[] => {
      let result = [];

      for (const node of branch) {
        const childNodes = Array.from(node.childNodes);
        if (childNodes.length === 0) {
          result.push(node);
        } else {
          result.push(...treeToArray(childNodes));
        }
      }

      return result;
    };

    const plainNodes = treeToArray(childrenNodes);

    const selectedStartIndex = plainNodes.findIndex((node) => node === start);
    const selectedEndIndex = plainNodes.findIndex((node) => node === end);

    const selectedNodes = plainNodes.slice(
      selectedStartIndex,
      selectedEndIndex + 1
    );

    const formatters: Formatters = {
      bold: false,
      italic: false,
      underline: false,
      link: false,
      code: false,
    };

    for (const node of selectedNodes) {
      if (!formatters.bold && node.parentElement.closest("b, strong")) {
        formatters.bold = true;
      }

      if (!formatters.italic && node.parentElement.closest("i")) {
        formatters.italic = true;
      }

      if (!formatters.underline && node.parentElement.closest("u")) {
        formatters.underline = true;
      }

      if (!formatters.link && node.parentElement.closest("a")) {
        formatters.link = true;
      }

      if (!formatters.code && node.parentElement.closest("code")) {
        formatters.code = true;
      }
    }

    return formatters;
  }, []);

  const onSelectionChange = useCallback(
    (e) => {
      if (e.target.activeElement === editorRef.current.el.current) {
        setFormatters(getSelection());
      }
    },
    [getSelection]
  );

  console.log(formatters);

  useEffect(() => {
    if (editorRef.current && editorRef.current.el) {
      document.addEventListener("selectionchange", onSelectionChange);
    }

    return () => {
      document.removeEventListener("selectionchange", onSelectionChange);
    };
  }, [editorRef.current?.el]);

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
              checked={formatters.bold}
            />
            <FluentTextCommand
              icon="format_italic"
              command="italic"
              title="Курсив (Cmd+I)"
              checked={formatters.italic}
            />
            <FluentTextCommand
              icon="format_underlined"
              command="underline"
              title="Подчеркивание (Cmd+U)"
              checked={formatters.underline}
            />
            <FluentTextCommand
              icon="link"
              args="https://github.com/lovasoa/react-contenteditable"
              title="Ссылка (Cmd+H)"
              onClick={onLinkButtonClick}
              checked={formatters.link}
            />
            <FluentTextCommand
              icon="code"
              command="insertHTML"
              title="Код (Cmd+M)"
              args=" <code>code</code> "
              checked={formatters.code}
            />
          </ButtonContainer>
        </FloatingBox>
      )}
      {isLinkModalVisible && (
        <LinkModal
          onClose={() => setIsLinkModalVisible(false)}
          onSubmit={addLinkCommand}
        />
      )}
      <ContentEditable
        // @ts-ignore
        ref={editorRef}
        html={text}
        onChange={onTextChange}
        className={s.FluentText}
        onFocus={onFocus}
      />
    </>
  );
};
