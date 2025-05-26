module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/src/app/editor/editorStyle.module.css [app-ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "editor": "editorStyle-module__g5GrRa__editor",
});
}}),
"[project]/src/utils/extractNodes.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
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
}}),
"[project]/src/utils/parseJSON.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
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
}}),
"[project]/src/validation/isJson.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
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
}}),
"[project]/src/hooks/useJsonGraph.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "useJsonGraph": (()=>useJsonGraph)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$extractNodes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/extractNodes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$parseJSON$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/parseJSON.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$validation$2f$isJson$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/validation/isJson.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
;
;
function useJsonGraph() {
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [nodes, setNodes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [edges, setEdges] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    function handleChange(value) {
        setInput(value);
        try {
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$validation$2f$isJson$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidJson"])(value)) {
                return console.error("🚨 No valid JSON");
            }
            const json = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$parseJSON$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["unpackJsonData"])(value);
            console.log("json: ", json);
            const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$extractNodes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractNodes"])(json);
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
}}),
"[project]/src/assets/mock/jsonMock.json (json)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v(JSON.parse("{\"user\":{\"id\":123,\"name\":\"Oscar Throedsson\",\"email\":\"oscar@example.com\",\"isActive\":true,\"age\":32,\"bio\":null,\"location\":{\"city\":\"Malmö\",\"country\":\"Sweden\",\"coordinates\":{\"lat\":55.604981,\"lng\":13.003822}},\"preferences\":{\"theme\":\"dark\",\"language\":\"sv\",\"notifications\":{\"email\":true,\"sms\":false,\"push\":true}}},\"skills\":[\"JavaScript\",\"TypeScript\",\"React\",\"Node.js\"],\"scoreHistory\":[95,87,78,99,85,92],\"uniformObjectsExact\":[{\"type\":\"fruit\",\"name\":\"apple\"},{\"type\":\"fruit\",\"name\":\"apple\"},{\"type\":\"fruit\",\"name\":\"apple\"}],\"uniformObjects\":[{\"id\":1,\"label\":\"One\"},{\"id\":2,\"label\":\"Two\"},{\"id\":3,\"label\":\"Three\"}],\"stringArray\":[\"alpha\",\"beta\",\"gamma\",\"delta\"],\"numberArray\":[1,2,3,4,5,6,7],\"mixedArray\":[\"hello\",42,true,null,{\"nested\":\"object\",\"value\":[1,2,3]},[true,false]],\"emptyArray\":[],\"emptyObject\":{},\"projects\":[{\"title\":\"Sanitas Health\",\"stack\":[\"Node.js\",\"React\",\"MongoDB\"],\"meta\":{\"stars\":420,\"forks\":12}},{\"title\":\"TypeHub\",\"stack\":[\"Next.js\",\"TypeScript\"],\"meta\":{\"stars\":250,\"forks\":5}}]}"));}}),
"[project]/src/components/editors/JsonEditor.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>JSONEditor)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$monaco$2d$editor$2f$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@monaco-editor/react/dist/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$monaco$2d$editor$2f$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@monaco-editor/react/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$mock$2f$jsonMock$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/assets/mock/jsonMock.json (json)");
;
;
;
;
function JSONEditor({ handleChange, ...props }) {
    const [hasErrors, setHasErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const editorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$monaco$2d$editor$2f$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Editor"], {
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
            hasErrors && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
}}),
"[project]/src/components/NodeContainer/PrimativeValue/style.module.css [app-ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "footer": "style-module__Ah7F4W__footer",
  "keyPairValue": "style-module__Ah7F4W__keyPairValue",
  "keyValue": "style-module__Ah7F4W__keyValue",
  "primativeValueContainer": "style-module__Ah7F4W__primativeValueContainer",
});
}}),
"[project]/src/components/NodeContainer/PrimativeValue/primativeValue.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>PrimativeValue)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NodeContainer$2f$PrimativeValue$2f$style$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/NodeContainer/PrimativeValue/style.module.css [app-ssr] (css module)");
;
;
function PrimativeValue({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NodeContainer$2f$PrimativeValue$2f$style$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].primativeValueContainer,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NodeContainer$2f$PrimativeValue$2f$style$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].keyPairValue,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NodeContainer$2f$PrimativeValue$2f$style$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].keyValue,
                        children: props.keyName
                    }, void 0, false, {
                        fileName: "[project]/src/components/NodeContainer/PrimativeValue/primativeValue.tsx",
                        lineNumber: 13,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: props.dataType
                    }, void 0, false, {
                        fileName: "[project]/src/components/NodeContainer/PrimativeValue/primativeValue.tsx",
                        lineNumber: 14,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/NodeContainer/PrimativeValue/primativeValue.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NodeContainer$2f$PrimativeValue$2f$style$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].footer,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tagVariationsContainer",
                        children: [
                            "string",
                            "number",
                            "null"
                        ].map((value, index)=>{
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "tag tagline sm",
                                "data-datavalue": `${props.value}`
                            }, index, false, {
                                fileName: "[project]/src/components/NodeContainer/PrimativeValue/primativeValue.tsx",
                                lineNumber: 20,
                                columnNumber: 20
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/NodeContainer/PrimativeValue/primativeValue.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "tag tagline lg",
                        "data-datavalue": `${props.value}`
                    }, void 0, false, {
                        fileName: "[project]/src/components/NodeContainer/PrimativeValue/primativeValue.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/NodeContainer/PrimativeValue/primativeValue.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/NodeContainer/PrimativeValue/primativeValue.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/NodeContainer/BreakOuts/BreakOutList/style.module.css [app-ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "breakOutList": "style-module__REhfCG__breakOutList",
});
}}),
"[project]/src/components/NodeContainer/BreakOuts/BreakOutList/BreakOutsList.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>BreakOutsList)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NodeContainer$2f$BreakOuts$2f$BreakOutList$2f$style$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/NodeContainer/BreakOuts/BreakOutList/style.module.css [app-ssr] (css module)");
;
;
function BreakOutsList({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NodeContainer$2f$BreakOuts$2f$BreakOutList$2f$style$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].breakOutList,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/NodeContainer/BreakOuts/BreakOutList/BreakOutsList.tsx",
        lineNumber: 8,
        columnNumber: 10
    }, this);
}
}}),
"[project]/src/components/Icons/Icon.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Icon)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__icons$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/index.js [app-ssr] (ecmascript) <export * as icons>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
function Icon({ name, size = 24, color, className, ...props }) {
    // Get the icon from the icons object
    const iconComponent = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__icons$3e$__["icons"][name];
    if (!iconComponent) {
        console.warn(`Icon "${String(name)}" not found in Lucide React`);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__icons$3e$__["icons"]["AlarmClock"], {
            size,
            color,
            className,
            ...props
        });
    }
    // Use createElement to render the icon
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])(iconComponent, {
        size,
        color,
        className,
        ...props
    });
}
}}),
"[project]/src/constant/brandIcons.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "JSONFloatIconNames": (()=>JSONFloatIconNames)
});
const JSONFloatIconNames = {
    object: "Braces",
    array: "Brackets",
    key: "KeySquare"
};
}}),
"[project]/src/components/NodeContainer/BreakOuts/BreakOutItem/style.module.css [app-ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "breakOutItem": "style-module__RRdZ_q__breakOutItem",
});
}}),
"[project]/src/components/NodeContainer/BreakOuts/BreakOutItem/BreakOutItem.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>BreakOutItem)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icons$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Icons/Icon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$brandIcons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constant/brandIcons.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NodeContainer$2f$BreakOuts$2f$BreakOutItem$2f$style$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/NodeContainer/BreakOuts/BreakOutItem/style.module.css [app-ssr] (css module)");
;
;
;
;
function BreakOutItem({ item }) {
    if (!item?.type) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NodeContainer$2f$BreakOuts$2f$BreakOutItem$2f$style$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].breakOutItem,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icons$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        name: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$brandIcons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JSONFloatIconNames"][item.type]
                    }, void 0, false, {
                        fileName: "[project]/src/components/NodeContainer/BreakOuts/BreakOutItem/BreakOutItem.tsx",
                        lineNumber: 15,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: item.key
                    }, void 0, false, {
                        fileName: "[project]/src/components/NodeContainer/BreakOuts/BreakOutItem/BreakOutItem.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/NodeContainer/BreakOuts/BreakOutItem/BreakOutItem.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: item.items
                }, void 0, false, {
                    fileName: "[project]/src/components/NodeContainer/BreakOuts/BreakOutItem/BreakOutItem.tsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/NodeContainer/BreakOuts/BreakOutItem/BreakOutItem.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/NodeContainer/BreakOuts/BreakOutItem/BreakOutItem.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/NodeContainer/header/style.module.css [app-ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "header": "style-module__XiYRiW__header",
  "label": "style-module__XiYRiW__label",
});
}}),
"[project]/src/components/NodeContainer/header/NCHeader.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>NCHeader)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$brandIcons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constant/brandIcons.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NodeContainer$2f$header$2f$style$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/NodeContainer/header/style.module.css [app-ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icons$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Icons/Icon.tsx [app-ssr] (ecmascript)");
;
;
;
;
function NCHeader({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NodeContainer$2f$header$2f$style$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].header,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NodeContainer$2f$header$2f$style$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].label,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icons$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        name: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$brandIcons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JSONFloatIconNames"][props.type]
                    }, void 0, false, {
                        fileName: "[project]/src/components/NodeContainer/header/NCHeader.tsx",
                        lineNumber: 14,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: props.label
                    }, void 0, false, {
                        fileName: "[project]/src/components/NodeContainer/header/NCHeader.tsx",
                        lineNumber: 15,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/NodeContainer/header/NCHeader.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: props.type
            }, void 0, false, {
                fileName: "[project]/src/components/NodeContainer/header/NCHeader.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/NodeContainer/header/NCHeader.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/NodeContainer/PrimativeValueList/style.module.css [app-ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "primativeValueList": "style-module__GwIHia__primativeValueList",
});
}}),
"[project]/src/components/NodeContainer/PrimativeValueList/PrimativeValueList.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>PrimativeValueList)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NodeContainer$2f$PrimativeValueList$2f$style$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/NodeContainer/PrimativeValueList/style.module.css [app-ssr] (css module)");
;
;
function PrimativeValueList({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NodeContainer$2f$PrimativeValueList$2f$style$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].primativeValueList,
        children: props.children
    }, void 0, false, {
        fileName: "[project]/src/components/NodeContainer/PrimativeValueList/PrimativeValueList.tsx",
        lineNumber: 7,
        columnNumber: 10
    }, this);
}
}}),
"[project]/src/components/NodeContainer/style.module.css [app-ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "nodeContainer": "style-module__ZC0-Xa__nodeContainer",
});
}}),
"[project]/src/components/customnode/customNode.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "CustomNode": (()=>CustomNode)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reaflow$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/reaflow/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NodeContainer$2f$PrimativeValue$2f$primativeValue$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/NodeContainer/PrimativeValue/primativeValue.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NodeContainer$2f$BreakOuts$2f$BreakOutList$2f$BreakOutsList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/NodeContainer/BreakOuts/BreakOutList/BreakOutsList.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NodeContainer$2f$BreakOuts$2f$BreakOutItem$2f$BreakOutItem$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/NodeContainer/BreakOuts/BreakOutItem/BreakOutItem.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NodeContainer$2f$header$2f$NCHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/NodeContainer/header/NCHeader.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NodeContainer$2f$PrimativeValueList$2f$PrimativeValueList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/NodeContainer/PrimativeValueList/PrimativeValueList.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NodeContainer$2f$style$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/NodeContainer/style.module.css [app-ssr] (css module)");
;
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reaflow$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Node"], {
        ...props,
        style: {
            opacity: 0
        },
        width: props.width,
        height: props.height,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("foreignObject", {
            width: props.width + 20,
            height: props.height,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NodeContainer$2f$style$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].nodeContainer,
                style: {
                    position: "absolute",
                    width: `${props.width}px`,
                    height: `${props.height}px`,
                    pointerEvents: "auto",
                    backgroundColor: "white"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NodeContainer$2f$header$2f$NCHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        type: data.type,
                        label: data.label
                    }, void 0, false, {
                        fileName: "[project]/src/components/customnode/customNode.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NodeContainer$2f$PrimativeValueList$2f$PrimativeValueList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        children: data.data?.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NodeContainer$2f$PrimativeValue$2f$primativeValue$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                keyName: item.key,
                                value: item.value,
                                dataType: item.dataType
                            }, index, false, {
                                fileName: "[project]/src/components/customnode/customNode.tsx",
                                lineNumber: 36,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/customnode/customNode.tsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NodeContainer$2f$BreakOuts$2f$BreakOutList$2f$BreakOutsList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        children: data.breakouts?.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NodeContainer$2f$BreakOuts$2f$BreakOutItem$2f$BreakOutItem$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    item: item
                                }, void 0, false, {
                                    fileName: "[project]/src/components/customnode/customNode.tsx",
                                    lineNumber: 42,
                                    columnNumber: 17
                                }, this)
                            }, index, false, {
                                fileName: "[project]/src/components/customnode/customNode.tsx",
                                lineNumber: 41,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/customnode/customNode.tsx",
                        lineNumber: 39,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/customnode/customNode.tsx",
                lineNumber: 23,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/customnode/customNode.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/customnode/customNode.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/utils/formatNodeToTextContent.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
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
}}),
"[project]/src/utils/StyleObjects/breakOutItem.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
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
}}),
"[project]/src/utils/StyleObjects/header.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "NCHeader": (()=>NCHeader),
    "NCHeaderLabel": (()=>NCHeaderLabel),
    "NCHeaderLabelIcon": (()=>NCHeaderLabelIcon),
    "NCHeaderSubText": (()=>NCHeaderSubText)
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
;
}}),
"[project]/src/utils/StyleObjects/primativeValue.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "footerStyle": (()=>footerStyle),
    "keyPairValueStyle": (()=>keyPairValueStyle),
    "keyValueStyle": (()=>keyValueStyle),
    "primativeValueContainerStyle": (()=>primativeValueContainerStyle),
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
}}),
"[project]/src/utils/calculateNodeSize.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "buildObjectNode": (()=>buildObjectNode),
    "calculateNodeSizeFromText": (()=>calculateNodeSizeFromText)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$StyleObjects$2f$breakOutItem$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/StyleObjects/breakOutItem.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$StyleObjects$2f$header$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/StyleObjects/header.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$StyleObjects$2f$primativeValue$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/StyleObjects/primativeValue.ts [app-ssr] (ecmascript)");
