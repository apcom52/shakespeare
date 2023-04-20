import React, { useCallback, useRef, useState } from "react";
import { Container, TextEditor } from "../index";
import { EditModeContext } from "../../contexts/EditModeContext";
import HEADING_WIDGET from "../../widgets/Heading";
import DIVIDER_WIDGET from "../../widgets/Divider";
import PARAGRAPH_WIDGET from "../../widgets/Paragraph";
import { ShakespeareDocument } from "../../interfaces/Document";
import { v4 as uuid } from "uuid";
import { ShakespeareActionsContext } from "../../contexts/ShakespeareActionsContext";
import { FluentText } from "../FluentText/FluentText";
import { useOutsideClick } from "rooks";

const BASIC_WIDGETS: Record<string, any> = {
  heading: HEADING_WIDGET,
  divider: DIVIDER_WIDGET,
  paragraph: PARAGRAPH_WIDGET,
};

interface ShakespeareProps {
  document: ShakespeareDocument;
  onDocumentChange: (document: ShakespeareDocument) => void;
  editMode?: boolean;
}

export const Shakespeare = ({
  document,
  onDocumentChange,
  editMode = true,
}: ShakespeareProps) => {
  const [focusedText, setFocusedText] = useState("");
  const shakespeareRef = useRef<HTMLDivElement>(null);

  useOutsideClick(shakespeareRef, (e) => {
    // @ts-ignore
    console.log(e.target.closest);
    // @ts-ignore
    if (e.target.closest(".shakespeare-fluent-text-toolbar")) {
      return;
    }
    setFocusedText("");
  });

  const addBlock = useCallback(
    (position = -1, widget = "text") => {
      const newWidget = {
        id: uuid(),
        widget,
      };

      if (position === -1 || position === document.content.length) {
        onDocumentChange({
          ...document,
          content: [...document.content, newWidget],
        });
      } else {
        onDocumentChange({
          ...document,
          content: [
            ...document.content.slice(0, position),
            newWidget,
            ...document.content.slice(position),
          ],
        });
      }
    },
    [document, onDocumentChange]
  );

  const editContainerData = useCallback(
    (containerIndex: number, data: Record<string, unknown>) => {
      const content = [...document.content];
      content[containerIndex] = {
        ...content[containerIndex],
        ...data,
      };

      onDocumentChange({
        ...document,
        content,
      });
    },
    [document, onDocumentChange]
  );

  return (
    <div className="shakespeare" ref={shakespeareRef}>
      <ShakespeareActionsContext.Provider
        value={{
          addWidget: addBlock,
          focusedText,
          focusText: setFocusedText,
        }}
      >
        <EditModeContext.Provider value={editMode}>
          <FluentText />
          <br />
          <div>
            {document.content.map((container, containerIndex) => (
              <Container
                key={`${container.id}-${editMode ? "U" : "R"}`}
                containerPosition={containerIndex}
                widget={BASIC_WIDGETS[container.widget]}
                data={container}
                onChangeData={(value) =>
                  editContainerData(containerIndex, value)
                }
              >
                <TextEditor />
              </Container>
            ))}
          </div>
        </EditModeContext.Provider>
      </ShakespeareActionsContext.Provider>
    </div>
  );
};
