"use client";

import { useState } from 'react';

import { Button, Group } from '@mantine/core';

import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';

import { DropzoneDemoChildren } from '@/components/rendyn-libraries/mantine/upstream/src/demos/dropzone/_base';

function Demo() {
  const [active, setActive] = useState(false);

  return (
    <>
      <Group justify="center">
        <Button color={active ? 'red' : 'blue'} onClick={() => setActive((d) => !d)}>
          {active ? 'Deactivate' : 'Activate'} full screen dropzone
        </Button>
      </Group>

      <Dropzone.FullScreen
        active={active}
        accept={IMAGE_MIME_TYPE}
        onDrop={(files) => {
          console.log(files);
          setActive(false);
        }}
      >
        <DropzoneDemoChildren />
      </Dropzone.FullScreen>
    </>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
