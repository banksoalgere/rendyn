"use client";

import { useState } from 'react';

import { TagsInput } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState(['first', 'second', 'third']);

  return (
    <TagsInput
      label="Drag pills to reorder"
      description="Tags can be reordered by dragging pills"
      placeholder="Enter tag"
      value={value}
      onChange={setValue}
      withPillsReorder
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
