// app/home/page.tsx
"use client";
import styles from "./editorStyle.module.css";
import { Canvas } from "reaflow";

import { useJsonGraph } from "@/hooks/useJsonGraph";
import { useCallback, useMemo, useRef, useState } from "react";
import JSONEditor from "@/components/editors/JsonEditor";

import { CustomNode } from "@/components/customnode/customNode";

import { extractFormattedNodeData } from "@/utils/formatNodeToTextContent";
import { calculateNodeSizeFromText } from "@/utils/calculateNodeSize";

export default function HomePage() {
  const { nodes, edges, handleChange } = useJsonGraph();
  const [paneWidth, setPaneWidth] = useState(1200);
  const [paneHeight, setPaneHeight] = useState(800);

  const reaflowEdges = useMemo(() => {
    return edges.map((edge) => ({
      id: edge.id,
      from: edge.from,
      to: edge.to,
    }));
  }, [edges]);

  const reaflowNodes = useMemo(() => {
    return nodes.map((node) => {
      const content = extractFormattedNodeData(node);
      const { width, height } = calculateNodeSizeFromText(content);

      return {
        id: node.id,
        data: node,
        height,
        width,
      };
    });
  }, [nodes]);

  const onLayoutChange = useCallback((layout) => {
    if (!nodes || !edges) return;
    setPaneWidth(layout.width + 50);
    setPaneHeight(layout.height + 50);
    setTimeout(() => {
      window.requestAnimationFrame(() => {
        centerView();
      });
    });
  }, []);

  return (
    <div className={styles.editor}>
      <div className={styles.editorPanel}>
        <JSONEditor handleChange={handleChange} />
      </div>
      <div className={styles.canvasPanel}>
        <Canvas
          nodes={reaflowNodes}
          edges={reaflowEdges}
          direction="RIGHT"
          pannable={true}
          zoomable={true}
          fit={true}
          width={paneWidth}
          height={paneHeight}
          maxWidth={paneWidth}
          maxHeight={paneHeight}
          onLayoutChange={onLayoutChange}
          /* ...resten av props... */
          node={(nodeProps) => <CustomNode {...nodeProps} />}
        />
      </div>
    </div>
  );
}
