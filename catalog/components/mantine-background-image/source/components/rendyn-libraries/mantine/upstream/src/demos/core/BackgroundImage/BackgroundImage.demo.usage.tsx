"use client";

import { BackgroundImage, BackgroundImageProps, Box, Center, Text } from '@mantine/core';

function Wrapper(props: BackgroundImageProps) {
  return (
    <Box maw={300} mx="auto">
      <BackgroundImage
        {...props}
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-6.png"
      >
        <Center p="md">
          <Text c="white">
            BackgroundImage component can be used to add any content on image. It is useful for hero
            headers and other similar sections
          </Text>
        </Center>
      </BackgroundImage>
    </Box>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent radius={"md"} />; }
