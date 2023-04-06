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
import clsx from "clsx";
import React, { useCallback, useRef, useState } from "react";
import { useShakespeareActions } from "../../contexts/ShakespeareActionsContext";
import { BlockData, Widget } from "../../interfaces/Widget";
import { WidgetParameters } from "../../interfaces/Params";

interface ContainerMenuProps<D extends BlockData, P> {
  containerPosition: number;
  widget: Widget<D, P>;
  params: P;
  changeParam: (field: keyof P, value: unknown) => void;
  paramsConfig: WidgetParameters[];
}

export const ContainerMenu = <D extends BlockData, P>({
  widget,
  containerPosition,
  paramsConfig,
  params,
}: ContainerMenuProps<D, P>) => {
  const { addWidget } = useShakespeareActions();

  const addButtonRef = useRef<HTMLButtonElement>(null);

  const [isAddMenuVisible, setIsAddMenuVisible] = useState(false);

  const closeAddMenu = useCallback(() => {
    setIsAddMenuVisible(false);
  }, []);

  return (
    <div
      className={clsx(s.Container__actions, {
        [s.Container__actions_selected]: isAddMenuVisible,
      })}
    >
      <Button
        size={Size.small}
        isIcon
        ref={addButtonRef}
        onClick={() => setIsAddMenuVisible(!isAddMenuVisible)}
      >
        <Icon i="add" />
      </Button>
      {isAddMenuVisible && (
        <FloatingBox
          targetElement={addButtonRef.current}
          onClose={closeAddMenu}
          className={s.Container__menu}
          placement="bottom"
          useRootContainer
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
          {paramsConfig.length > 0 && (
            <>
              <Form className={s.Container__menuParams}>
                <FormGroup>
                  {paramsConfig.map((param, paramIndex) => {
                    if (param.type === "select") {
                      return (
                        <FormField key={paramIndex} label={param.label}>
                          <Select
                            value={params[param.name]}
                            options={param.options}
                            // @ts-ignore
                            onChange={(value) => changeParam(param.name, value)}
                          />
                        </FormField>
                      );
                    } else if (param.type === "checkbox") {
                      return (
                        <FormField key={paramIndex}>
                          <Checkbox onChange={() => null}>
                            {param.label}
                          </Checkbox>
                        </FormField>
                      );
                    }
                  })}
                </FormGroup>
              </Form>
              <hr />
            </>
          )}
          <ContextMenu
            menu={[
              {
                icon: <Icon i="title" />,
                title: "Текст",
                onClick: () => null,
              },
              {
                icon: <Icon i="text_format" />,
                title: "Заголовок",
                onClick: () => addWidget(containerPosition + 1, "heading"),
              },
              {
                icon: <Icon i="remove" />,
                title: "Разделитель",
                onClick: () => addWidget(containerPosition + 1, "divider"),
              },
              {
                icon: <Icon i="format_list_bulleted" />,
                title: "Маркированный список",
                onClick: () => null,
              },
              {
                icon: <Icon i="format_list_numbered" />,
                title: "Нумерованный список",
                onClick: () => null,
              },
              {
                icon: <Icon i="table_chart" />,
                title: "Таблица",
                onClick: () => null,
              },
            ]}
            onClose={closeAddMenu}
          />
        </FloatingBox>
      )}
    </div>
  );
};