;
;
;
function calculateNodeSizeFromText(node) {
    // I just build every type of node with all elements -  got tired of logical errors 🧠
    const tempNode = buildObjectNode(node);
    document.body.appendChild(tempNode);
    console.log("⏰ Timeout ended");
    const rect = tempNode.getBoundingClientRect();
    document.body.removeChild(tempNode);
    console.log({
        height: rect.height + 20,
        width: {
            base: 500,
            reaflow: rect.width,
            plus20: rect.width + 20
        }
    });
    return {
        width: Math.max(500, Math.ceil(rect.width + 20)),
        height: rect.height + 20
    };
}
function buildObjectNode({ type, values, breakOuts }) {
    // Base Node
    const NODE = document.createElement("div");
    //   Object.assign(NODE.style, nodeContainerStyle);
    // 🏗️ Build Header ------------------------------------------------------
    const header = document.createElement("header");
    Object.assign(header.style, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$StyleObjects$2f$header$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NCHeader"]);
    const labelContainer = document.createElement("div");
    Object.assign(labelContainer.style, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$StyleObjects$2f$header$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NCHeaderLabel"]);
    const icon = document.createElement("div");
    Object.assign(icon.style, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$StyleObjects$2f$header$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NCHeaderLabelIcon"]);
    icon.innerText = "🧩"; // Just to get size
    const labelText = document.createElement("p");
    labelText.innerText = "Label"; // You can replace this with `label` if needed
    labelContainer.appendChild(icon);
    labelContainer.appendChild(labelText);
    const typeText = document.createElement("p");
    Object.assign(typeText.style, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$StyleObjects$2f$header$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NCHeaderSubText"]);
    typeText.innerText = type;
    header.appendChild(labelContainer);
    header.appendChild(typeText);
    NODE.appendChild(header);
    // 🏗️ Build Values ------------------------------------------------------
    const valueContainer = document.createElement("div");
    Object.assign(valueContainer.style, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$StyleObjects$2f$primativeValue$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["primativeValueContainerStyle"]);
    values.forEach((v)=>{
        const valueRow = document.createElement("div");
        Object.assign(valueRow.style, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$StyleObjects$2f$primativeValue$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyPairValueStyle"]);
        valueRow.innerText = v;
        valueContainer.appendChild(valueRow);
    });
    NODE.appendChild(valueContainer);
    // 🏗️ Build BreakOuts ------------------------------------------------------
    const breakOutContainer = document.createElement("div");
    Object.assign(breakOutContainer.style, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$StyleObjects$2f$breakOutItem$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["breakOutContainerStyle"]);
    breakOuts.forEach((b)=>{
        const row = document.createElement("div");
        Object.assign(row.style, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$StyleObjects$2f$breakOutItem$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["breakOutItemStyle"]);
        const left = document.createElement("div");
        Object.assign(left.style, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$StyleObjects$2f$breakOutItem$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["breakOutItemStartStyle"]);
        left.innerText = b.keyname;
        const right = document.createElement("div");
        Object.assign(right.style, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$StyleObjects$2f$breakOutItem$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["breakOutItemEndStyle"]);
        right.innerText = `(${b.type})`;
        row.appendChild(left);
        row.appendChild(right);
        breakOutContainer.appendChild(row);
    });
    NODE.appendChild(breakOutContainer);
    return NODE;
}
function BuildArrayNode() {}
}}),
"[project]/src/app/editor/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// app/home/page.tsx
__turbopack_context__.s({
    "default": (()=>HomePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$editor$2f$editorStyle$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/editor/editorStyle.module.css [app-ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reaflow$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/reaflow/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useJsonGraph$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useJsonGraph.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editors$2f$JsonEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/editors/JsonEditor.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$customnode$2f$customNode$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/customnode/customNode.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$formatNodeToTextContent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/formatNodeToTextContent.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$calculateNodeSize$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/calculateNodeSize.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
function HomePage() {
    const { nodes, edges, handleChange } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useJsonGraph$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useJsonGraph"])();
    const reaflowEdges = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return edges.map((edge)=>({
                id: edge.id,
                from: edge.from,
                to: edge.to
            }));
    }, [
        edges
    ]);
    const reaflowNodes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return nodes.map((node)=>{
            const content = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$formatNodeToTextContent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractFormattedNodeData"])(node);
            console.log("🎨 content", content);
            const { width, height } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$calculateNodeSize$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calculateNodeSizeFromText"])(content);
            return {
                id: node.id,
                data: node,
                height,
                width
            };
        });
    }, [
        nodes
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$editor$2f$editorStyle$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].editor,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editors$2f$JsonEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                handleChange: handleChange
            }, void 0, false, {
                fileName: "[project]/src/app/editor/page.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reaflow$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Canvas"], {
                nodes: reaflowNodes,
                edges: reaflowEdges,
                direction: "RIGHT",
                layoutOptions: {
                    "elk.algorithm": "layered",
                    "elk.direction": "RIGHT",
                    "elk.spacing.nodeNode": "500",
                    "elk.layered.spacing.nodeNodeBetweenLayers": "100"
                },
                node: (nodeProps)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$customnode$2f$customNode$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CustomNode"], {
                        ...nodeProps
                    }, void 0, false, {
                        fileName: "[project]/src/app/editor/page.tsx",
                        lineNumber: 55,
                        columnNumber: 30
                    }, void 0)
            }, void 0, false, {
                fileName: "[project]/src/app/editor/page.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/editor/page.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__6200b880._.js.map