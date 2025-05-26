(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/editor/editorStyle.module.css [app-client] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "editor": "editorStyle-module__g5GrRa__editor",
});
}}),
"[project]/src/utils/extractNodes.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "extractNodes": (()=>extractNodes)
});
function extractNodes(input, parentPath = "root", nodes = [], edges = []) {
    if (typeof input !== "object" || input === null) return {
        nodes,
        edges
    };
    // Current node we looping over
    const currentNode = {
        id: parentPath,
        label: parentPath.split(".").pop() || parentPath,
        data: [],
        breakouts: []
    };
    if (Array.isArray(input)) {
        // Handle array directly
        currentNode.label = `${currentNode.label}`;
        // Process each array item
        input.forEach((item, index)=>{
            const itemPath = `${parentPath}[${index}]`;
            if (isPrimitive(item)) {
                currentNode.data.push({
                    key: index.toString(),
                    value: String(item),
                    dataType: getDataType(item),
                    variations: []
                });
            } else {
                // For non-primitive items, create breakouts
                const key = index.toString();
                const type = Array.isArray(item) ? "array" : "object";
                const items = Array.isArray(item) ? item.length : Object.values(item).length;
                currentNode.breakouts?.push({
                    key: key,
                    type: type,
                    items: items
                });
                edges.push({
                    id: `${parentPath}->${itemPath}`,
                    from: parentPath,
                    to: itemPath
                });
                extractNodes(item, itemPath, nodes, edges);
            }
        });
    } else {
        // Handle object
        const entries = Object.entries(input);
        for (const [key, value] of entries){
            const fullPath = `${parentPath}.${key}`;
            if (isPrimitive(value)) {
                currentNode.data.push({
                    key,
                    value: String(value),
                    dataType: getDataType(value),
                    variations: []
                });
            } else if (Array.isArray(value)) {
                currentNode.breakouts?.push({
                    key,
                    type: "array",
                    items: key.length
                });
                edges.push({
                    id: `${parentPath}->${fullPath}`,
                    from: parentPath,
                    to: fullPath
                });
                // Pass the array directly, don't wrap it
                extractNodes(value, fullPath, nodes, edges);
            } else if (typeof value === "object" && value !== null) {
                currentNode.breakouts?.push({
                    key,
                    type: "object",
                    items: Object.values(key).length
                });
                edges.push({
                    id: `${parentPath}->${fullPath}`,
                    from: parentPath,
                    to: fullPath
                });
                extractNodes(value, fullPath, nodes, edges);
            }
        }
    }
    nodes.push(currentNode);
    return {
        nodes,
        edges
    };
}
function isPrimitive(value) {
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
function getDataType(value) {
    if (typeof value === "string") return "string";
    if (typeof value === "number") return "number";
    if (typeof value === "boolean") return "boolean";
    if (value === null) return "null";
    if (Array.isArray(value)) return "array";
    return "object";
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/utils/parseJSON.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
/* eslint-disable @typescript-eslint/no-explicit-any */ /**
 * Recursively normalizes a JSON object:
 * - Parses JSON strings into objects or arrays if applicable.
 * - Converts numeric strings into numbers.
 * - Handles nested objects and arrays.
 * - Returns all other values as they are.
 *
 * @param data - The input data to be normalized (object or JSON string).
 * @returns The normalized object with correct data types.
 */ __turbopack_context__.s({
    "unpackJsonData": (()=>unpackJsonData)
});
function unpackJsonData(data) {
    // If input is a JSON string, parse it into an object/array
    if (isJsonString(data)) {
        console.log("Parsing JSON string:", data);
        data = JSON.parse(data);
    }
    if (isArray(data)) {
        console.log("Processing array:", data);
        return data.map((item, index)=>{
            console.log(`Array item ${index}:`, item, "Type:", typeof item);
            return unpackJsonData(item);
        });
    }
    if (isObject(data)) {
        console.log("Processing object:", data);
        const result = {};
        for (const [key, value] of Object.entries(data)){
            console.log(`Object key ${key}:`, value, "Type:", typeof value);
            if (isJsonString(value)) {
                result[key] = JSON.parse(value);
            } else if (isNumericString(value)) {
                result[key] = Number(value);
            } else if (isObject(value) || isArray(value)) {
                result[key] = unpackJsonData(value);
            } else {
                result[key] = value; // Keep primitive values as they are
            }
        }
        return result;
    }
    // Return primitive values unchanged
    console.log("Returning primitive:", data, "Type:", typeof data);
    return data;
}
// Checks if a value is an object (but not an array or null).
function isObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
}
// Checks if a value is an array.
function isArray(value) {
    return Array.isArray(value);
}
// Checks if a value is a string.
function isString(value) {
    return typeof value === "string";
}
// Checks if a value is a numeric string (integer or decimal).
function isNumericString(value) {
    if (!isString(value)) return false;
    const str = value;
    return /^\d+(\.\d+)?$/.test(str);
}
// Checks if a value is a JSON string.
function isJsonString(value) {
    if (!isString(value)) return false;
    const str = value;
    // Skip if it's just a number or simple string
    if (!/^[\{\[]/.test(str.trim())) return false;
    try {
        const parsed = JSON.parse(str);
        return typeof parsed === "object" && parsed !== null;
    } catch  {
        return false;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/validation/isJson.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "isValidJson": (()=>isValidJson)
});
const isValidJson = (data)=>{
    try {
        console.log("data: ", data);
        JSON.parse(data);
        return true;
    } catch (err) {
        console.error("❌ JSON.parse error:", err);
        console.error("⛔️ Offending input:", data);
        return false;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/hooks/useJsonGraph.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useJsonGraph": (()=>useJsonGraph)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$extractNodes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/extractNodes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$parseJSON$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/parseJSON.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$validation$2f$isJson$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/validation/isJson.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
function useJsonGraph() {
    _s();
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [nodes, setNodes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [edges, setEdges] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    function handleChange(value) {
        setInput(value);
        try {
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$validation$2f$isJson$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidJson"])(value)) {
                return console.error("🚨 No valid JSON");
            }
            const json = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$parseJSON$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unpackJsonData"])(value);
            console.log("json: ", json);
            const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$extractNodes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractNodes"])(json);
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
    return {
        input,
        nodes,
        edges,
        error,
        handleChange
    };
}
_s(useJsonGraph, "HvADcve9QUk3Cq4hg+c2j5HgHGA=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/assets/mock/jsonMock.json (json)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v(JSON.parse("{\"user\":{\"id\":123,\"name\":\"Oscar Throedsson\",\"email\":\"oscar@example.com\",\"isActive\":true,\"age\":32,\"bio\":null,\"location\":{\"city\":\"Malmö\",\"country\":\"Sweden\",\"coordinates\":{\"lat\":55.604981,\"lng\":13.003822}},\"preferences\":{\"theme\":\"dark\",\"language\":\"sv\",\"notifications\":{\"email\":true,\"sms\":false,\"push\":true}}},\"skills\":[\"JavaScript\",\"TypeScript\",\"React\",\"Node.js\"],\"scoreHistory\":[95,87,78,99,85,92],\"uniformObjectsExact\":[{\"type\":\"fruit\",\"name\":\"apple\"},{\"type\":\"fruit\",\"name\":\"apple\"},{\"type\":\"fruit\",\"name\":\"apple\"}],\"uniformObjects\":[{\"id\":1,\"label\":\"One\"},{\"id\":2,\"label\":\"Two\"},{\"id\":3,\"label\":\"Three\"}],\"stringArray\":[\"alpha\",\"beta\",\"gamma\",\"delta\"],\"numberArray\":[1,2,3,4,5,6,7],\"mixedArray\":[\"hello\",42,true,null,{\"nested\":\"object\",\"value\":[1,2,3]},[true,false]],\"emptyArray\":[],\"emptyObject\":{},\"projects\":[{\"title\":\"Sanitas Health\",\"stack\":[\"Node.js\",\"React\",\"MongoDB\"],\"meta\":{\"stars\":420,\"forks\":12}},{\"title\":\"TypeHub\",\"stack\":[\"Next.js\",\"TypeScript\"],\"meta\":{\"stars\":250,\"forks\":5}}]}"));}}),
"[project]/src/components/editors/JsonEditor.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>JSONEditor)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$monaco$2d$editor$2f$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@monaco-editor/react/dist/index.mjs [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$monaco$2d$editor$2f$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@monaco-editor/react/dist/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$mock$2f$jsonMock$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/assets/mock/jsonMock.json (json)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function JSONEditor({ handleChange, ...props }) {
    _s();
    const [hasErrors, setHasErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const editorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleMount = (editor, monaco)=>{
        editorRef.current = editor;
        // ✅ HÄR använder du monaco korrekt (utan direkt import)
        monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
            validate: true,
            allowComments: false,
            schemas: []
        });
        monaco.editor.onDidChangeMarkers(()=>{
            const model = editor.getModel();
            if (!model) return;
            const markers = monaco.editor.getModelMarkers({
                resource: model.uri
            });
            setHasErrors(markers.length > 0);
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$monaco$2d$editor$2f$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Editor"], {
                height: "100%",
                language: "json",
                defaultValue: JSON.stringify(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$mock$2f$jsonMock$2e$json__$28$json$29$__["default"], null, 2),
                onMount: handleMount,
                onChange: (val)=>{
                    console.log("VAL: ", val);
                    if (!hasErrors && val) handleChange(val);
                    else {
                        console.error("Editor has error");
                    }
                },
                options: {
                    minimap: {
                        enabled: false
                    },
                    readOnly: false,
                    wordWrap: "on",
                    formatOnPaste: true,
                    formatOnType: true,
                    tabSize: 2,
                    scrollBeyondLastLine: false
                },
                ...props
            }, void 0, false, {
                fileName: "[project]/src/components/editors/JsonEditor.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            hasErrors && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    color: "red"
                },
                children: "Fix JSON errors before continuing."
            }, void 0, false, {
                fileName: "[project]/src/components/editors/JsonEditor.tsx",
                lineNumber: 56,
                columnNumber: 21
            }, this)
        ]
    }, void 0, true);
}
_s(JSONEditor, "cUd06Ty2dEeCFMk2A4qE9ReiFDo=");
_c = JSONEditor;
var _c;
__turbopack_context__.k.register(_c, "JSONEditor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/utils/formatNodeToTextContent.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "extractFormattedNodeData": (()=>extractFormattedNodeData)
});
function extractFormattedNodeData(node) {
    const type = detectNodeType(node);
    const label = node.label ?? "";
    const values = node.data.map((d)=>type === "array" ? `${d.value}` : `${d.key}: ${d.value}`);
    const breakOuts = node.breakouts.map((b)=>({
            keyname: b.key,
            type: b.type
        }));
    return {
        type,
        label,
        values,
        breakOuts
    };
}
function detectNodeType(node) {
    return node.label.toLowerCase().includes("array") ? "array" : "object";
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/constant/NodeConfig.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "NODE_CONFIG": (()=>NODE_CONFIG)
});
const NODE_CONFIG = {
    heightHeader: 44,
    heightItem: 40
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/utils/StyleObjects/breakOutItem.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "breakOutContainerStyle": (()=>breakOutContainerStyle),
    "breakOutItemEndStyle": (()=>breakOutItemEndStyle),
    "breakOutItemStartIconStyle": (()=>breakOutItemStartIconStyle),
    "breakOutItemStartStyle": (()=>breakOutItemStartStyle),
    "breakOutItemStyle": (()=>breakOutItemStyle)
});
const breakOutContainerStyle = {
    display: "grid",
    height: "auto",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto",
    rowGap: "2px",
    padding: "8px 0px",
    backgroundColor: "#f1f5f9",
    borderRadius: "4px",
    color: "#3f3f46"
};
const breakOutItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#0f172a",
    padding: "0px 8px",
    fontSize: "16px",
    fontWeight: "500",
    marginBottom: "8px"
};
const breakOutItemStartStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    gap: "4px"
};
const breakOutItemStartIconStyle = {
    width: "14px"
};
const breakOutItemEndStyle = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/utils/StyleObjects/header.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "NCHeader": (()=>NCHeader),
    "NCHeaderLabel": (()=>NCHeaderLabel),
    "NCHeaderLabelCSSText": (()=>NCHeaderLabelCSSText),
    "NCHeaderLabelIcon": (()=>NCHeaderLabelIcon),
    "NCHeaderLabelIconCSSText": (()=>NCHeaderLabelIconCSSText),
    "NCHeaderSubText": (()=>NCHeaderSubText),
    "NCHeaderSubTextCSSText": (()=>NCHeaderSubTextCSSText),
    "NCheaderCSSText": (()=>NCheaderCSSText)
});
const NCHeader = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0px"
};
const NCHeaderLabel = {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    gap: "4px",
    fontWeight: "600",
    color: "#3f3f46"
};
const NCHeaderLabelIcon = {
    width: "16px"
};
const NCHeaderSubText = {
    fontSize: "10px",
    fontWeight: "200"
};
const NCheaderCSSText = `
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 8px 0px;
  `;
