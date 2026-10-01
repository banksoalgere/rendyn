"use client";

import { ColorPicker } from '@mantine/core';

function Demo(props: any) {
  return (
    <ColorPicker
      size="lg"
      format="rgba"
      swatches={['#25262b', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5']}
      {...props}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
