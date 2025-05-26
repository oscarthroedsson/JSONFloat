import { ParsedEdge, ParsedNode } from "@/types/node.types";
import { extractNodes } from "@/utils/extractNodes";
import { unpackJsonData } from "@/utils/parseJSON";
import { isValidJson } from "@/validation/isJson";
import { useState } from "react";

export function useJsonGraph() {
  const [input, setInput] = useState("");
  const [nodes, setNodes] = useState<ParsedNode[]>([]);
  const [edges, setEdges] = useState<ParsedEdge[]>([]);
  const [error, setError] = useState<string | null>(null);

  function handleChange(value: string) {
    setInput(value);
    try {
      if (!isValidJson(value)) {
        return console.error("🚨 No valid JSON");
      }

      const json = unpackJsonData(value);
      console.log("json: ", json);

      const result = extractNodes(json);
      console.log("🥖 Nodes: ", result.nodes);
      console.log("🪒 edges: ", result.edges);

      setNodes(result.nodes);
      setEdges(result.edges);
      setError(null);
    } catch (err) {
      console.error("⏰ ERROR in [useJsonGraph]handleChange");
      console.log("💬 :", err);
      setNodes([]);
      setEdges([]);
      setError("Invalid JSON");
    }
  }

  return { input, nodes, edges, error, handleChange };
}
