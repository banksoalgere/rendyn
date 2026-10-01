"use client";

import { useState } from 'react';

import { Box } from '@mantine/core';

import { useRadialMove } from '@mantine/hooks';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/hooks/use-radial-move/use-radial-move.demo.usage.module.css';

function Demo() {
  const [value, setValue] = useState(115);
  const { ref } = useRadialMove(setValue);

  return (
    <Box className={classes.root} ref={ref} style={{ '--angle': `${value}deg` }}>
      <div className={classes.value}>{value}°</div>
      <div className={classes.thumb} />
    </Box>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
