"use client";

import { BaseDemo } from '@/components/rendyn-libraries/mantine/upstream/src/demos/dropzone/_base';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/dropzone/Dropzone.disabled.module.css';

function Demo() {
  return <BaseDemo disabled className={classes.disabled} />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
