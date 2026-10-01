"use client";

import { MagnifyingGlassIcon } from '@phosphor-icons/react';

import { Button, EmptyState } from '@mantine/core';

function Wrapper(props: any) {
  return (
    <EmptyState
      icon={<MagnifyingGlassIcon />}
      title="No results found"
      description="We couldn't find anything matching your search. Try adjusting your filters or searching with different keywords to see more results."
      {...props}
    >
      <EmptyState.Actions>
        <Button variant="default">Reset filters</Button>
      </EmptyState.Actions>
    </EmptyState>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent size={"md"} align={"center"} withIndicatorBackground={false} />; }
