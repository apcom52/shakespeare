import { Icon } from "altrone-ui";
import { BlockData, Widget } from "../../interfaces/Widget";
import { DividerData, DividerParams, DividerEditMode } from "./DividerEditMode";
import { DividerRenderer } from "./DividerRenderer";
import React from "react";

export default {
  icon: <Icon i="minus" />,
  name: "divider",
  label: "Разделитель",
  params: [],
  editMode: DividerEditMode,
  render: DividerRenderer,
} as Widget<DividerData & BlockData>;
