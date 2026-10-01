"use client";

import { Input } from '@mantine/core';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/styles/Styles.demo.customVariant.module.css';

function Demo() {
  return (
    <>
      <Input classNames={classes} variant="underline" placeholder="Underline input" />
      <Input classNames={classes} variant="filled" placeholder="Filled input" mt="md" />
    </>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
