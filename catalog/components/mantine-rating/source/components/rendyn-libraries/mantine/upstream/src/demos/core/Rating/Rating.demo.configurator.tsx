"use client";

import { Rating, RatingProps } from '@mantine/core';

function Wrapper(props: RatingProps) {
  return <Rating defaultValue={2} {...props} />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent color={"yellow"} size={"md"} count={5} highlightSelectedOnly={false} />; }