const NCHeaderLabelCSSText = `
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 4px;

    font-weight: 600;
    color: #3f3f46;
`;
const NCHeaderLabelIconCSSText = `
  width: 16px;
`;
const NCHeaderSubTextCSSText = `
font-size: 12px;
font-weight: 200;
`;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/utils/StyleObjects/NodeContainer.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "NodeContainerCSSText": (()=>NodeContainerCSSText),
    "nodeContainerStyle": (()=>nodeContainerStyle)
});
const nodeContainerStyle = {
    boxSizing: "border-box",
    position: "relative",
    pointerEvents: "none",
    padding: "8px",
    height: "fit-content",
    width: "fit-content",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    zIndex: "-1"
};
const NodeContainerCSSText = `
position: fixed;
  padding: var(--spacing-sm);
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  height: fit-content;
`;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/utils/StyleObjects/primativeValue.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "footerCSSText": (()=>footerCSSText),
    "footerStyle": (()=>footerStyle),
    "keyPairValueCSSText": (()=>keyPairValueCSSText),
    "keyPairValueStyle": (()=>keyPairValueStyle),
    "keyValue": (()=>keyValue),
    "keyValueStyle": (()=>keyValueStyle),
    "primativeValueContainerCSSText": (()=>primativeValueContainerCSSText),
    "primativeValueContainerStyle": (()=>primativeValueContainerStyle),
    "primativeValueItemCSSText": (()=>primativeValueItemCSSText),
    "primativeValueItemStyle": (()=>primativeValueItemStyle)
});
const primativeValueContainerStyle = {
    display: "grid",
    height: "auto",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto",
    rowGap: "2px",
    padding: "8px 0px",
    backgroundColor: "#f1f5f9",
    borderRadius: "4px",
    color: "#3f3f46"
};
const primativeValueItemStyle = {
    paddingInline: "8px"
};
const keyPairValueStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    fontSize: "12px",
    fontWeight: "500"
};
const keyValueStyle = {
    color: "#db2777"
};
const footerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
};
const primativeValueContainerCSSText = `
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  row-gap: 4px;

  padding: 8px 0px;

  background-color: #f1f5f9;
  border-radius: 4px;
  color: #3f3f46;
`;
const primativeValueItemCSSText = `
padding-inline: 8px;
`;
const keyPairValueCSSText = `
 display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    font-size: 14px;
    font-weight: 500;
`;
const keyValue = `
  color: #db2777;
`;
const footerCSSText = `
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/utils/calculateNodeSize.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "buildObjectNode": (()=>buildObjectNode),
    "calculateNodeSizeFromText": (()=>calculateNodeSizeFromText)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$NodeConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constant/NodeConfig.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$StyleObjects$2f$breakOutItem$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/StyleObjects/breakOutItem.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$StyleObjects$2f$header$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/StyleObjects/header.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$StyleObjects$2f$NodeContainer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/StyleObjects/NodeContainer.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$StyleObjects$2f$primativeValue$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/StyleObjects/primativeValue.ts [app-client] (ecmascript)");
;
;
;
;
;
function calculateNodeSizeFromText(node) {
    const items = node.values.length + node.breakOuts.length;
    const height = items * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$NodeConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NODE_CONFIG"].heightItem + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$NodeConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NODE_CONFIG"].heightHeader;
    return {
        width: 400,
        height: height + 8
    };
}
function buildObjectNode({ type, values, breakOuts }) {
    // Base Node
    const NODE = document.createElement("div");
    NODE.style.cssText = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$StyleObjects$2f$NodeContainer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeContainerCSSText"];
    // 🏗️ Build Header ------------------------------------------------------
    const header = document.createElement("div");
    Object.assign(header.style, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$StyleObjects$2f$header$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NCHeader"]);
    const labelContainer = document.createElement("div");
    Object.assign(labelContainer.style, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$StyleObjects$2f$header$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NCHeaderLabel"]);
    const icon = document.createElement("span");
    Object.assign(icon.style, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$StyleObjects$2f$header$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NCHeaderLabelIcon"]);
    icon.innerText = "🧩"; // Just to get size
    const labelText = document.createElement("p");
    labelText.innerText = "Label"; // You can replace this with `label` if needed
    labelContainer.appendChild(icon);
    labelContainer.appendChild(labelText);
    const typeText = document.createElement("p");
    Object.assign(typeText.style, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$StyleObjects$2f$header$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NCHeaderSubText"]);
    typeText.innerText = type;
    header.appendChild(labelContainer);
    header.appendChild(typeText);
    NODE.appendChild(header);
    // 🏗️ Build Values ------------------------------------------------------
    const valueContainer = document.createElement("div");
    Object.assign(valueContainer.style, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$StyleObjects$2f$primativeValue$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["primativeValueContainerStyle"]);
    values.forEach((v)=>{
        const valueRow = document.createElement("div");
        Object.assign(valueRow.style, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$StyleObjects$2f$primativeValue$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyPairValueStyle"]);
        valueRow.innerText = v;
        valueContainer.appendChild(valueRow);
    });
    NODE.appendChild(valueContainer);
    // 🏗️ Build BreakOuts ------------------------------------------------------
    const breakOutContainer = document.createElement("div");
    Object.assign(breakOutContainer.style, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$StyleObjects$2f$breakOutItem$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["breakOutContainerStyle"]);
    breakOuts.forEach((b)=>{
        const row = document.createElement("div");
        Object.assign(row.style, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$StyleObjects$2f$breakOutItem$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["breakOutItemStyle"]);
        const left = document.createElement("div");
        Object.assign(left.style, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$StyleObjects$2f$breakOutItem$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["breakOutItemStartStyle"]);
        left.innerText = b.keyname;
        const right = document.createElement("div");
        Object.assign(right.style, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$StyleObjects$2f$breakOutItem$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["breakOutItemEndStyle"]);
        right.innerText = `(${b.type})`;
        row.appendChild(left);
        row.appendChild(right);
        breakOutContainer.appendChild(row);
    });
    NODE.appendChild(breakOutContainer);
    return NODE;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/editor/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// app/home/page.tsx
__turbopack_context__.s({
    "default": (()=>HomePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$editor$2f$editorStyle$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/editor/editorStyle.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reaflow$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/reaflow/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useJsonGraph$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useJsonGraph.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editors$2f$JsonEditor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/editors/JsonEditor.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$formatNodeToTextContent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/formatNodeToTextContent.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$calculateNodeSize$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/calculateNodeSize.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function HomePage() {
    _s();
    const { nodes, edges, handleChange } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useJsonGraph$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useJsonGraph"])();
    const reaflowEdges = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomePage.useMemo[reaflowEdges]": ()=>{
            return edges.map({
                "HomePage.useMemo[reaflowEdges]": (edge)=>({
                        id: edge.id,
                        from: edge.from,
                        to: edge.to
                    })
            }["HomePage.useMemo[reaflowEdges]"]);
        }
    }["HomePage.useMemo[reaflowEdges]"], [
        edges
    ]);
    const reaflowNodes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomePage.useMemo[reaflowNodes]": ()=>{
            return nodes.map({
                "HomePage.useMemo[reaflowNodes]": (node)=>{
                    const content = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$formatNodeToTextContent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractFormattedNodeData"])(node);
                    const { width, height } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$calculateNodeSize$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateNodeSizeFromText"])(content);
                    return {
                        id: node.id,
                        data: node,
                        height,
                        width
                    };
                }
            }["HomePage.useMemo[reaflowNodes]"]);
        }
    }["HomePage.useMemo[reaflowNodes]"], [
        nodes
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$editor$2f$editorStyle$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].editor,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editors$2f$JsonEditor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                handleChange: handleChange
            }, void 0, false, {
                fileName: "[project]/src/app/editor/page.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reaflow$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Canvas"], {
                nodes: reaflowNodes,
                edges: reaflowEdges,
                direction: "RIGHT",
                layoutOptions: {
                    "elk.algorithm": "layered",
                    "elk.direction": "RIGHT",
                    "elk.spacing.nodeNode": "500",
                    "elk.layered.spacing.nodeNodeBetweenLayers": "100"
                }
            }, void 0, false, {
                fileName: "[project]/src/app/editor/page.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/editor/page.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_s(HomePage, "DcpQ5YfqbXX/0fmJx5C0SnUqRVE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useJsonGraph$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useJsonGraph"]
    ];
});
_c = HomePage;
var _c;
__turbopack_context__.k.register(_c, "HomePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_60f41be0._.js.map