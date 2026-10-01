"use client";

import {
  ArrowLeftIcon,
  ArrowLineLeftIcon,
  ArrowLineRightIcon,
  ArrowRightIcon,
  DotsSixIcon,
} from '@phosphor-icons/react';

import { Group, Pagination } from '@mantine/core';

function Demo() {
  return (
    <>
      {/* Regular pagination */}
      <Pagination
        total={10}
        withEdges
        nextIcon={ArrowRightIcon}
        previousIcon={ArrowLeftIcon}
        firstIcon={ArrowLineLeftIcon}
        lastIcon={ArrowLineRightIcon}
        dotsIcon={DotsSixIcon}
      />

      {/* Compound pagination */}
      <Pagination.Root total={10}>
        <Group gap={7} mt="xl">
          <Pagination.First icon={ArrowLineLeftIcon} />
          <Pagination.Previous icon={ArrowLeftIcon} />
          <Pagination.Items dotsIcon={DotsSixIcon} />
          <Pagination.Next icon={ArrowRightIcon} />
          <Pagination.Last icon={ArrowLineRightIcon} />
        </Group>
      </Pagination.Root>
    </>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
