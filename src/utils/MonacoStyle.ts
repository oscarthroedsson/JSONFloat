// src/themes/jsonEditorTheme.ts
export const jsonEditorTheme = {
  base: "vs",
  inherit: true,
  rules: [
    { token: "string.key.json", foreground: "1f61a0" },
    { token: "string.value.json", foreground: "008800" },
    { token: "number", foreground: "ff0000" },
    { token: "keyword.json", foreground: "0000ff" },
    { token: "delimiter.bracket.json", foreground: "ff8c00" },
    { token: "delimiter.brace.json", foreground: "8b008b" },
  ],
  colors: {
    "editor.background": "#f9f9f9",
    "editorLineNumber.foreground": "#aaaaaa",
    "editor.lineHighlightBackground": "#f0f0f0",
    "editorCursor.foreground": "#000000",
  },
};
