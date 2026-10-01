"use client";

import { useEffect } from 'react';

import { Slider } from '@mantine/core';

function Demo() {
  useEffect(
    () => () => {
      document.documentElement.style.fontSize = '100%';
    },
    []
  );

  return (
    <Slider
      defaultValue={100}
      min={70}
      max={130}
      onChange={(value) => {
        document.documentElement.style.fontSize = `${value}%`;
      }}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
