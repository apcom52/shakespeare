import React, { PropsWithChildren, useState } from "react";
import { Button, Icon, Size } from "altrone-ui";
import s from "./Container.module.scss";
import { BlockData, Widget } from "../../interfaces/Widget";

interface ContainerProps<D extends BlockData, P> {
  widget: Widget<D, P>;
}

export const Container = <D extends BlockData, P>({
  children,
  widget,
}: PropsWithChildren<ContainerProps<D, P>>) => {
  const [data, setData] = useState<D>({} as D);
  const [params, setParams] = useState<P>({} as P);

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
      <div className={s.Container__content}>
        {widget.editMode(data, params)}
      </div>
      <div className={s.Container__name}>{widget.name}</div>
    </section>
  );
};
