"use client";

import { useState } from 'react';

import { Text, TextInput } from '@mantine/core';

import { useThrottledCallback } from '@mantine/hooks';

function Demo() {
  const [throttledValue, setValue] = useState('');
  const throttledSetValue = useThrottledCallback((value) => setValue(value), 1000);

  return (
    <>
      <TextInput
        placeholder="Search"
        onChange={(event) => throttledSetValue(event.currentTarget.value)}
      />
      <Text>Throttled value: {throttledValue || '–'}</Text>
    </>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
