"use client";

import { HeartIcon } from '@phosphor-icons/react';

import { Alert } from '@mantine/core';

function Demo(props: any) {
  return (
    <Alert title="Alert title" icon={<HeartIcon />} withCloseButton {...props}>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt corporis natus veniam quis
      cupiditate enim architecto mollitia numquam temporibus, consectetur nam laboriosam voluptates
      nemo facilis? Exercitationem aut praesentium quibusdam reiciendis.
    </Alert>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
