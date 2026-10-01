"use client";

import { XCircleIcon } from '@phosphor-icons/react';

import { CloseButton } from '@mantine/core';

function Demo() {
  return <CloseButton icon={<XCircleIcon size={18} />} />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
