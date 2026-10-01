"use client";

import { Pill, TagsInput } from '@mantine/core';

function Demo() {
  return (
    <TagsInput
      label="Custom pills"
      description="Tags are rendered with a star prefix"
      placeholder="Enter tag"
      defaultValue={['React', 'Angular']}
      renderPill={({ value, onRemove }) => (
        <Pill withRemoveButton onRemove={onRemove}>
          ★ {value}
        </Pill>
      )}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
