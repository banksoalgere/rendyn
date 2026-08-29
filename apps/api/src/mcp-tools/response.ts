export interface TextContent {
  type: "text";
  text: string;
}

export function textContent(value: unknown): TextContent {
  return {
    type: "text",
    text: JSON.stringify(value, null, 2),
  };
}
