"use client";

import { TimeInput } from '@mantine/dates';

function Wrapper(props: any) {
  return <TimeInput {...props} />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent  />; }
