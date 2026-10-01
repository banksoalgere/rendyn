"use client";

import { Box, Slider } from '@mantine/core';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Slider/Slider.demo.customize.module.css';

function Demo() {
  return (
    <Box maw={400} pt={15} pb={20} mx="auto">
      <Slider
        defaultValue={40}
        size={2}
        classNames={classes}
        marks={[
          { value: 20, label: '20%' },
          { value: 50, label: '50%' },
          { value: 80, label: '80%' },
        ]}
      />
    </Box>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
