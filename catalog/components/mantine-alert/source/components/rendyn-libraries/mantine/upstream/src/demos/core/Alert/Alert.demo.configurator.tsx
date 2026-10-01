"use client";

import { InfoIcon } from '@phosphor-icons/react';

import { Alert } from '@mantine/core';

function Wrapper(props: any) {
  return <Alert icon={<InfoIcon />} {...props} />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent color={"blue"} radius={"md"} withCloseButton={false} title={"Alert title"} children={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. AtIcon officiis, quae tempore necessitatibus placeat saepe."} />; }
