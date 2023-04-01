import React, { PropsWithChildren, useCallback, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  ContextMenu,
  FloatingBox,
  Form,
  FormField,
  FormGroup,
  Icon,
  Select,
  Size,
} from "altrone-ui";
import s from "./Container.module.scss";
import { BlockData, Widget } from "../../interfaces/Widget";
import clsx from "clsx";

interface ContainerProps<D extends BlockData, P> {
  widget: Widget<D, P>;
}

export const Container = <D extends BlockData, P>({
  children,
  widget,
}: PropsWithChildren<ContainerProps<D, P>>) => {
  const [isAddMenuVisible, setIsAddMenuVisible] = useState(false);
  const [data, setData] = useState<D>({} as D);

  const { params: paramsConfig = [] } = widget;
  const [params, setParams] = useState<P>({} as P);

  const closeAddMenu = useCallback(() => {
    setIsAddMenuVisible(false);
  }, []);

  const changeData = useCallback((field: keyof D, value: unknown) => {
    setData((oldData) => ({
      ...oldData,
      [field]: value,
    }));
  }, []);

  const changeParam = useCallback((field: keyof P, value: unknown) => {
    setParams((oldParams) => ({
      ...oldParams,
      [field]: value,
    }));
  }, []);

  const addButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <section className={s.Container}>
      <div className={s.Container__actions}>
        <Button
          size={Size.small}
          isIcon
          ref={addButtonRef}
          onClick={() => setIsAddMenuVisible(!isAddMenuVisible)}
        >
          <Icon i="add" />
        </Button>
      </div>
      <div className={s.Container__content}>
        {widget.editMode({
          data,
          params,
          changeData,
          changeParam,
        })}
      </div>
      <div className={s.Container__name}>{widget.name}</div>

      {isAddMenuVisible && (
        <FloatingBox
          targetElement={addButtonRef.current}
          onClose={closeAddMenu}
          className={s.Container__menu}
          placement="bottom"
        >
          <div className={s.Container__quickActions}>
            <button className={s.ContainerQuickAction}>
              <Icon i="arrow_upward" />
            </button>
            <button className={s.ContainerQuickAction}>
              <Icon i="arrow_downward" />
            </button>
            <button className={s.ContainerQuickAction}>
              <Icon i="content_copy" />
            </button>
            <button
              className={clsx(
                s.ContainerQuickAction,
                s.ContainerQuickAction_danger
              )}
            >
              <Icon i="delete" />
            </button>
          </div>
          <hr />
          {paramsConfig.length && (
            <Form className={s.Container__menuParams}>
              <FormGroup>
                {paramsConfig.map((param, paramIndex) => {
                  if (param.type === "select") {
                    return (
                      <FormField label={param.label}>
                        <Select
                          value={params}
                          options={param.options}
                          onChange={setParams}
                        />
                      </FormField>
                    );
                  } else if (param.type === "checkbox") {
                    return (
                      <FormField>
                        <Checkbox onChange={() => null}>{param.label}</Checkbox>
                      </FormField>
                    );
                  }
                })}
              </FormGroup>
            </Form>
          )}
          <hr />
          <ContextMenu
            menu={[
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
                icon: <Icon i="table_chart" />,
                title: "Table",
                onClick: () => null,
              },
            ]}
            onClose={closeAddMenu}
          />
        </FloatingBox>
      )}
    </section>
  );
};
