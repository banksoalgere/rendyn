"use client";

import {
  Button,
  DEFAULT_THEME,
  MantineThemeProvider,
  parseThemeColor,
  Stack,
  useMantineTheme,
} from '@mantine/core';

function Wrapper(props: any) {
  const theme = useMantineTheme();

  const buttons = Array(10)
    .fill(0)
    .map((_, index) => (
      <Button
        key={index}
        color={
          parseThemeColor({ theme, color: props.color }).isThemeColor
            ? `${props.color}.${index}`
            : props.color
        }
      >
        Button
      </Button>
    ));

  return (
    <MantineThemeProvider
      inherit
      theme={{
        autoContrast: true,
        luminanceThreshold: props.luminanceThreshold,
      }}
    >
      <Stack>{buttons}</Stack>
    </MantineThemeProvider>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent color={"blue"} luminanceThreshold={0.3} />; }
