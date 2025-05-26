import { BreakOutSchema, EdgeSchema, NodeDataSchema, NodeSchema, primativeValues } from "@/Schema/nodeDataSchema";
import { z } from "zod";

export type NodeData = z.infer<typeof NodeDataSchema>;
export type BreakOut = z.infer<typeof BreakOutSchema>;
export type parsedNode = z.infer<typeof BreakOutSchema>;
export type ParsedNode = z.infer<typeof NodeSchema>;
export type ParsedEdge = z.infer<typeof EdgeSchema>;
export type dataValues = z.infer<typeof primativeValues>;
