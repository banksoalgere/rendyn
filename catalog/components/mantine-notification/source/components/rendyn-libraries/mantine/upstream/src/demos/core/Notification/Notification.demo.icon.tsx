"use client";

import { CheckIcon, XIcon } from '@phosphor-icons/react';

import { Notification } from '@mantine/core';

function Demo() {
  const xIcon = <XIcon size={20} />;
  const checkIcon = <CheckIcon size={20} />;

  return (
    <>
      <Notification icon={xIcon} color="red" title="Bummer!">
        Something went wrong
      </Notification>
      <Notification icon={checkIcon} color="teal" title="All good!" mt="md">
        Everything is fine
      </Notification>
    </>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
