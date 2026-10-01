"use client";

import dayjs from 'dayjs';

import { useState } from 'react';

import { Button, Group, Text } from '@mantine/core';

import { WeekView } from '@mantine/schedule';

import { dataCode, regularEvents } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/WeekView/_data';

function Demo() {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const weekStart = dayjs(date).subtract((dayjs(date).day() + 6) % 7, 'day');

  return (
    <div>
      <Group mb="md">
        <Button
          onClick={() => setDate(dayjs(date).subtract(1, 'week').format('YYYY-MM-DD HH:mm:ss'))}
        >
          Previous Week
        </Button>
        <Text fw={500}>
          {weekStart.format('MMM D')} – {weekStart.add(6, 'day').format('MMM D, YYYY')}
        </Text>
        <Button onClick={() => setDate(dayjs(date).add(1, 'week').format('YYYY-MM-DD HH:mm:ss'))}>
          Next Week
        </Button>
      </Group>

      <WeekView
        date={date}
        onDateChange={setDate}
        events={regularEvents}
        startTime="08:00:00"
        endTime="18:00:00"
      />
    </div>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
