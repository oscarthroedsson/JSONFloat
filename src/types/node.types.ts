import {
  allDataValues,
  BreakOutSchema,
  EdgeSchema,
  NodeDataSchema,
  NodeSchema,
  primitiveValues,
} from "@/Schema/nodeDataSchema";
import { z } from "zod";

export type NodeData = z.infer<typeof NodeDataSchema>;
export type BreakOut = z.infer<typeof BreakOutSchema>;
export type parsedNode = z.infer<typeof BreakOutSchema>;
export type ParsedNode = z.infer<typeof NodeSchema>;
export type ParsedEdge = z.infer<typeof EdgeSchema>;
export type primativeData = z.infer<typeof primitiveValues>;
export type allDataValues = z.infer<typeof allDataValues>;
