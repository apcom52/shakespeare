import React, { PropsWithChildren } from "react";
import { Button, Icon } from "altrone-ui";

export const Container = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Button>
        <Icon i="add" />
      </Button>
      {children}
    </div>
  );
};
