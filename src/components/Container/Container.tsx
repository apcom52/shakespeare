import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
} from "react";
import s from "./Container.module.scss";
import { BlockData, Widget } from "../../interfaces/Widget";
import clsx from "clsx";
import { ContainerMenu } from "./ContainerMenu";
import { useEditModeContext } from "../../contexts/EditModeContext";

interface ContainerProps<D extends BlockData, P> {
  containerPosition: number;
  widget: Widget<D>;
  data: D;
  onChangeData: (newData: Record<string, unknown>) => void;
}

export const Container = <D extends BlockData, P>({
  containerPosition,
  widget,
  data,
  onChangeData,
}: PropsWithChildren<ContainerProps<D, P>>) => {
  const isEditMode = useEditModeContext();

  // apply default values
  useEffect(() => {
    for (const param of widget.params) {
      if (data[param.name] === undefined && param.defaultValue) {
        changeData(param.name, param.defaultValue);
      }
    }
  }, []);

  const changeData = useCallback(
    (field: keyof D, value: unknown) => {
      const newData = {
        ...data,
        [field]: value,
      };

      onChangeData(newData);
    },
    [onChangeData]
  );

  const { params: paramsConfig = [] } = widget;

  if (!isEditMode) {
    return widget.render(data);
  }

  return (
    <section className={s.Container}>
      <ContainerMenu<D>
        data={data}
        widget={widget}
        containerPosition={containerPosition}
        params={widget.params}
        changeData={changeData}
      />
      <div className={clsx(s.Container__content)}>
        {widget.editMode({
          data,
          changeData,
        })}
      </div>
      {isEditMode && <div className={s.Container__name}>{widget.name}</div>}
    </section>
  );
};
