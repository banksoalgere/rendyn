"use client";

import { Rating } from '@mantine/core';

function Demo() {
  return <Rating value={3.5} fractions={2} readOnly />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
