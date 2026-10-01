"use client";

import { CheckIcon } from '@phosphor-icons/react';

import { Button } from '@mantine/core';

import { notifications } from '@mantine/notifications';

function Demo() {
  return (
    <Button
      onClick={() => {
        const id = notifications.show({
          loading: true,
          title: 'Loading your data',
          message: 'Data will be loaded in 3 seconds, you cannot close this yet',
          autoClose: false,
          allowClose: false,
        });

        setTimeout(() => {
          notifications.update({
            id,
            color: 'teal',
            title: 'Data was loaded',
            message: 'Notification will close in 2 seconds, you can close this notification now',
            icon: <CheckIcon size={18} />,
            loading: false,
            autoClose: 2000,
            allowClose: true,
          });
        }, 3000);
      }}
    >
      Show update notification
    </Button>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
