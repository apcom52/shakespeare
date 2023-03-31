import React, { PropsWithChildren } from "react";
import { Button, Icon, Size } from "altrone-ui";
import s from "./Container.module.scss";

export const Container = ({ children }: PropsWithChildren) => {
  return (
    <section className={s.Container}>
      <div className={s.Container__actions}>
        <Button size={Size.small} isIcon>
          <Icon i="add" />
        </Button>
      </div>
      <div className={s.Container__content}>{children}</div>
    </section>
  );
};
