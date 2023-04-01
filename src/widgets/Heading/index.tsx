import { Icon } from "altrone-ui";
import { BlockData, Widget } from "../../interfaces/Widget";
import {
  HEADING_SELECT_OPTIONS,
  HeadingData,
  HeadingParams,
  HeadingParamsEditMode,
} from "./HeadingEditMode";
import React from "react";

export default {
  icon: <Icon i="" />,
  name: "heading",
  label: "Heading",
  params: [
    {
      type: "checkbox",
      label: "Example of checkbox",
    },
    {
      type: "select",
      label: "Select a style",
      options: HEADING_SELECT_OPTIONS,
    },
  ],
  editMode: HeadingParamsEditMode,
  render: () => null,
} as Widget<HeadingData & BlockData, HeadingParams>;