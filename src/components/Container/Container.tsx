import React, { PropsWithChildren } from "react";
import { Button, Icon, Size } from "altrone-ui";
import s from "./Container.module.scss";

export const Container = ({ children }: PropsWithChildren) => {
  return (
    <section className={s.Container}>
      <div className={s.Container__actions}>
        <Button
          size={Size.small}
          isIcon
          dropdown={[
            {
              icon: <Icon i="delete" />,
              title: "Delete",
              danger: true,
              onClick: () => null,
            },
            {
              icon: <Icon i="title" />,
              title: "Paragraph",
              onClick: () => null,
            },
            {
              icon: <Icon i="text_format" />,
              title: "Heading",
              onClick: () => null,
            },
            {
              icon: <Icon i="remove" />,
              title: "Separator",
              onClick: () => null,
            },
            {
              icon: <Icon i="format_list_bulleted" />,
              title: "Marked list",
              onClick: () => null,
            },
            {
              icon: <Icon i="format_list_numbered" />,
              title: "Ordered list",
              onClick: () => null,
            },
            {
              icon: <Icon i="format_list_numbered" />,
              title: "Ordered list",
              onClick: () => null,
            },
          ]}
        >
          <Icon i="add" />
        </Button>
      </div>
      <div className={s.Container__content}>{children}</div>
    </section>
  );
};
