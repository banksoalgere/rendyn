"use client";

import { useState } from 'react';

import { Button } from '@mantine/core';

import { randomId, useDocumentTitle } from '@mantine/hooks';

function Demo() {
  const [title, setTitle] = useState('');
  useDocumentTitle(title);

  return <Button onClick={() => setTitle(randomId())}>Set document title to random id</Button>;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
