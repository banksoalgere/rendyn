"use client";

import { ImageIcon } from '@phosphor-icons/react';

import { ThemeIcon, ThemeIconProps } from '@mantine/core';

function Wrapper(props: ThemeIconProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <ThemeIcon {...props}>
        <ImageIcon style={{ width: '70%', height: '70%' }} />
      </ThemeIcon>
    </div>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent variant={"filled"} radius={"md"} size={"md"} color={"blue"} />; }
