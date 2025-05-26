import { ParsedNode, ParsedEdge, NodeData } from "@/types/node.types";

export function extractNodes(
  input: unknown,
  parentPath = "root",
  nodes: ParsedNode[] = [],
  edges: ParsedEdge[] = []
): { nodes: ParsedNode[]; edges: ParsedEdge[] } {
  if (typeof input !== "object" || input === null) return { nodes, edges };

  // Current node we looping over
  const currentNode: ParsedNode = {
    id: parentPath,
    label: parentPath.split(".").pop() || parentPath,
    data: [],
    breakouts: [],
  };

  if (Array.isArray(input)) {
    // Handle array directly
    currentNode.label = `${currentNode.label}`;

    // Process each array item
    input.forEach((item, index) => {
      const itemPath = `${parentPath}[${index}]`;

      if (isPrimitive(item)) {
        currentNode.data.push({
          key: index.toString(),
          value: String(item),
          dataType: getDataType(item),
          variations: [],
        });
      } else {
        // For non-primitive items, create breakouts

        const key: string = index.toString();
        const type: "array" | "object" = Array.isArray(item) ? "array" : "object";
        const items = Array.isArray(item) ? item.length : Object.values(item).length;

        currentNode.breakouts?.push({
          key: key,
          type: type,
          items: items,
        });
        edges.push({ id: `${parentPath}->${itemPath}`, from: parentPath, to: itemPath });
        extractNodes(item, itemPath, nodes, edges);
      }
    });
  } else {
    // Handle object
    const entries = Object.entries(input as Record<string, unknown>);

    for (const [key, value] of entries) {
      const fullPath = `${parentPath}.${key}`;

      if (isPrimitive(value)) {
        currentNode.data.push({
          key,
          value: String(value),
          dataType: getDataType(value),
          variations: [],
        });
      } else if (Array.isArray(value)) {
        currentNode.breakouts?.push({ key, type: "array", items: key.length });
        edges.push({ id: `${parentPath}->${fullPath}`, from: parentPath, to: fullPath });
        // Pass the array directly, don't wrap it
        extractNodes(value, fullPath, nodes, edges);
      } else if (typeof value === "object" && value !== null) {
        currentNode.breakouts?.push({ key, type: "object", items: Object.values(key).length });
        edges.push({ id: `${parentPath}->${fullPath}`, from: parentPath, to: fullPath });
        extractNodes(value, fullPath, nodes, edges);
      }
    }
  }

  nodes.push(currentNode);
  return { nodes, edges };
}

function isPrimitive(value: unknown): value is string | number | boolean | null {
  return typeof value === "string" || typeof value === "number" || typeof value === "boolean" || value === null;
}

// function getObjectDataType(value: unknown) {
//   if (Array.isArray(value)) return "array";
//   return "object";
// }

// function getObjectDataLength(value: object) {
//   if (Array.isArray(value)) {
//     return value.length;
//   } else {
//     return Object.keys(value).length;
//   }
// }

// function getPrimitiveType(value: unknown): dataValues {
//   if (typeof value === "string") return "string";
//   if (typeof value === "number") return "number";
//   if (value === null) return "null";
//   if (value === undefined) return "undefined";
//   if (Array.isArray(value)) return "array";
//   return "object";
// }

function getDataType(value: unknown): NodeData["dataType"] {
  if (typeof value === "string") return "string";
  if (typeof value === "number") return "number";
  if (typeof value === "boolean") return "boolean";
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return "object";
}
