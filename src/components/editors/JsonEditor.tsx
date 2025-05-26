import { useRef, useState } from "react";
import { Editor, EditorProps, OnMount } from "@monaco-editor/react";
import mockJson from "@/assets/mock/jsonMock.json";
import * as monacoEditor from "monaco-editor";
interface JSONEditorProps extends EditorProps {
  handleChange: (val: string) => void;
}

export default function JSONEditor({ handleChange, ...props }: JSONEditorProps) {
  const [hasErrors, setHasErrors] = useState(false);
  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null);

  const handleMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // ✅ HÄR använder du monaco korrekt (utan direkt import)
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      allowComments: false,
      schemas: [],
    });

    monaco.editor.onDidChangeMarkers(() => {
      const model = editor.getModel();
      if (!model) return;
      const markers = monaco.editor.getModelMarkers({ resource: model.uri });
      setHasErrors(markers.length > 0);
    });
  };

  return (
    <>
      <Editor
        height="100%"
        language="json"
        defaultValue={JSON.stringify(mockJson, null, 2)}
        onMount={handleMount}
        onChange={(val) => {
          console.log("VAL: ", val);
          if (!hasErrors && val) handleChange(val);
          else {
            console.error("Editor has error");
          }
        }}
        options={{
          minimap: { enabled: false },
          readOnly: false,
          wordWrap: "on",
          formatOnPaste: true,
          formatOnType: true,
          tabSize: 2,
          scrollBeyondLastLine: false,
        }}
        {...props}
      />
      {hasErrors && <p style={{ color: "red" }}>Fix JSON errors before continuing.</p>}
    </>
  );
}
