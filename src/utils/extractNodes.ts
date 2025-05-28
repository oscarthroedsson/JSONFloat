import { ALLDATVALUE_CONSTANT } from "@/constant/dataValuesConstant";
import { ParsedNode, ParsedEdge, allDataValues } from "@/types/node.types";

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
    onKey: parentPath.split(".").pop() || parentPath,
    label: parentPath.split(".").pop() || parentPath,
    data: [],
    breakouts: [],
    variations: {},
  };

  if (Array.isArray(input)) {
    const itemVariationsMap = new Map<string, Set<allDataValues>>();
    const knownKeys = new Set<string>();
    currentNode.type = ALLDATVALUE_CONSTANT.array;

    input.forEach((item, index) => {
      const key = index.toString();

      if (isPrimitive(item)) {
        const type = getDataType(item);
        currentNode.data.push({ key: null, value: String(item), valueType: type });

        if (!itemVariationsMap.has("items")) itemVariationsMap.set("items", new Set());
        itemVariationsMap.get("items")!.add(type);
      } else if (typeof item === "object" && !Array.isArray(item)) {
        const itemKeys = Object.keys(item);

        // 1. Backpatch för nya keys vi tidigare inte sett
        for (const k of itemKeys) {
          if (!knownKeys.has(k) && index > 0) {
            itemVariationsMap.set(k, new Set(["undefined"]));
          } else {
            itemVariationsMap.set(k, new Set(["undefined"]));
          }
        }

        // 3. Uppdatera knownKeys
        itemKeys.forEach((k) => knownKeys.add(k));

        const itemPath = `${parentPath}[${index}]`;

        currentNode.breakouts.push({
          key,
          type: "object",
          items: itemKeys.length,
        });
        edges.push({ id: `${parentPath}->${itemPath}`, from: parentPath, to: itemPath });
        extractNodes(item, itemPath, nodes, edges);
      }
    });

    // Skriv ut till variations
    itemVariationsMap.forEach((types, key) => {
      currentNode.variations[key] = Array.from(types);
    });
  } else {
    // Handle object
    const entries = Object.entries(input as Record<string, unknown>);

    for (const [key, value] of entries) {
      const fullPath = `${parentPath}.${key}`;

      addVariationsToNode(currentNode.variations, key, getDataType(value));

      if (isPrimitive(value)) {
        currentNode.data.push({
          key,
          value: String(value),
          valueType: getDataType(value),
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

function addVariationsToNode(record: Record<string, string[]>, key: string, valueType: string) {
  if (!record[key]) {
    record[key] = [valueType];
  } else if (!record[key].includes(valueType)) {
    record[key].push(valueType);
  }
}

function getDataType(value: unknown): allDataValues {
  if (typeof value === "string") return "string";
  if (typeof value === "number") return "number";
  if (typeof value === "boolean") return "boolean";
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return "object";
}
