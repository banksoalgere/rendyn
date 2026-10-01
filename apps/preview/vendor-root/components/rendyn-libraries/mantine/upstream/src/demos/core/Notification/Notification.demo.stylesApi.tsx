"use client";

import { CheckIcon } from '@phosphor-icons/react';

import { Box, Notification } from '@mantine/core';

function Demo(props: any) {
  return (
    <Box maw={400} mx="auto">
      <Notification title="Please wait" loading withCloseButton={false} {...props}>
        The application is trying to reconnect to the server
      </Notification>
      <Notification mt="md" icon={<CheckIcon size={18} />} title="We notify you that" {...props}>
        You are now obligated to give a star to Mantine project on GitHub
      </Notification>
    </Box>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
