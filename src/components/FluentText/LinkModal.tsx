import React, { useState } from "react";
import {
  Form,
  FormField,
  FormGroup,
  Icon,
  Modal,
  Role,
  Size,
  TextInput,
} from "altrone-ui";

interface LinkModalProps {
  onClose: () => void;
  onSubmit: (name: string, link: string) => void;
}

export const LinkModal = ({ onClose, onSubmit }: LinkModalProps) => {
  const [linkName, setLinkName] = useState("");
  const [linkHref, setLinkHref] = useState("");

  return (
    <Modal
      size={Size.small}
      onClose={onClose}
      title="Ссылка"
      actions={[
        {
          label: "Добавить",
          role: Role.success,
          onClick: () => onSubmit(linkName, linkHref),
        },
      ]}
    >
      <Form>
        <FormGroup>
          <FormField label="Описание ссылки">
            <TextInput value={linkName} onChange={setLinkName} />
          </FormField>
          <FormField label="Ссылка">
            <TextInput
              leftIcon={<Icon i="link" />}
              value={linkHref}
              onChange={setLinkHref}
            />
          </FormField>
        </FormGroup>
      </Form>
    </Modal>
  );
};
