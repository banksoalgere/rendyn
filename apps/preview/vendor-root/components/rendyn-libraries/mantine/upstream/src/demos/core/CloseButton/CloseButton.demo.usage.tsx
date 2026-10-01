"use client";

import { CloseButton } from '@mantine/core';

function Wrapper(props: any) {
  return <CloseButton {...props} />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent size={"md"} variant={"subtle"} />; }
