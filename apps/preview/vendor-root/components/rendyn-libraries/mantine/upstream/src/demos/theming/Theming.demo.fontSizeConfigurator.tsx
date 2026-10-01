"use client";

import { Text } from '@mantine/core';

function Wrapper(props: any) {
  return (
    <Text fz={props.fontSize} lh={props.lineHeight}>
      Paras is an orange, insectoid Pokémon that resembles the nymph stage of a cicada. Its ovoid
      body is segmented, and it has three pairs of legs. The foremost pair of legs is the largest
      and has sharp claws at the tips. There are five specks on its forehead and three teeth on
      either side of its mouth. It has circular eyes with large pseudopupils.
    </Text>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent fontSize={"md"} lineHeight={"md"} />; }
