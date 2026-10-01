"use client";

import { useState } from 'react';

import { Text } from '@mantine/core';

import { usePageLeave } from '@mantine/hooks';

function Demo() {
  const [leftsCount, setLeftsCount] = useState(0);
  usePageLeave(() => setLeftsCount((p) => p + 1));
  return <Text ta="center">Mouse left the page {leftsCount} times</Text>;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
