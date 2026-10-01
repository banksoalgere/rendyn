"use client";

import { Button, Text } from '@mantine/core';

import { modals } from '@mantine/modals';

function Demo() {
  return (
    <Button
      onClick={() => {
        const modalId = modals.open({
          title: 'Initial Modal Title',
          children: <Text size="sm">This text will update after 2 seconds.</Text>,
        });

        setTimeout(() => {
          modals.updateModal({
            modalId,
            title: 'Updated Modal Title',
            children: <Text size="sm">This is the updated content of the modal.</Text>,
          });
        }, 2000);
      }}
    >
      Open updating modal
    </Button>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
