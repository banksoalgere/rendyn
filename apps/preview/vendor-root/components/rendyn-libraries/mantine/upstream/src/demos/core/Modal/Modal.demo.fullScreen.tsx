"use client";

import { Button, Modal, Text } from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';

import { AuthenticationForm } from '@/components/rendyn-libraries/mantine/upstream/src/shared/AuthenticationForm/AuthenticationForm';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="This is a fullscreen modal"
        fullScreen
        radius={0}
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        <Text mb="xl">
          It takes the entire screen and does not have overlay and border-radius, you can use it
          small screens to save up some space. It also has fade transition by default, but you can
          change that with transition prop. Now here is an authentication form used in previous
          examples to see the difference.
        </Text>
        <AuthenticationForm noPadding noShadow />
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
