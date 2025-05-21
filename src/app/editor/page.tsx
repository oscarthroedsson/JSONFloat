// app/home/page.tsx
"use client";

import dynamic from "next/dynamic";
import { Canvas } from "reaflow";

import styles from "./editorStyle.module.css";
import mockJson from "@/assets/mock/jsonMock.json";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

export default function HomePage() {
  return (
    <div className={styles.editor}>
      <MonacoEditor
        height="100%"
        language="json"
        defaultLanguage="json"
        defaultValue={JSON.stringify(mockJson, null, 2)}
        options={{
          minimap: { enabled: false },
          readOnly: false,
          wordWrap: "on",
          formatOnPaste: true,
          formatOnType: true,
          tabSize: 2,
          scrollBeyondLastLine: false,
        }}
      />
      <Canvas></Canvas>
    </div>
  );
}
