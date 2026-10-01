"use client";

import { DatePickerInput, DatesProvider } from '@mantine/dates';

const locale = 'de';

const toDate = (value: string) => new Date(`${value}T00:00:00`);

function Demo() {
  return (
    <DatesProvider settings={{ locale }}>
      <DatePickerInput
        label="Pick date"
        placeholder="Pick date"
        valueFormatter={({ date }) =>
          typeof date === 'string'
            ? new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(toDate(date))
            : ''
        }
        monthLabelFormat={(date) =>
          new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(toDate(date))
        }
        weekdayFormat={(date) =>
          new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(toDate(date))
        }
        monthsListFormat={(date) =>
          new Intl.DateTimeFormat(locale, { month: 'short' }).format(toDate(date))
        }
        yearsListFormat={(date) =>
          new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(toDate(date))
        }
      />
    </DatesProvider>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
