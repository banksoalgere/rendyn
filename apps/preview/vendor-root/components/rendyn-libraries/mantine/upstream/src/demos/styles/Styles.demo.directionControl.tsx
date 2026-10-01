"use client";

import { useEffect } from 'react';

import { TextAlignLeftIcon, TextAlignRightIcon } from '@phosphor-icons/react';

import { ActionIcon, useDirection } from '@mantine/core';

function Demo() {
  const { toggleDirection, dir, setDirection } = useDirection();
  useEffect(() => () => setDirection('ltr'), []);

  return (
    <ActionIcon onClick={() => toggleDirection()} variant="default" size="lg">
      {dir === 'rtl' ? <TextAlignLeftIcon /> : <TextAlignRightIcon />}
    </ActionIcon>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
