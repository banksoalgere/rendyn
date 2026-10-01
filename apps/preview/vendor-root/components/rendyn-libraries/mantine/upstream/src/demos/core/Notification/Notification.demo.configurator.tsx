"use client";

import { Box, Notification, NotificationProps } from '@mantine/core';

function Wrapper(props: NotificationProps) {
  return (
    <Box maw={400} mx="auto">
      <Notification onClose={() => {}} {...props} />
    </Box>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent loading={false} withCloseButton={true} withBorder={false} color={"blue"} radius={"md"} title={"We notify you that"} children={"You are now obligated to give a star to Mantine project on GitHub"} />; }
