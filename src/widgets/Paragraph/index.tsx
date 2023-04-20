import { Icon } from "altrone-ui";
import { BlockData, Widget } from "../../interfaces/Widget";
import { ParagraphData, ParagraphEditMode } from "./ParagraphEditMode";
import React from "react";
import { ParagraphRenderer } from "./ParagraphRenderer";

export default {
  icon: <Icon i="" />,
  name: "paragraph",
  label: "Paragraph",
  params: [],
  editMode: ParagraphEditMode,
  render: ParagraphRenderer,
} as Widget<ParagraphData & BlockData>;
