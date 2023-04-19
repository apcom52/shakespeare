import { Button, ButtonVariant, Icon, Role, Size } from "altrone-ui";
import React, { useEffect } from "react";

interface FluentTextCommandProps {
  icon: string;
  command: string;
  title: string;
  args?: any;
  hotkey?: string;
  inFocus?: boolean;
  checked?: boolean;
}

export const FluentTextCommand = ({
  icon,
  command,
  title,
  args,
  hotkey,
  inFocus,
  checked = false,
}: FluentTextCommandProps) => {
  const onClick = () => {
    document.execCommand(command, false, args);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    console.log(e.key);
    if (hotkey && (e.ctrlKey || e.metaKey) && e.key === hotkey) {
      e.preventDefault();
      onClick();
    }
  };

  useEffect(() => {
    if (inFocus) {
      document.addEventListener("keydown", onKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [inFocus]);

  return (
    <Button
      variant={ButtonVariant.transparent}
      size={Size.small}
      role={checked ? Role.primary : Role.default}
      title={title}
      onClick={onClick}
      isIcon
    >
      <Icon i={icon} />
    </Button>
  );
};
