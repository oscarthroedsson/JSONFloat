import { z } from "zod";

export const primitiveValues = z.enum(["string", "number", "boolean", "null"]);
export const allDataValues = z.enum(["string", "number", "boolean", "object", "array", "null", "undefined"]);

export const Variations = z.record(z.array(allDataValues));

export const NodeDataSchema = z.object({
  key: z.string().nullable(),
  value: z.string().optional(),
  valueType: z.string(),
});

export const BreakOutSchema = z.object({
  key: z.string(),
  type: z.enum(["object", "array"]),
  items: z.number(),
});

export const NodeSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.string(),
    type: allDataValues,
    onKey: z.string(),
    label: z.string(),
    data: z.array(z.union([NodeDataSchema, NodeSchema])),
    breakouts: z.array(BreakOutSchema),
    variations: Variations,
  })
);

export const EdgeSchema = z.object({
  id: z.string(),
  from: z.string(),
  to: z.string(),
});
