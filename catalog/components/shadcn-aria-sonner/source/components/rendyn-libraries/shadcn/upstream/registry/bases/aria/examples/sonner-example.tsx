"use client";

import { toast } from "sonner"

import {
  Example,
  ExampleWrapper,
} from "@/components/rendyn-libraries/shadcn/upstream/registry/bases/aria/components/example"
import { Button } from "@/components/rendyn-libraries/shadcn/upstream/registry/bases/aria/ui/button"

export default function SonnerExample() {
  return (
    <ExampleWrapper>
      <SonnerBasic />
      <SonnerWithDescription />
    </ExampleWrapper>
  )
}

function SonnerBasic() {
  return (
    <Example title="Basic" className="items-center justify-center">
      <Button
        onPress={() => toast("Event has been created")}
        variant="outline"
        className="w-fit"
      >
        Show Toast
      </Button>
    </Example>
  )
}

function SonnerWithDescription() {
  return (
    <Example title="With Description" className="items-center justify-center">
      <Button
        onPress={() =>
          toast("Event has been created", {
            description: "Monday, January 3rd at 6:00pm",
          })
        }
        variant="outline"
        className="w-fit"
      >
        Show Toast
      </Button>
    </Example>
  )
}
