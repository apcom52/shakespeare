import { Icon } from "altrone-ui";
import { BlockData, Widget } from "../../interfaces/Widget";
import {
  DividerData,
  DividerParams,
  HeadingParamsEditMode,
} from "./DividerEditMode";
import React from "react";

export default {
  icon: <Icon i="minus" />,
  name: "divider",
  label: "Разделитель",
  params: [],
  editMode: HeadingParamsEditMode,
  render: () => null,
} as Widget<DividerData & BlockData, DividerParams>;
