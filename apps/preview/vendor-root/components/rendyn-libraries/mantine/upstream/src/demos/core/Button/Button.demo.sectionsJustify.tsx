"use client";

import { ImageIcon } from '@phosphor-icons/react';

import { Button } from '@mantine/core';

function Wrapper(props: any) {
  const icon = <ImageIcon size={14} />;
  return (
    <>
      <Button fullWidth leftSection={icon} rightSection={icon} variant="default" {...props}>
        Button label
      </Button>

      <Button fullWidth leftSection={icon} variant="default" mt="md" {...props}>
        Button label
      </Button>

      <Button fullWidth rightSection={icon} variant="default" mt="md" {...props}>
        Button label
      </Button>

      <Button
        fullWidth
        rightSection={icon}
        leftSection={<span />}
        variant="default"
        mt="md"
        {...props}
      >
        Button label
      </Button>
    </>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent justify={"center"} />; }
