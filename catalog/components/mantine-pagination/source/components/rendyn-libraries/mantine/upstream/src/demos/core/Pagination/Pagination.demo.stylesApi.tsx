"use client";

import { Pagination } from '@mantine/core';

function Demo(props: any) {
  return <Pagination total={10} {...props} />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
