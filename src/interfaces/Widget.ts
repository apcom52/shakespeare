import { WidgetParameters } from "./Params";

export interface WidgetEditModeProps<Data, Params> {
  data: Data;
  params: Params;
  changeData: (field: keyof Data, value: unknown) => void;
  changeParam: (field: keyof Params, value: unknown) => void;
}

export interface Widget<Data extends BlockData, Params> {
  name: string;
  icon: JSX.Element;
  label: string;
  params: WidgetParameters[];
  editMode: (props: WidgetEditModeProps<Data, Params>) => JSX.Element;
  render: (data: Data) => JSX.Element;
}

export interface BlockData {
  id: Symbol;
  widget: string;
}
