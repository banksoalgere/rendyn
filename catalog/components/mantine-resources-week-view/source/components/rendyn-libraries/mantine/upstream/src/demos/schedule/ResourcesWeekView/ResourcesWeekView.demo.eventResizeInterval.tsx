"use client";

import dayjs from 'dayjs';

import { useState } from 'react';

import { ResourcesWeekView, ScheduleEventData } from '@mantine/schedule';

import { dataCode, resourceEvents, resources } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/ResourcesWeekView/_data';

function Demo() {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [events, setEvents] = useState<ScheduleEventData[]>(resourceEvents);

  return (
    <ResourcesWeekView
      date={date}
      onDateChange={setDate}
      resources={resources}
      events={events}
      startTime="08:00:00"
      endTime="18:00:00"
      intervalMinutes={30}
      eventResizeInterval={15}
      startScrollDateTime={`${dayjs().format('YYYY-MM-DD')} 08:00:00`}
      withEventResize
      onEventResize={({ eventId, newStart, newEnd }) => {
        setEvents((current) =>
          current.map((event) =>
            event.id === eventId ? { ...event, start: newStart, end: newEnd } : event
          )
        );
      }}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
