"use client";

import { MoonIcon, SunIcon } from '@phosphor-icons/react';

import { Rating } from '@mantine/core';

function Demo() {
  return <Rating emptySymbol={<SunIcon size={16} />} fullSymbol={<MoonIcon size={16} />} />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
