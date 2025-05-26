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
"[project]/src/assets/mock/jsonMock.json (json)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v(JSON.parse("{\"user\":{\"id\":123,\"name\":\"Oscar Throedsson\",\"email\":\"oscar@example.com\",\"isActive\":true,\"age\":32,\"bio\":null,\"location\":{\"city\":\"Malmö\",\"country\":\"Sweden\",\"coordinates\":{\"lat\":55.604981,\"lng\":13.003822}},\"preferences\":{\"theme\":\"dark\",\"language\":\"sv\",\"notifications\":{\"email\":true,\"sms\":false,\"push\":true}}},\"skills\":[\"JavaScript\",\"TypeScript\",\"React\",\"Node.js\"],\"scoreHistory\":[95,87,78,99,85,92],\"uniformObjectsExact\":[{\"type\":\"fruit\",\"name\":\"apple\"},{\"type\":\"fruit\",\"name\":\"apple\"},{\"type\":\"fruit\",\"name\":\"apple\"}],\"uniformObjects\":[{\"id\":1,\"label\":\"One\"},{\"id\":2,\"label\":\"Two\"},{\"id\":3,\"label\":\"Three\"}],\"stringArray\":[\"alpha\",\"beta\",\"gamma\",\"delta\"],\"numberArray\":[1,2,3,4,5,6,7],\"mixedArray\":[\"hello\",42,true,null,{\"nested\":\"object\",\"value\":[1,2,3]},[true,false]],\"emptyArray\":[],\"emptyObject\":{},\"projects\":[{\"title\":\"Sanitas Health\",\"stack\":[\"Node.js\",\"React\",\"MongoDB\"],\"meta\":{\"stars\":420,\"forks\":12}},{\"title\":\"TypeHub\",\"stack\":[\"Next.js\",\"TypeScript\"],\"meta\":{\"stars\":250,\"forks\":5}}]}"));}}),
"[project]/src/components/PrimativeValue/editors/JsonEditor.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
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
                fileName: "[project]/src/components/PrimativeValue/editors/JsonEditor.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            hasErrors && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    color: "red"
                },
                children: "Fix JSON errors before continuing."
            }, void 0, false, {
                fileName: "[project]/src/components/PrimativeValue/editors/JsonEditor.tsx",
                lineNumber: 56,
                columnNumber: 21
            }, this)
        ]
    }, void 0, true);
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$parseJSON$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/parseJSON.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$validation$2f$isJson$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/validation/isJson.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
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
            Object.entries(json).map(([key, val])=>{
                console.log("🔑: ", key);
                console.log("💎 val: ", val);
            });
            // console.log("userObj: ", json[userInputKey]);
            // const result = extractNodes();
            // console.log("result: ", result);
            // setNodes(result.nodes);
            // setEdges(result.edges);
            setError(null);
        } catch  {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PrimativeValue$2f$editors$2f$JsonEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/PrimativeValue/editors/JsonEditor.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useJsonGraph$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useJsonGraph.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function HomePage() {
    const { nodes, handleChange } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useJsonGraph$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useJsonGraph"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        console.log("nodes: ", nodes);
    }, [
        nodes
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$editor$2f$editorStyle$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].editor,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PrimativeValue$2f$editors$2f$JsonEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                handleChange: handleChange
            }, void 0, false, {
                fileName: "[project]/src/app/editor/page.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reaflow$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Canvas"], {}, void 0, false, {
                fileName: "[project]/src/app/editor/page.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/editor/page.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__a07841eb._.js.map