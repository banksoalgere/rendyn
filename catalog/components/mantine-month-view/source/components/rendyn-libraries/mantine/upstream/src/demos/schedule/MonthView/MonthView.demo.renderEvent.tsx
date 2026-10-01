"use client";

import dayjs from 'dayjs';

import { useState } from 'react';

import { HoverCard, UnstyledButton } from '@mantine/core';

import { MonthView, ScheduleEventData } from '@mantine/schedule';

import { _eventDetailsCode, EventDetails } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/_EventDetails';

const today = dayjs();

const startOfMonth = today.startOf('month');

const eventData: ScheduleEventData[] = [
  {
    id: 1,
    title: 'Team Standup',
    start: startOfMonth.add(2, 'day').hour(9).minute(0).format('YYYY-MM-DD HH:mm:ss'),
    end: startOfMonth.add(2, 'day').hour(9).minute(30).format('YYYY-MM-DD HH:mm:ss'),
    color: 'blue',
    payload: {
      description: 'Daily team sync meeting',
      attendees: ['Alice', 'Bob', 'Charlie'],
      location: 'Conference Room A',
    },
  },
  {
    id: 2,
    title: 'Design Workshop',
    start: startOfMonth.add(5, 'day').hour(10).minute(0).format('YYYY-MM-DD HH:mm:ss'),
    end: startOfMonth.add(5, 'day').hour(12).minute(0).format('YYYY-MM-DD HH:mm:ss'),
    color: 'grape',
    payload: {
      description: 'Collaborative design thinking session',
      attendees: ['Diana', 'Eve', 'Frank'],
      location: 'Creative Space',
    },
  },
  {
    id: 3,
    title: 'Client Presentation',
    start: startOfMonth.add(10, 'day').hour(14).minute(0).format('YYYY-MM-DD HH:mm:ss'),
    end: startOfMonth.add(10, 'day').hour(15).minute(30).format('YYYY-MM-DD HH:mm:ss'),
    color: 'green',
    payload: {
      description: 'Q4 progress presentation to client',
      attendees: ['Grace', 'Henry'],
      location: 'Zoom',
    },
  },
  {
    id: 4,
    title: 'Sprint Planning',
    start: startOfMonth.add(15, 'day').hour(10).minute(0).format('YYYY-MM-DD HH:mm:ss'),
    end: startOfMonth.add(15, 'day').hour(12).minute(0).format('YYYY-MM-DD HH:mm:ss'),
    color: 'orange',
    payload: {
      description: 'Plan next sprint tasks and priorities',
      attendees: ['Alice', 'Charlie', 'Bob'],
      location: 'Dev Lab',
    },
  },
  {
    id: 5,
    title: 'Code Review',
    start: startOfMonth.add(18, 'day').hour(16).minute(0).format('YYYY-MM-DD HH:mm:ss'),
    end: startOfMonth.add(18, 'day').hour(17).minute(0).format('YYYY-MM-DD HH:mm:ss'),
    color: 'cyan',
    payload: {
      description: 'Review pull requests from this week',
      attendees: ['Alice', 'Charlie'],
      location: 'Dev Lab',
    },
  },
  {
    id: 6,
    title: 'Tech Conference',
    start: startOfMonth.add(22, 'day').format('YYYY-MM-DD 00:00:00'),
    end: startOfMonth.add(22, 'day').format('YYYY-MM-DD 23:59:59'),
    color: 'pink',
    payload: {
      description: 'Annual tech conference',
      attendees: ['All Team'],
      location: 'Convention Center',
    },
  },
];

function Demo() {
  const [events, setEvents] = useState<ScheduleEventData[]>(eventData);

  return (
    <MonthView
      date={new Date()}
      events={events}
      withEventsDragAndDrop
      onEventDrop={({ eventId, newStart, newEnd }) => {
        setEvents((current) =>
          current.map((event) =>
            event.id === eventId
              ? {
                  ...event,
                  start: dayjs(newStart).format('YYYY-MM-DD HH:mm:ss'),
                  end: dayjs(newEnd).format('YYYY-MM-DD HH:mm:ss'),
                }
              : event
          )
        );
      }}
      renderEvent={(event, props) => (
        <HoverCard width={280} position="right" closeDelay={0} transitionProps={{ duration: 0 }}>
          <HoverCard.Target>
            <UnstyledButton {...props} />
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <EventDetails event={event} />
          </HoverCard.Dropdown>
        </HoverCard>
      )}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
