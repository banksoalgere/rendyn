"use client";

import { ArrowRightIcon, DownloadSimpleIcon, ImageIcon } from '@phosphor-icons/react';

import { Button, Group } from '@mantine/core';

function Demo() {
  return (
    <Group justify="center">
      <Button leftSection={<ImageIcon size={14} />} variant="default">
        Gallery
      </Button>

      <Button rightSection={<DownloadSimpleIcon size={14} />}>Download</Button>
      <Button
        variant="light"
        leftSection={<ImageIcon size={14} />}
        rightSection={<ArrowRightIcon size={14} className="mantine-rotate-rtl" />}
      >
        Visit gallery
      </Button>
    </Group>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
