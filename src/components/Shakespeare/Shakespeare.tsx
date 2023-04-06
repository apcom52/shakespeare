import React, { useCallback } from "react";
import { Container, TextEditor } from "../index";
import { EditModeContext } from "../../contexts/EditModeContext";
import HEADING_WIDGET from "../../widgets/Heading";
import DIVIDER_WIDGET from "../../widgets/Divider";
import { ShakespeareDocument } from "../../interfaces/Document";
import { v4 as uuid } from "uuid";
import { ShakespeareActionsContext } from "../../contexts/ShakespeareActionsContext";

const BASIC_WIDGETS: Record<string, any> = {
  heading: HEADING_WIDGET,
  divider: DIVIDER_WIDGET,
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
  console.log(document);

  const addWidget = useCallback(
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

  return (
    <ShakespeareActionsContext.Provider
      value={{
        addWidget,
      }}
    >
      <EditModeContext.Provider value={editMode}>
        {document.content.map((container, containerIndex) => (
          <Container
            key={container.id}
            containerPosition={containerIndex}
            widget={BASIC_WIDGETS[container.widget]}
          >
            <TextEditor />
          </Container>
        ))}
      </EditModeContext.Provider>
    </ShakespeareActionsContext.Provider>
  );
};
