"use client";

import { Switch } from '@mantine/core';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Switch/Switch.demo.styles.module.css';

function Demo() {
  return <Switch classNames={classes} size="lg" />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
