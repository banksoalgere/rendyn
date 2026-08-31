"use client";

import { Marquee, MarqueeFade, MarqueeItem } from "@/components/kibo-ui/marquee";

export default function Example() {
  return (
    <Marquee className="max-w-2xl">
      <MarqueeFade side="left" />
      <MarqueeFade side="right" />
      <div className="flex justify-center">
        {[1, 2, 3, 4, 5].map((item) => (
          <MarqueeItem className="grid size-24 place-items-center rounded-full bg-muted text-xl font-semibold" key={item}>
            {item}
          </MarqueeItem>
        ))}
      </div>
    </Marquee>
  );
}
