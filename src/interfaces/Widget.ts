export interface Widget<Data extends BlockData, Params> {
  name: string;
  icon: JSX.Element;
  label: string;
  editMode: (data: Data, params: Params) => JSX.Element;
  render: (data: Data) => JSX.Element;
}

export interface BlockData {
  id: Symbol;
  widget: string;
}
