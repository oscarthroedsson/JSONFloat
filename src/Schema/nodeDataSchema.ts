import { z } from "zod";

export const primativeValues = z.enum(["string", "number", "object", "array", "null", "undefined"]);

export const NodeDataSchema = z.object({
  dataType: z.string(),
  key: z.string(),
  value: z.string().optional(),
  variations: z.array(primativeValues).nullable(),
});

export const BreakOutSchema = z.object({
  key: z.string(),
  type: z.enum(["object", "array"]),
  items: z.number(),
});

export const NodeSchema = z.object({
  id: z.string(),
  label: z.string(),
  data: z.array(NodeDataSchema),
  breakouts: z.array(BreakOutSchema),
});

export const EdgeSchema = z.object({
  id: z.string(),
  from: z.string(),
  to: z.string(),
});
