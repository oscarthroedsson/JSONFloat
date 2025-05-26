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
        currentNode.label = `${currentNode.label} (array)`;
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
"[project]/src/constant/brandIcons.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "JSONFloatIconNames": (()=>JSONFloatIconNames)
});
const JSONFloatIconNames = {
    object: "Braces",
    array: "Brackets",
    key: "KeySquare"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/Icons/Icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Icon)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__icons$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/index.js [app-client] (ecmascript) <export * as icons>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
function Icon({ name, size = 24, color, className, ...props }) {
    // Get the icon from the icons object
    const iconComponent = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__icons$3e$__["icons"][name];
    if (!iconComponent) {
        console.warn(`Icon "${String(name)}" not found in Lucide React`);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__icons$3e$__["icons"]["AlarmClock"], {
            size,
            color,
            className,
            ...props
        });
    }
    // Use createElement to render the icon
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(iconComponent, {
        size,
        color,
        className,
        ...props
    });
}
_c = Icon;
var _c;
__turbopack_context__.k.register(_c, "Icon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/NodeContainer/style.module.css [app-client] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "children": "style-module__ZC0-Xa__children",
  "header": "style-module__ZC0-Xa__header",
  "label": "style-module__ZC0-Xa__label",
  "nodeContainer": "style-module__ZC0-Xa__nodeContainer",
});
}}),
"[project]/src/components/NodeContainer/NodeContainer.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>NodeContainer)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$brandIcons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constant/brandIcons.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icons$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Icons/Icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NodeContainer$2f$style$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/NodeContainer/style.module.css [app-client] (css module)");
;
;
;
;
function NodeContainer({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NodeContainer$2f$style$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].nodeContainer,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NodeContainer$2f$style$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NodeContainer$2f$style$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icons$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                name: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$brandIcons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JSONFloatIconNames"][props.type]
                            }, void 0, false, {
                                fileName: "[project]/src/components/NodeContainer/NodeContainer.tsx",
                                lineNumber: 17,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: props.label
                            }, void 0, false, {
                                fileName: "[project]/src/components/NodeContainer/NodeContainer.tsx",
                                lineNumber: 18,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/NodeContainer/NodeContainer.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: props.type
                    }, void 0, false, {
                        fileName: "[project]/src/components/NodeContainer/NodeContainer.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/NodeContainer/NodeContainer.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NodeContainer$2f$style$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].children,
                children: props.children
            }, void 0, false, {
                fileName: "[project]/src/components/NodeContainer/NodeContainer.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/NodeContainer/NodeContainer.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = NodeContainer;
var _c;
__turbopack_context__.k.register(_c, "NodeContainer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/Values/PrimativeValueList/style.module.css [app-client] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "primativeValueList": "style-module__ZtI3rG__primativeValueList",
});
}}),
"[project]/src/components/Values/PrimativeValueList/PrimativeValueList.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>PrimativeValueList)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Values$2f$PrimativeValueList$2f$style$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/Values/PrimativeValueList/style.module.css [app-client] (css module)");
;
;
function PrimativeValueList({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Values$2f$PrimativeValueList$2f$style$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].primativeValueList,
        children: props.children
    }, void 0, false, {
        fileName: "[project]/src/components/Values/PrimativeValueList/PrimativeValueList.tsx",
        lineNumber: 7,
        columnNumber: 10
    }, this);
}
_c = PrimativeValueList;
var _c;
__turbopack_context__.k.register(_c, "PrimativeValueList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/Values/PrimativeValue/style.module.css [app-client] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "footer": "style-module__W9U1cG__footer",
  "keyPairValue": "style-module__W9U1cG__keyPairValue",
  "keyValue": "style-module__W9U1cG__keyValue",
  "primativeValueContainer": "style-module__W9U1cG__primativeValueContainer",
});
}}),
"[project]/src/components/Values/PrimativeValue/primativeValue.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// interface PrimativeValueProps {
//   dataValue: string | null | number | boolean;
//   keyValue: string;
// }
__turbopack_context__.s({
    "default": (()=>PrimativeValue)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Values$2f$PrimativeValue$2f$style$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/Values/PrimativeValue/style.module.css [app-client] (css module)");
;
;
function PrimativeValue({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Values$2f$PrimativeValue$2f$style$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].primativeValueContainer,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Values$2f$PrimativeValue$2f$style$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].keyPairValue,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Values$2f$PrimativeValue$2f$style$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].keyValue,
                        children: props.keyName
                    }, void 0, false, {
                        fileName: "[project]/src/components/Values/PrimativeValue/primativeValue.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: props.dataType
                    }, void 0, false, {
                        fileName: "[project]/src/components/Values/PrimativeValue/primativeValue.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Values/PrimativeValue/primativeValue.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Values$2f$PrimativeValue$2f$style$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].footer,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tagVariationsContainer",
                        children: [
                            "string",
                            "number",
                            "null"
                        ].map((value, index)=>{
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "tag tagline sm",
                                "data-datavalue": `${props.value}`
                            }, index, false, {
                                fileName: "[project]/src/components/Values/PrimativeValue/primativeValue.tsx",
                                lineNumber: 24,
                                columnNumber: 20
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/Values/PrimativeValue/primativeValue.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "tag tagline lg",
                        "data-datavalue": `${props.value}`
                    }, void 0, false, {
                        fileName: "[project]/src/components/Values/PrimativeValue/primativeValue.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Values/PrimativeValue/primativeValue.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Values/PrimativeValue/primativeValue.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = PrimativeValue;
var _c;
__turbopack_context__.k.register(_c, "PrimativeValue");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/BreakOuts/BreakOutList/style.module.css [app-client] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "breakOutList": "style-module__V5SPwq__breakOutList",
});
}}),
"[project]/src/components/BreakOuts/BreakOutList/BreakOutsList.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>BreakOutsList)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BreakOuts$2f$BreakOutList$2f$style$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/BreakOuts/BreakOutList/style.module.css [app-client] (css module)");
;
;
function BreakOutsList({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BreakOuts$2f$BreakOutList$2f$style$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].breakOutList,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/BreakOuts/BreakOutList/BreakOutsList.tsx",
        lineNumber: 8,
        columnNumber: 10
    }, this);
}
_c = BreakOutsList;
var _c;
__turbopack_context__.k.register(_c, "BreakOutsList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/BreakOuts/BreakOutItem/styule.module.css [app-client] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "breakOutItem": "styule-module__44z_5a__breakOutItem",
});
}}),
"[project]/src/components/BreakOuts/BreakOutItem/BreakOutItem.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>BreakOutItem)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icons$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Icons/Icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$brandIcons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constant/brandIcons.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BreakOuts$2f$BreakOutItem$2f$styule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/BreakOuts/BreakOutItem/styule.module.css [app-client] (css module)");
;
;
;
;
function BreakOutItem({ item }) {
    if (!item?.type) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BreakOuts$2f$BreakOutItem$2f$styule$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].breakOutItem,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icons$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        name: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$brandIcons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JSONFloatIconNames"][item.type]
                    }, void 0, false, {
                        fileName: "[project]/src/components/BreakOuts/BreakOutItem/BreakOutItem.tsx",
                        lineNumber: 15,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: item.key
                    }, void 0, false, {
                        fileName: "[project]/src/components/BreakOuts/BreakOutItem/BreakOutItem.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/BreakOuts/BreakOutItem/BreakOutItem.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: item.items
                }, void 0, false, {
                    fileName: "[project]/src/components/BreakOuts/BreakOutItem/BreakOutItem.tsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/BreakOuts/BreakOutItem/BreakOutItem.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/BreakOuts/BreakOutItem/BreakOutItem.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = BreakOutItem;
var _c;
__turbopack_context__.k.register(_c, "BreakOutItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/customnode/customNode.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "CustomNode": (()=>CustomNode)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reaflow$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/reaflow/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NodeContainer$2f$NodeContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/NodeContainer/NodeContainer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Values$2f$PrimativeValueList$2f$PrimativeValueList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Values/PrimativeValueList/PrimativeValueList.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Values$2f$PrimativeValue$2f$primativeValue$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Values/PrimativeValue/primativeValue.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BreakOuts$2f$BreakOutList$2f$BreakOutsList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/BreakOuts/BreakOutList/BreakOutsList.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BreakOuts$2f$BreakOutItem$2f$BreakOutItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/BreakOuts/BreakOutItem/BreakOutItem.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
function CustomNode(props) {
    const data = props.properties?.data;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reaflow$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Node"], {
        ...props,
        style: {
            backgroundColor: "transparent",
            border: "none",
            boxShadow: "none"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("foreignObject", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NodeContainer$2f$NodeContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                label: data.label,
                type: "object",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Values$2f$PrimativeValueList$2f$PrimativeValueList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        children: data.data?.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Values$2f$PrimativeValue$2f$primativeValue$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                keyName: item.key,
                                value: item.value,
                                dataType: item.dataType
                            }, index, false, {
                                fileName: "[project]/src/components/customnode/customNode.tsx",
                                lineNumber: 18,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/customnode/customNode.tsx",
                        lineNumber: 16,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BreakOuts$2f$BreakOutList$2f$BreakOutsList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        children: data.breakouts?.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BreakOuts$2f$BreakOutItem$2f$BreakOutItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    item: item
                                }, void 0, false, {
                                    fileName: "[project]/src/components/customnode/customNode.tsx",
                                    lineNumber: 24,
                                    columnNumber: 17
                                }, this)
                            }, index, false, {
                                fileName: "[project]/src/components/customnode/customNode.tsx",
                                lineNumber: 23,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/customnode/customNode.tsx",
                        lineNumber: 21,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/customnode/customNode.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/customnode/customNode.tsx",
            lineNumber: 14,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/customnode/customNode.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = CustomNode;
var _c;
__turbopack_context__.k.register(_c, "CustomNode");
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$customnode$2f$customNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/customnode/customNode.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
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
                "HomePage.useMemo[reaflowNodes]": (node)=>({
                        id: node.id,
                        text: node.label,
                        data: node
                    })
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
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reaflow$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Canvas"], {
                nodes: reaflowNodes,
                edges: reaflowEdges,
                direction: "RIGHT" // eller "DOWN", "LEFT", "UP"
                ,
                layoutOptions: {
                    "elk.algorithm": "layered",
                    "elk.direction": "RIGHT",
                    "elk.spacing.nodeNode": "80",
                    "elk.layered.spacing.nodeNodeBetweenLayers": "100"
                },
                node: (nodeProps)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$customnode$2f$customNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomNode"], {
                        ...nodeProps
                    }, void 0, false, {
                        fileName: "[project]/src/app/editor/page.tsx",
                        lineNumber: 44,
                        columnNumber: 30
                    }, void 0)
            }, void 0, false, {
                fileName: "[project]/src/app/editor/page.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/editor/page.tsx",
        lineNumber: 32,
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

//# sourceMappingURL=src_68022d75._.js.map