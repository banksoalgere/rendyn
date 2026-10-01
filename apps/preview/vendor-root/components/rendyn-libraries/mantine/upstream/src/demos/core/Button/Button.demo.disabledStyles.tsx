"use client";

import { Button } from '@mantine/core';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Button/Button.demo.disabledStyles.module.css';

function Demo() {
  return (
    <Button className={classes.button} disabled>
      Disabled with styles
    </Button>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
