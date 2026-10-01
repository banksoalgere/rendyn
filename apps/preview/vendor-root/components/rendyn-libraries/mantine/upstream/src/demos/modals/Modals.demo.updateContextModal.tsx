"use client";

import { Button } from '@mantine/core';

import { modals } from '@mantine/modals';

function Demo() {
  return (
    <Button
      onClick={() => {
        const modalId = modals.openContextModal({
          modal: 'asyncDemonstration',
          title: 'Processing...',
          closeOnEscape: false,
          closeOnClickOutside: false,
          closeButtonProps: { disabled: true },
          innerProps: {
            modalBody: 'You cannot close this modal until 2 seconds have passed.',
            loading: true,
          },
        });

        setTimeout(() => {
          modals.updateContextModal({
            modalId,
            title: 'Processing Complete!',
            closeOnEscape: true,
            closeOnClickOutside: true,
            closeButtonProps: { disabled: false },
            innerProps: {
              modalBody: 'You can now close the modal.',
              loading: false,
            },
          });
        }, 2000);
      }}
    >
      Open updating context modal
    </Button>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
