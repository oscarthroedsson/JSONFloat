import { ParsedNode } from "@/types/node.types";

export function extractFormattedNodeData(node: ParsedNode): {
  type: "object" | "array";
  label: string;
  values: string[];
  breakOuts: { keyname: string; type: "object" | "array" }[];
} {
  const type = detectNodeType(node);
  const label = node.label ?? "";

  const values = node.data.map((d) => (type === "array" ? `${d.value}` : `${d.key}: ${d.value}`));
  const breakOuts = node.breakouts.map((b) => ({
    keyname: b.key,
    type: b.type,
  }));

  /*
  
  
  → Är en Array
  → → I
  
  
  */

  return {
    type,
    label,
    values,
    breakOuts,
  };
}

function detectNodeType(node: ParsedNode): "object" | "array" {
  return node.label.toLowerCase().includes("array") ? "array" : "object";
}
