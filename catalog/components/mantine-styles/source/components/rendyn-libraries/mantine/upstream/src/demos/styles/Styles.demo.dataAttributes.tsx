"use client";

import { ArrowRightIcon } from '@phosphor-icons/react';

import { Button, ButtonProps, Group } from '@mantine/core';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/styles/Styles.demo.dataAttributes.module.css';

function SendFilesButton(props: ButtonProps & React.ComponentProps<'button'>) {
  return <Button {...props} classNames={classes} />;
}

function Demo() {
  return (
    <Group>
      <SendFilesButton leftSection="12" rightSection={<ArrowRightIcon size={18} />}>
        Send files
      </SendFilesButton>
      <SendFilesButton leftSection="3" rightSection={<ArrowRightIcon size={18} />} disabled>
        Send files
      </SendFilesButton>
    </Group>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
