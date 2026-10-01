"use client";

import { MagnifyingGlassIcon } from '@phosphor-icons/react';

import { EmptyState } from '@mantine/core';

function Wrapper(props: any) {
  return (
    <EmptyState
      icon={<MagnifyingGlassIcon />}
      title="No results found"
      description="We couldn't find anything matching your search. Try adjusting your filters or searching with different keywords to see more results."
      {...props}
    />
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent variant={"light"} color={"blue"} />; }
