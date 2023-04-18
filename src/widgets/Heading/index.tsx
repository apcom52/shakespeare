import { Icon } from "altrone-ui";
import { BlockData, Widget } from "../../interfaces/Widget";
import {
  HEADING_SELECT_OPTIONS,
  HeadingData,
  HeadingParams,
  HeadingParamsEditMode,
} from "./HeadingEditMode";
import React from "react";
import { HeadingRenderer } from "./HeadingRenderer";

export default {
  icon: <Icon i="" />,
  name: "heading",
  label: "Heading",
  params: [
    {
      name: "level",
      type: "select",
      label: "Размер",
      options: HEADING_SELECT_OPTIONS,
      defaultValue: HEADING_SELECT_OPTIONS[0].value,
    },
  ],
  editMode: HeadingParamsEditMode,
  render: HeadingRenderer,
} as Widget<HeadingData & BlockData>;
