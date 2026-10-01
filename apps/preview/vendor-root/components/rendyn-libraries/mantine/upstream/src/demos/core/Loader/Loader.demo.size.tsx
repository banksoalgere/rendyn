"use client";

import { Loader } from '@mantine/core';

function Wrapper(props: any) {
  return <Loader {...props} />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent size={30} />; }
