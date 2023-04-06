import React from "react";
import { Container, TextEditor } from "../index";
import { EditModeContext } from "../../contexts/EditModeContext";
import HEADING_WIDGET from "../../widgets/Heading";
import DIVIDER_WIDGET from "../../widgets/Divider";

const BASIC_WIDGETS: Record<string, any> = {
  heading: HEADING_WIDGET,
  divider: DIVIDER_WIDGET,
};

interface ShakespeareProps {
  value: any[];
  onChange: (value: any) => void;
  editMode?: boolean;
}

export const Shakespeare = ({
  value = [],
  editMode = true,
}: ShakespeareProps) => {
  console.log({ value });
  return (
    <EditModeContext.Provider value={editMode}>
      {value.map((container, containerIndex) => {
        return (
          <Container
            key={containerIndex}
            widget={BASIC_WIDGETS[container.widget]}
          >
            <TextEditor />
          </Container>
        );
      })}
      <Container widget={BASIC_WIDGETS.heading} />
      <Container widget={BASIC_WIDGETS.divider} />
    </EditModeContext.Provider>
  );
};
