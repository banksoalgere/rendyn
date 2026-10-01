"use client";

import { Button } from '@mantine/core';

import { notifications } from '@mantine/notifications';

function Demo() {
  return (
    <Button
      onClick={() => {
        Array(10)
          .fill(0)
          .forEach((_, index) => {
            setTimeout(() => {
              notifications.show({
                title: `Notification ${index + 1}`,
                message: 'Most notifications are added to queue',
              });
            }, 200 * index);
          });
      }}
    >
      Show 10 notifications
    </Button>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
