"use client";

import dayjs from 'dayjs';

import { useState } from 'react';

import { DateStringValue, MonthView, ScheduleHeader } from '@mantine/schedule';

import { dataCode, regularEvents } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/MonthView/_data';

function Demo() {
  const [date, setDate] = useState<DateStringValue>(
    dayjs().format('YYYY-MM-DD') as DateStringValue
  );

  return (
    <div>
      <ScheduleHeader>
        <ScheduleHeader.Previous
          onClick={() =>
            setDate(
              dayjs(date)
                .subtract(1, 'month')
                .startOf('month')
                .format('YYYY-MM-DD') as DateStringValue
            )
          }
        />
        <ScheduleHeader.MonthYearSelect
          yearValue={dayjs(date).year()}
          monthValue={dayjs(date).month()}
          onYearChange={(year) =>
            setDate(dayjs(date).year(year).startOf('month').format('YYYY-MM-DD') as DateStringValue)
          }
          onMonthChange={(month) =>
            setDate(
              dayjs(date).month(month).startOf('month').format('YYYY-MM-DD') as DateStringValue
            )
          }
        />
        <ScheduleHeader.Next
          onClick={() =>
            setDate(
              dayjs(date).add(1, 'month').startOf('month').format('YYYY-MM-DD') as DateStringValue
            )
          }
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

      <MonthView date={date} onDateChange={setDate} events={regularEvents} withHeader={false} />
    </div>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
