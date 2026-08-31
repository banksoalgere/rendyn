"use client";

import { Ticker, TickerIcon, TickerPrice, TickerPriceChange, TickerSymbol } from "@/components/kibo-ui/ticker";

export default function Example() {
  return (
    <Ticker>
      <TickerIcon symbol="GOOG" />
      <TickerSymbol symbol="GOOG" />
      <TickerPrice price={175.41} />
      <TickerPriceChange change={2.13} />
    </Ticker>
  );
}
