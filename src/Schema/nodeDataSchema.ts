import { z } from "zod";

export const NodeSchema = z.object({
  id: z.string(),
  label: z.string(),
});

export const NodeDataSchema = z.object({
  dataType: z.string(),
  key: z.string(),
  value: z.string(),
});
