import React, { useMemo } from "react";
import sanitize from "sanitize-html";
import { ParagraphData } from "./ParagraphEditMode";

export const ParagraphRenderer = (data: ParagraphData) => {
  const sanitizedText = useMemo(() => {
    return sanitize(data.content, {
      allowedTags: ["b", "i", "u", "code", "a", "p"],
      allowedAttributes: { a: ["href"] },
    });
  }, [data.content]);

  return <p dangerouslySetInnerHTML={{ __html: sanitizedText }}></p>;
};
