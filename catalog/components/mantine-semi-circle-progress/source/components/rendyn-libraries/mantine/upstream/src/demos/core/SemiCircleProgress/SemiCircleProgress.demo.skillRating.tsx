"use client";

import { useState } from 'react';

import { Group, SemiCircleProgress, Stack, Text, UnstyledButton } from '@mantine/core';

const colors = ['red', 'orange', 'yellow', 'lime', 'green'];

function Demo() {
  const [skillLevel, setSkillLevel] = useState(4);

  return (
    <Stack align="center" gap="xs">
      <div style={{ position: 'relative', width: 200, height: 120 }}>
        <SemiCircleProgress
          value={(skillLevel / 5) * 100}
          filledSegmentColor={colors[skillLevel - 1] || 'gray'}
          label={<Text fz={36} fw={800} pb={30}>{`${skillLevel}/5`}</Text>}
          labelPosition="center"
          orientation="down"
          size={200}
          thickness={12}
        />
      </div>
      <Text size="sm" c="dimmed">
        Skill Rating
      </Text>
      <Group gap="xs">
        {[1, 2, 3, 4, 5].map((level) => (
          <UnstyledButton
            key={level}
            onClick={() => setSkillLevel(level)}
            px="sm"
            py={4}
            bg={skillLevel === level ? '#087f5b' : '#e7f5f0'}
            c={skillLevel === level ? 'white' : '#087f5b'}
            style={{ borderRadius: 4 }}
          >
            {level}
          </UnstyledButton>
        ))}
      </Group>
    </Stack>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
