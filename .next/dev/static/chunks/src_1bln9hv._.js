(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/MSWComponent.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MSWProvider",
    ()=>MSWProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$handlers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/mocks/handlers.ts [app-client] (ecmascript)");
'use client';
;
;
;
const mockingEnabledPromise = ("TURBOPACK compile-time truthy", 1) ? __turbopack_context__.A("[project]/src/mocks/browser.ts [app-client] (ecmascript, async loader)").then(async ({ default: worker })=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    await worker.start({
        onUnhandledRequest (request, print) {
            if (request.url.includes('_next')) {
                return;
            }
            print.warning();
        }
    });
    worker.use(...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mocks$2f$handlers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handlers"]);
    console.log(worker.listHandlers());
}) : "TURBOPACK unreachable";
function MSWProvider({ children }) {
    // If MSW is enabled, we need to wait for the worker to start,
    // so we wrap the children in a Suspense boundary until it's ready.
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: null,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MSWProviderWrapper, {
            children: children
        }, void 0, false, {
            fileName: "[project]/src/app/MSWComponent.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/MSWComponent.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c = MSWProvider;
function MSWProviderWrapper({ children }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(mockingEnabledPromise);
    return children;
}
_c1 = MSWProviderWrapper;
var _c, _c1;
__turbopack_context__.k.register(_c, "MSWProvider");
__turbopack_context__.k.register(_c1, "MSWProviderWrapper");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/mocks/handlers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";
