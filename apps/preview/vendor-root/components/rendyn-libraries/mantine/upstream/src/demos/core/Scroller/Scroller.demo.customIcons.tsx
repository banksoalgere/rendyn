"use client";

import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react';

import { Badge, Group, Scroller } from '@mantine/core';

function Demo() {
  return (
    <Scroller
      startControlIcon={<ArrowLeftIcon size={16} />}
      endControlIcon={<ArrowRightIcon size={16} />}
    >
      <Group gap="xs" wrap="nowrap">
        {Array.from({ length: 20 }).map((_, index) => (
          <Badge key={index} variant="light" size="lg" miw="fit-content">
            Badge {index + 1}
          </Badge>
        ))}
      </Group>
    </Scroller>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
