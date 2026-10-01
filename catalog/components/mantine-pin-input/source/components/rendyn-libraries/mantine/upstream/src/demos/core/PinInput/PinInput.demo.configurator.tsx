"use client";

import { PinInput, PinInputProps } from '@mantine/core';

function Wrapper(props: PinInputProps) {
  return <PinInput {...props} />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent size={"sm"} length={4} mask={false} placeholder={"○"} disabled={false} error={false} type={"alphanumeric"} />; }
