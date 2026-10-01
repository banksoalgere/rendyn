"use client";

import { useRef } from 'react';

import { Button, Group } from '@mantine/core';

import { BaseDemo } from '@/components/rendyn-libraries/mantine/upstream/src/demos/dropzone/_base';

function Demo() {
  const openRef = useRef<() => void>(null);

  return (
    <>
      <BaseDemo openRef={openRef} />
      <Group justify="center" mt="md">
        <Button onClick={() => openRef.current?.()}>Select files</Button>
      </Group>
    </>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
