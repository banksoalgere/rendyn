"use client";

import { ClockIcon } from '@phosphor-icons/react';

import { TimeInput } from '@mantine/dates';

function Demo() {
  return <TimeInput leftSection={<ClockIcon size={16} />} />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
