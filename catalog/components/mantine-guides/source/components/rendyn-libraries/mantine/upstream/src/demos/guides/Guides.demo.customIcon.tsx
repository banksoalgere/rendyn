"use client";

import { Button } from '@mantine/core';

import { AddressBookIcon } from '@/components/rendyn-libraries/mantine/upstream/src/demos/guides/_CustomIcon';

function Demo() {
  return <Button leftSection={<AddressBookIcon size={18} />}>Demo</Button>;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
