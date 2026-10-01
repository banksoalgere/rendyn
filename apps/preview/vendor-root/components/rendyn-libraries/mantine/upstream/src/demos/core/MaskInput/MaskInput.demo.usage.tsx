"use client";

import { MaskInput } from '@mantine/core';

function Wrapper(props: any) {
  return <MaskInput {...props} mask="(999) 999-9999" placeholder="(___) ___-____" />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent  />; }
