"use client";

import { InfoIcon } from '@phosphor-icons/react';

import { Blockquote } from '@mantine/core';

function Wrapper(props: any) {
  const icon = <InfoIcon />;
  return (
    <Blockquote cite="– Forrest Gump" icon={icon} mt="xl" {...props}>
      Life is like an npm install – you never know what you are going to get.
    </Blockquote>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent color={"blue"} radius={"md"} iconSize={38} />; }
