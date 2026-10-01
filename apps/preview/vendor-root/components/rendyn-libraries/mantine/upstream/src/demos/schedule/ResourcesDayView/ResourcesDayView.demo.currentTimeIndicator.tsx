"use client";

import { ResourcesDayView } from '@mantine/schedule';

import { dataCode, resourceEvents, resources } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/ResourcesDayView/_data';

function Demo() {
  return (
    <ResourcesDayView
      date={new Date()}
      resources={resources}
      events={resourceEvents}
      withCurrentTimeIndicator
      withCurrentTimeBubble={false}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
