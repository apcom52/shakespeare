import { Icon } from "altrone-ui";
import { BlockData, Widget } from "../../interfaces/Widget";
import {
  HeadingData,
  HeadingParams,
  HeadingParamsEditMode,
} from "./HeadingEditMode";
import React from "react";

export default {
  icon: <Icon i="" />,
  name: "heading",
  label: "Heading",
  editMode: HeadingParamsEditMode,
  render: () => null,
} as Widget<HeadingData & BlockData, HeadingParams>;
