"use client";

import { Box } from '@mantine/core';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/styles/Styles.demo.className.module.css';

function Demo() {
  return (
    <Box className={classes.box}>
      Box component with <span className={classes.highlight}>some styles</span>
    </Box>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
