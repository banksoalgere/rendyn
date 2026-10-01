"use client";

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/styles/Styles.demo.responsive.module.css';

function Demo() {
  return <div className={classes.demo}>Demo</div>;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
