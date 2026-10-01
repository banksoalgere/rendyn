"use client";

import { Text } from '@mantine/core';

import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/dropzone/Dropzone.demo.stylesApi.module.css';

function Demo() {
  return (
    <Dropzone onDrop={() => {}} accept={IMAGE_MIME_TYPE} className={classes.root}>
      <Text ta="center">Drop images here</Text>
    </Dropzone>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
