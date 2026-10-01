"use client";

import { JsonInput } from '@mantine/core';

function Demo() {
  return (
    <JsonInput
      maw={400}
      mx="auto"
      label="Your package.json"
      placeholder="Textarea will autosize to fit the content"
      validationError="Invalid JSON"
      formatOnBlur
      autosize
      minRows={4}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
