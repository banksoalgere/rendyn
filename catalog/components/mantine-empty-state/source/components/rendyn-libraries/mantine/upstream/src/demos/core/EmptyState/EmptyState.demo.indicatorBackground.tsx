"use client";

import { ShoppingCartSimpleIcon } from '@phosphor-icons/react';

import { Button, EmptyState } from '@mantine/core';

function Demo() {
  return (
    <EmptyState
      withIndicatorBackground
      icon={<ShoppingCartSimpleIcon />}
      title="Your cart is empty"
    >
      <EmptyState.Description>
        Your shopping cart is empty right now. Browse our catalog and add the items you like to get
        started with your first order.
      </EmptyState.Description>
      <EmptyState.Actions>
        <Button variant="default">Browse products</Button>
      </EmptyState.Actions>
    </EmptyState>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
