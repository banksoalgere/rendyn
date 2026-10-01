"use client";

import { Text } from '@mantine/core';

import { useDocumentTitle, useDocumentVisibility } from '@mantine/hooks';

function Demo() {
  const documentState = useDocumentVisibility();
  useDocumentTitle(`Document is ${documentState}`);
  return <Text>Switch to another tab to see document title change</Text>;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
