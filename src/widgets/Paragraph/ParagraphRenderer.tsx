import React from "react";
import { ParagraphData } from "./ParagraphEditMode";

export const ParagraphRenderer = (data: ParagraphData) => {
  return <p>{data.content}</p>;
};
