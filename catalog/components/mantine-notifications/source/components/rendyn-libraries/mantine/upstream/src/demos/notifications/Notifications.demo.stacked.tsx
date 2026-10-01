"use client";

import { Button, Group } from '@mantine/core';

import {
  createNotificationsStore,
  Notifications,
  notifications as notificationsApi,
} from '@mantine/notifications';

const store = createNotificationsStore();

function Demo() {
  return (
    <>
      <Notifications store={store} layout="stacked" position="bottom-right" />
      <Group justify="center">
        <Button
          onClick={() => {
            notificationsApi.show(
              {
                title: 'New notification',
                message: 'This notification is part of a stacked layout',
              },
              store
            );
          }}
        >
          Show stacked notification
        </Button>
      </Group>
    </>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
