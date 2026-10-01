"use client";

import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <TagsInput
      label="Enter tags"
      placeholder="Enter tags"
      selectFirstOptionOnChange
      data={['Apple', 'Banana', 'Kiwi', 'Mango', 'Watermelon', 'Raspberry', 'Strawberry']}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
