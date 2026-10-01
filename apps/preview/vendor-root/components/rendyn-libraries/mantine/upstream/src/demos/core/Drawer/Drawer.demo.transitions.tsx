"use client";

import { Button, Drawer } from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';

import { AuthenticationForm } from '@/components/rendyn-libraries/mantine/upstream/src/shared/AuthenticationForm/AuthenticationForm';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="Authentication"
        transitionProps={{ transition: 'rotate-left', duration: 150, timingFunction: 'linear' }}
      >
        <AuthenticationForm noShadow noPadding />
      </Drawer>

      <Button variant="default" onClick={open}>
        Open Drawer
      </Button>
    </>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
