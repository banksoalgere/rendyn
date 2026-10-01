"use client";

import Fuse from 'fuse.js';

import { ComboboxItem, OptionsFilter, TagsInput } from '@mantine/core';

const optionsFilter: OptionsFilter = ({ options, search }) => {
  if (!search.trim()) {
    return options;
  }

  const fuse = new Fuse(options as ComboboxItem[], {
    keys: ['label'],
    threshold: 0.3,
    minMatchCharLength: 1,
  });

  return fuse.search(search).map((result) => result.item);
};

function Demo() {
  return (
    <TagsInput
      label="Favorite fruits"
      placeholder="Pick value or enter anything"
      data={['Apple', 'Banana', 'Kiwi', 'Mango', 'Watermelon', 'Raspberry']}
      filter={optionsFilter}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
