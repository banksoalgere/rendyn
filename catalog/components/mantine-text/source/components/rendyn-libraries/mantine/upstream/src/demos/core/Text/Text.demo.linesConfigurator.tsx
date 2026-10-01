"use client";

import { Box, Text, TextProps } from '@mantine/core';

function Wrapper(props: TextProps) {
  return (
    <Box maw={400} mx="auto">
      <Text {...props}>
        From Bulbapedia: Bulbasaur is a small, quadrupedal Pokémon that has blue-green skin with
        darker patches. It has red eyes with white pupils, pointed, ear-like structures on top of
        its head, and a short, blunt snout with a wide mouth. A pair of small, pointed teeth are
        visible in the upper jaw when its mouth is open. Each of its thick legs ends with three
        sharp claws. On Bulbasaur&apos;s back is a green plant bulb, which is grown from a seed
        planted there at birth. The bulb also conceals two slender, tentacle-like vines and provides
        it with energy through photosynthesis as well as from the nutrient-rich seeds contained
        within.
      </Text>
    </Box>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent size={"md"} lineClamp={4} />; }
