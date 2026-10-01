"use client";

import { PasswordInput, Stack, TextInput } from '@mantine/core';

function Demo() {
  return (
    <Stack>
      <TextInput label="Email" placeholder="your@email.com" />
      <PasswordInput label="Password" defaultValue="secret" visibilityToggleFocusable />
      <TextInput label="Nickname" placeholder="Your nickname" />
    </Stack>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
