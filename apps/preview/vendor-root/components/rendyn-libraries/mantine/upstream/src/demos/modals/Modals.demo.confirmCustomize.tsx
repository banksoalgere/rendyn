"use client";

import { Button, Text } from '@mantine/core';

import { modals } from '@mantine/modals';

import { notifications } from '@mantine/notifications';

function Demo() {
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: 'Delete your profile',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete your profile? This action is destructive and you will have
          to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: 'Delete account', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onCancel: () =>
        notifications.show({
          title: 'Canceled',
          message: 'Delete modal was canceled',
          color: 'gray',
        }),
      onConfirm: () =>
        notifications.show({
          title: 'Deleted',
          message: 'Delete modal was confirmed',
          color: 'red',
        }),
    });

  return (
    <Button onClick={openDeleteModal} color="red">
      Delete account
    </Button>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
