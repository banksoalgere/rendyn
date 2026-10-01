"use client";

import dayjs from 'dayjs';

import { useState } from 'react';

import { getStartOfWeek, ScheduleEventData, WeekView } from '@mantine/schedule';

const weekStart = dayjs(getStartOfWeek({ date: new Date(), firstDayOfWeek: 1 }));

const weekdays = Array.from({ length: 5 }, (_, i) => weekStart.add(i, 'day').format('YYYY-MM-DD'));

const initialEvents: ScheduleEventData[] = [
  ...weekdays.map((day, i) => ({
    id: `lunch-${i}`,
    title: 'Lunch break',
    start: `${day} 12:00:00`,
    end: `${day} 13:00:00`,
    color: 'red',
    display: 'background' as const,
  })),
  {
    id: 'team-meeting',
    title: 'Team meeting',
    start: `${weekdays[0]} 10:00:00`,
    end: `${weekdays[0]} 11:00:00`,
    color: 'violet',
  },
  {
    id: 'code-review',
    title: 'Code review',
    start: `${weekdays[2]} 15:00:00`,
    end: `${weekdays[2]} 16:00:00`,
    color: 'green',
  },
];

function overlapsBackground(newStart: string, newEnd: string, events: ScheduleEventData[]) {
  return events.some((e) => e.display === 'background' && newStart < e.end && newEnd > e.start);
}

function Demo() {
  const [events, setEvents] = useState(initialEvents);

  const handleEventDrop = ({
    eventId,
    newStart,
    newEnd,
  }: {
    eventId: string | number;
    newStart: string;
    newEnd: string;
  }) => {
    if (overlapsBackground(newStart, newEnd, events)) {
      return;
    }

    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId ? { ...event, start: newStart, end: newEnd } : event
      )
    );
  };

  return (
    <WeekView
      date={new Date()}
      events={events}
      startTime="08:00:00"
      endTime="18:00:00"
      withEventsDragAndDrop
      onEventDrop={handleEventDrop}
      styles={{
        weekViewBackgroundEvent: {
          background: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 10px,
            var(--mantine-color-red-light) 10px,
            var(--mantine-color-red-light) 12px
          )`,
          color: 'var(--mantine-color-red-light-color)',
        },
      }}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
