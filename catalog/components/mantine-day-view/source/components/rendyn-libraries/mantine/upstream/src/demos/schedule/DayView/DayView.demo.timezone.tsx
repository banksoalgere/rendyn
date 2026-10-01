"use client";

import dayjs from 'dayjs';

import tz from 'dayjs/plugin/timezone';

import { useState } from 'react';

import { Select, Stack } from '@mantine/core';

import { DayView, ScheduleEventData } from '@mantine/schedule';

const timezones = ['UTC', 'America/New_York', 'Europe/Berlin', 'Asia/Kolkata', 'Asia/Tokyo'];

function getEvents(date: string): ScheduleEventData[] {
  return [
    {
      id: 1,
      title: 'Morning standup',
      start: `${date} 09:00:00`,
      end: `${date} 09:30:00`,
      color: 'blue',
    },
    {
      id: 2,
      title: 'Team meeting',
      start: `${date} 12:00:00`,
      end: `${date} 13:00:00`,
      color: 'teal',
    },
    {
      id: 3,
      title: 'Code review',
      start: `${date} 16:00:00`,
      end: `${date} 17:00:00`,
      color: 'grape',
    },
  ];
}

function Demo() {
  const [tz, setTz] = useState('UTC');

  const getCurrentTime = () => dayjs().tz(tz).format('YYYY-MM-DD HH:mm:ss');
  const currentDate = getCurrentTime().split(' ')[0];

  return (
    <Stack>
      <Select
        label="Display timezone"
        data={timezones}
        value={tz}
        onChange={(value) => setTz(value!)}
        allowDeselect={false}
      />

      <DayView
        date={currentDate}
        events={getEvents(currentDate)}
        getCurrentTime={getCurrentTime}
        startScrollTime={dayjs(getCurrentTime()).subtract(2, 'hour').format('HH:mm:ss')}
        withCurrentTimeIndicator
        withCurrentTimeBubble
      />
    </Stack>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
