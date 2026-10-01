"use client";

import { List } from '@mantine/core';

function Demo() {
  return (
    <List type="ordered" start={5}>
      <List.Item>This is item #5</List.Item>
      <List.Item>This is item #6</List.Item>
      <List.Item>This is item #7</List.Item>
      <List.Item>This is item #8</List.Item>
    </List>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
