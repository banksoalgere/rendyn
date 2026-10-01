"use client";

import { MultiSelect } from '@mantine/core';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/MultiSelect/MultiSelect.demo.dropdownOffset.module.css';

function Demo() {
  return (
    <MultiSelect
      label="Your favorite library"
      placeholder="Pick values"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      classNames={classes}
      comboboxProps={{ position: 'bottom', middlewares: { flip: false, shift: false }, offset: 0 }}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
