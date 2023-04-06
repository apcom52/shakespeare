import React, { PropsWithChildren, useCallback, useRef, useState } from "react";
import s from "./Container.module.scss";
import { BlockData, Widget } from "../../interfaces/Widget";
import clsx from "clsx";
import { ContainerMenu } from "./ContainerMenu";

interface ContainerProps<D extends BlockData, P> {
  containerPosition: number;
  widget: Widget<D, P>;
}

export const Container = <D extends BlockData, P>({
  containerPosition,
  widget,
}: PropsWithChildren<ContainerProps<D, P>>) => {
  const [data, setData] = useState<D>({} as D);

  const changeData = useCallback((field: keyof D, value: unknown) => {
    setData((oldData) => ({
      ...oldData,
      [field]: value,
    }));
  }, []);

  const { params: paramsConfig = [] } = widget;
  const [params, setParams] = useState<P>(() => {
    const result = {};
    for (const param of widget.params) {
      result[param.name] = param.defaultValue;
    }

    return result as P;
  });

  const changeParam = useCallback((field: keyof P, value: unknown) => {
    setParams((oldParams) => ({
      ...oldParams,
      [field]: value,
    }));
  }, []);

  return (
    <section className={s.Container}>
      <ContainerMenu<D, P>
        widget={widget}
        containerPosition={containerPosition}
        params={params}
        changeParam={changeParam}
        paramsConfig={paramsConfig}
      />
      <div className={clsx(s.Container__content)}>
        {widget.editMode({
          data,
          params,
          changeData,
          changeParam,
        })}
      </div>
      <div className={s.Container__name}>{widget.name}</div>
    </section>
  );
};
