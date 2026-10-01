"use client";

import dayjs from 'dayjs';

import { useState } from 'react';

import { ResourcesWeekView, ScheduleEventData, ScheduleResourceData } from '@mantine/schedule';

const monday = dayjs().startOf('week').add(1, 'day');

const day = (offset: number) => monday.add(offset, 'day').format('YYYY-MM-DD');

const resources: ScheduleResourceData[] = [
  { id: 'tokyo', label: 'Meeting room: Tokyo' },
  { id: 'paris', label: 'Meeting room: Paris' },
  { id: 'new-york', label: 'Meeting room: New York' },
];

const events: ScheduleEventData[] = [
  {
    id: 1,
    title: 'Offsite',
    start: `${day(1)} 00:00:00`,
    end: `${day(2)} 00:00:00`,
    color: 'blue',
    resourceId: 'tokyo',
  },
  {
    id: 2,
    title: 'Review',
    start: `${day(1)} 00:00:00`,
    end: `${day(2)} 00:00:00`,
    color: 'grape',
    resourceId: 'tokyo',
  },
  {
    id: 3,
    title: 'Sprint Planning',
    start: `${day(0)} 10:00:00`,
    end: `${day(0)} 11:30:00`,
    color: 'green',
    resourceId: 'tokyo',
  },
  {
    id: 4,
    title: 'Maintenance',
    start: `${day(2)} 00:00:00`,
    end: `${day(3)} 00:00:00`,
    color: 'gray',
    display: 'background',
    resourceId: 'paris',
  },
  {
    id: 5,
    title: 'Client Call',
    start: `${day(1)} 09:30:00`,
    end: `${day(1)} 10:30:00`,
    color: 'violet',
    resourceId: 'paris',
  },
  {
    id: 6,
    title: 'Holiday',
    start: `${day(4)} 00:00:00`,
    end: `${day(5)} 00:00:00`,
    color: 'orange',
    resourceId: 'new-york',
  },
];

function Demo() {
  const today = dayjs().format('YYYY-MM-DD');
  const [date, setDate] = useState(today);

  return (
    <ResourcesWeekView
      date={date}
      onDateChange={setDate}
      resources={resources}
      events={events}
      startTime="08:00:00"
      endTime="18:00:00"
      startScrollDateTime={`${today} 08:00:00`}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
