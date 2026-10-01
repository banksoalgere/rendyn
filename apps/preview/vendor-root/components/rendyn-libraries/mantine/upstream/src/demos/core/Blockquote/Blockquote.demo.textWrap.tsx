"use client";

import { InfoIcon } from '@phosphor-icons/react';

import { Blockquote } from '@mantine/core';

function Wrapper(props: any) {
  const icon = <InfoIcon />;
  return (
    <Blockquote icon={icon} cite="– Forrest Gump" {...props}>
      Life is like a box of chocolates. You never know what you are gonna get. But whatever you get,
      you should make the most of it and enjoy every moment.
    </Blockquote>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent textWrap={"wrap"} />; }
