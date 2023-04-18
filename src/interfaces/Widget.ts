import { WidgetParameters } from "./Params";

export interface WidgetEditModeProps<Data> {
  data: Data;
  changeData: (field: keyof Data, value: unknown) => void;
}

export interface Widget<Data extends BlockData> {
  name: string;
  icon: JSX.Element;
  label: string;
  params: WidgetParameters<Data>;
  editMode: (props: WidgetEditModeProps<Data>) => JSX.Element;
  render: (data: Data) => JSX.Element;
}

export interface BlockData {
  id: string;
  widget: string;
}
