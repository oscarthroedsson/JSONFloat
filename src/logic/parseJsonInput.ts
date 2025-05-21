import { isValidJson } from "@/validation/isJson";

export function parseJsonInput(input) {
  if (!isValidJson(input)) return;
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}
