// app/home/page.tsx
"use client";
import styles from "./editorStyle.module.css";
import { Canvas, ElkRoot } from "reaflow";
import { Space, ViewPort } from "react-zoomable-ui";
import { useJsonGraph } from "@/hooks/useJsonGraph";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import JSONEditor from "@/components/editors/JsonEditor";

import { BaseNode } from "@/components/customnode/BaseNode";

import { extractFormattedNodeData } from "@/utils/formatNodeToTextContent";
import { calculateNodeSizeFromText } from "@/utils/calculateNodeSize";
import { useCanvasView } from "@/store/useCanvasView";
import { debounce } from "@/utils/debounce";
import SidePanel from "@/components/sidePanel/SidePanel";

export default function HomePage() {
  const { nodes, edges, handleChange } = useJsonGraph();
  const [paneWidth, setPaneWidth] = useState(0);
  const [paneHeight, setPaneHeight] = useState(0);

  const { setView, setViewCenter, view } = useCanvasView();
  const refCanvasCol = useRef<null | HTMLDivElement>(null); // let us set canvas size at first render

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

  useEffect(() => {
    // set canvas at right height in the beginning
    if (!refCanvasCol.current) return;
    setPaneWidth(refCanvasCol.current.offsetWidth);
    setPaneHeight(refCanvasCol.current.offsetHeight);
  }, []);

  const onLayoutChange = useCallback(
    (layout: ElkRoot) => {
      if (layout.width && layout.height) {
        setPaneWidth(layout.width);
        setPaneHeight(layout.height);
      }

      if (!refCanvasCol.current) return;

      // Centrera innehållet med t.ex. 80% zoom
      setTimeout(() => {
        setViewCenter();
      }, 0);
    },
    [setViewCenter]
  );

  return (
    <div className={styles.editor}>
      <SidePanel className={styles.editorPanel}>
        <JSONEditor handleChange={handleChange} />
      </SidePanel>
      <div ref={refCanvasCol} className={styles.canvasPanel}>
        <Space
          onUpdated={() => debounce(() => setView(view as ViewPort), 200)}
          onContextMenu={(e) => {
            e.preventDefault();
          }}
          style={{ width: "100%", height: "100%", overflow: "visible" }}
          onCreate={setView}
          treatTwoFingerTrackPadGesturesLikeTouch={false}
          pollForElementResizing
        >
          <Canvas
            className={styles.canvas}
            nodes={reaflowNodes}
            edges={reaflowEdges}
            direction="RIGHT"
            pannable={true}
            zoomable={false}
            animated={false}
            readonly={true}
            dragEdge={null}
            dragNode={null}
            fit={true}
            width={paneWidth}
            height={paneHeight}
            maxWidth={paneWidth}
            maxHeight={paneHeight}
            onLayoutChange={onLayoutChange}
            node={(nodeProps) => <BaseNode {...nodeProps} />}
          />
        </Space>
      </div>
    </div>
  );
}
