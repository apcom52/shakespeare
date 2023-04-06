type BaseWidget = {
  id: string;
  widget: string;
};

export interface ShakespeareDocument {
  name: string;
  shakespeareVersion: number;
  content: (BaseWidget & Record<string, unknown>)[];
}
