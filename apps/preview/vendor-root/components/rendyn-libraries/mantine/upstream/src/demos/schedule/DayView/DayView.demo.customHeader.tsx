"use client";

import dayjs from 'dayjs';

import { useState } from 'react';

import { DateStringValue, DayView, ScheduleHeader } from '@mantine/schedule';

import { dataCode, regularEvents } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/DayView/_data';

function Demo() {
  const [date, setDate] = useState<DateStringValue>(
    dayjs().format('YYYY-MM-DD') as DateStringValue
  );

  return (
    <div>
      <ScheduleHeader>
        <ScheduleHeader.Previous
          onClick={() =>
            setDate(dayjs(date).subtract(1, 'day').format('YYYY-MM-DD') as DateStringValue)
          }
        />
        <ScheduleHeader.Control interactive={false} miw={200}>
          {dayjs(date).format('dddd, MMMM D, YYYY')}
        </ScheduleHeader.Control>
        <ScheduleHeader.Next
          onClick={() => setDate(dayjs(date).add(1, 'day').format('YYYY-MM-DD') as DateStringValue)}
        />
        <ScheduleHeader.Today
          onClick={() => setDate(dayjs().format('YYYY-MM-DD') as DateStringValue)}
        />
        <ScheduleHeader.Control
          style={{ marginInlineStart: 'auto' }}
          onClick={() => window.print()}
        >
          Print
        </ScheduleHeader.Control>
      </ScheduleHeader>

      <DayView
        date={date}
        onDateChange={setDate}
        events={regularEvents}
        startTime="08:00:00"
        endTime="18:00:00"
        withHeader={false}
      />
    </div>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
