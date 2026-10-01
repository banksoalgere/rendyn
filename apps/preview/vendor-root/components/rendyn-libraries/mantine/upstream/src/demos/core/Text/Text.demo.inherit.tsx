"use client";

import { Text, Title } from '@mantine/core';

function Demo() {
  return (
    <Title order={3}>
      Title in which you want to{' '}
      <Text span c="blue" inherit>
        highlight
      </Text>{' '}
      something
    </Title>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
