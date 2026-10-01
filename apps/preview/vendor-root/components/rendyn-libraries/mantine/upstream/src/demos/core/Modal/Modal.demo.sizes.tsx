"use client";

import { useState } from 'react';

import { Button, Group, Modal } from '@mantine/core';

import { AuthenticationForm } from '@/components/rendyn-libraries/mantine/upstream/src/shared/AuthenticationForm/AuthenticationForm';

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '55rem', '70%', '100%'];

function Demo() {
  const [opened, setOpened] = useState(false);
  const [size, setSize] = useState<string | number>('md');

  const buttons = SIZES.map((s) => (
    <Button
      key={s}
      variant="default"
      onClick={() => {
        setSize(s);
        setOpened(true);
      }}
    >
      {s}
    </Button>
  ));

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
        size={size}
      >
        <AuthenticationForm noPadding noShadow />
      </Modal>

      <Group justify="center">{buttons}</Group>
    </>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
