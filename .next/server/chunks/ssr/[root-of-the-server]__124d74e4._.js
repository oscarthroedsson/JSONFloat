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
                currentNode.breakouts?.push({
                    key: index.toString(),
                    type: Array.isArray(item) ? "array" : "object"
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
                    type: "array"
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
                    type: "object"
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
"use client";
;
;
;
;
;
function HomePage() {
    const { nodes, edges, handleChange } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useJsonGraph$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useJsonGraph"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        console.log("nodes: ", nodes);
        console.log("edges: ", edges);
    }, [
        nodes,
        edges
    ]);
    // Convert your ParsedNode[] and ParsedEdge[] to reaflow format
    const reaflowNodes = nodes.map((node)=>({
            id: node.id,
            text: node.label,
            data: node
        }));
    const reaflowEdges = edges.map((edge)=>({
            id: edge.id,
            from: edge.from,
            to: edge.to
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$editor$2f$editorStyle$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].editor,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(JSONEditor, {
                handleChange: handleChange
            }, void 0, false, {
                fileName: "[project]/src/app/editor/page.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reaflow$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Canvas"], {
                nodes: reaflowNodes,
                edges: reaflowEdges,
                direction: "RIGHT" // eller "DOWN", "LEFT", "UP"
                ,
                layoutOptions: {
                    "elk.algorithm": "layered",
                    "elk.direction": "RIGHT",
                    "elk.spacing.nodeNode": "80",
                    "elk.layered.spacing.nodeNodeBetweenLayers": "100"
                }
            }, void 0, false, {
                fileName: "[project]/src/app/editor/page.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/editor/page.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__124d74e4._.js.map