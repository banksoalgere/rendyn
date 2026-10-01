"use client";

export default function Component() {
  return (
    <div className="border-b px-4 py-3">
      <p className="text-center text-sm">
        <span className="mr-1 text-base leading-none">📫</span> Subscribe to our
        newsletter and get 10% off your first order!{" "}
        <span className="mx-1 text-muted-foreground">·</span>{" "}
        <a className="font-medium underline hover:no-underline" href="#">
          Subscribe
        </a>
      </p>
    </div>
  );
}
