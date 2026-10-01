"use client";

import { Button, Text } from '@mantine/core';

import { modals } from '@mantine/modals';

import { notifications } from '@mantine/notifications';

function Demo() {
  const openModal = () =>
    modals.openConfirmModal({
      modalId: 'test-id',
      title: 'Please confirm your action',
      children: (
        <Text size="sm">
          This action is so important that you are required to confirm it with a modal. Please click
          one of these buttons to proceed.
        </Text>
      ),
      onCancel: () =>
        notifications.show({
          title: 'Canceled',
          message: 'Confirm modal was canceled',
          color: 'gray',
        }),
      onConfirm: () =>
        notifications.show({
          title: 'Confirmed',
          message: 'Confirm modal was confirmed',
          color: 'teal',
        }),
    });

  return <Button onClick={openModal}>Open confirm modal</Button>;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
