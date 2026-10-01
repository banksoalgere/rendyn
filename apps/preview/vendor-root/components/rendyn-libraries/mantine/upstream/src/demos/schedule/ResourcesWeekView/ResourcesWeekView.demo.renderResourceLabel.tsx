"use client";

import dayjs from 'dayjs';

import { useState } from 'react';

import { Stack, Text } from '@mantine/core';

import { ResourcesWeekView } from '@mantine/schedule';

import { dataCode, resourceEvents, resources } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/ResourcesWeekView/_data';

function Demo() {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));

  return (
    <ResourcesWeekView
      date={date}
      onDateChange={setDate}
      resources={resources}
      events={resourceEvents}
      startTime="08:00:00"
      endTime="18:00:00"
      startScrollDateTime={`${dayjs().format('YYYY-MM-DD')} 08:00:00`}
      renderResourceLabel={(resource) => (
        <Stack gap={2} align="flex-start">
          <Text size="sm" fw={600}>
            {resource.label}
          </Text>
          <Text size="xs" c="dimmed">
            Floor 2
          </Text>
        </Stack>
      )}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
