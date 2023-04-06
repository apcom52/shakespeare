import { Option } from "altrone-ui";

interface Param {
  name: string;
}

export interface SelectParam {
  type: "select";
  label: string;
  options: Option<unknown>[];
  defaultValue?: unknown;
}

export interface CheckboxParam {
  type: "checkbox";
  label: string;
  defaultValue?: boolean;
}

export type WidgetParameters = Param & (SelectParam | CheckboxParam);
