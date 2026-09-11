module.exports = [
"[project]/src/app/_components/AddressSearchBar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AddressSearchBar",
    ()=>AddressSearchBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/ui/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Dialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/icons.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$kakao$2d$postcode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/kakao-postcode.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function AddressSearchBar({ value = "", onSelect, submitLabel = "등급 확인하기", className }) {
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("loading");
    const [dialogOpen, setDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const inputId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])();
    // Preload on mount so the dialog's search UI appears without a script-load delay.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$kakao$2d$postcode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadKakaoPostcode"])().then(()=>!cancelled && setStatus("ready"), ()=>!cancelled && setStatus("error"));
        return ()=>{
            cancelled = true;
        };
    }, []);
    const closeDialog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>setDialogOpen(false), []);
    // Callback ref: embed as soon as the dialog's container is in the DOM.
    const embedContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((element)=>{
        if (!element) return;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$kakao$2d$postcode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["embedKakaoPostcode"])(element, (data)=>{
            setDialogOpen(false);
            onSelect(data);
        }, {
            q: value || undefined
        });
    }, [
        onSelect,
        value
    ]);
    function openDialog() {
        if (status === "ready") setDialogOpen(true);
    }
    function handleKeyDown(event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openDialog();
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "search",
        "aria-label": "건물 주소 검색",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex w-full flex-col gap-[var(--space-3)] rounded-[var(--radius-lg)] bg-[var(--surface-card)] p-[var(--space-3)] shadow-[var(--shadow-raised)] sm:flex-row sm:items-start", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: inputId,
                className: "sr-only",
                children: "건물 주소"
            }, void 0, false, {
                fileName: "[project]/src/app/_components/AddressSearchBar.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                id: inputId,
                type: "text",
                readOnly: true,
                value: value,
                onClick: openDialog,
                onKeyDown: handleKeyDown,
                placeholder: "도로명·지번 주소를 검색하세요 (예: 월드컵로 120)",
                leadingIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                    name: "search",
                    size: 22
                }, void 0, false, {
                    fileName: "[project]/src/app/_components/AddressSearchBar.tsx",
                    lineNumber: 90,
                    columnNumber: 22
                }, this),
                error: status === "error" ? "주소 검색을 불러오지 못했어요. 새로고침 후 다시 시도해 주세요." : undefined,
                wrapperClassName: "flex-1",
                className: "h-14 cursor-pointer"
            }, void 0, false, {
                fileName: "[project]/src/app/_components/AddressSearchBar.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                variant: "primary",
                size: "lg",
                loading: status === "loading",
                disabled: status === "error",
                onClick: openDialog,
                trailingIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                    name: "arrow-right",
                    size: 22
                }, void 0, false, {
                    fileName: "[project]/src/app/_components/AddressSearchBar.tsx",
                    lineNumber: 101,
                    columnNumber: 23
                }, this),
                children: submitLabel
            }, void 0, false, {
                fileName: "[project]/src/app/_components/AddressSearchBar.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
                open: dialogOpen,
                onClose: closeDialog,
                title: "주소 검색",
                description: "도로명, 건물명, 지번 중 하나로 검색한 뒤 결과를 선택해 주세요.",
                className: "max-w-[520px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: embedContainerRef,
                    className: "h-[min(470px,60vh)] w-full"
                }, void 0, false, {
                    fileName: "[project]/src/app/_components/AddressSearchBar.tsx",
                    lineNumber: 113,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/_components/AddressSearchBar.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/_components/AddressSearchBar.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/_components/HomeHero.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HomeHero",
    ()=>HomeHero
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/ui/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/icons.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$address$2d$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/address-id.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eco$2d$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/eco-api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$kakao$2d$postcode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/kakao-postcode.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$last$2d$search$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/last-search.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$_components$2f$AddressSearchBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/_components/AddressSearchBar.tsx [app-ssr] (ecmascript)");
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
/** Same footprint as `EnergyGradeBadge size="lg"`, in neutral grey, for "no grade yet". */ function UnknownGradeBadge({ caption, pulsing = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "inline-flex shrink-0 flex-col items-center gap-[var(--space-2)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `flex h-[116px] w-[116px] items-center justify-center rounded-[var(--radius-lg)] border-[3px] border-[var(--ink-300)] bg-[var(--surface-sunken)] font-brand text-[64px] font-black leading-none text-[var(--ink-400)]${pulsing ? " animate-pulse" : ""}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        "aria-hidden": "true",
                        children: "?"
                    }, void 0, false, {
                        fileName: "[project]/src/app/_components/HomeHero.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "sr-only",
                        children: "등급 미확인"
                    }, void 0, false, {
                        fileName: "[project]/src/app/_components/HomeHero.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/_components/HomeHero.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "whitespace-nowrap text-[length:var(--text-caption-size)] font-medium text-[var(--text-muted)]",
                children: caption
            }, void 0, false, {
                fileName: "[project]/src/app/_components/HomeHero.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/_components/HomeHero.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
const CAPTIONS = {
    idle: "주소 입력 전",
    loading: "성적표를 불러오는 중…",
    error: "조회 실패"
};
function HomeHero() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [picked, setPicked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("idle");
    // Ignores responses for an address the user has since replaced.
    const latestRequest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const address = picked ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$kakao$2d$postcode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toSelectedAddress"])(picked) : "";
    async function handleSelect(data) {
        const requestId = ++latestRequest.current;
        setPicked(data);
        setStatus("loading");
        // beec keys its match on the 지번 address, so that's what goes into the URL and the nav's "last search".
        const jibunAddress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eco$2d$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toJibunAddress"])(data) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$kakao$2d$postcode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toSelectedAddress"])(data);
        try {
            const match = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eco$2d$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["matchPostcodeAddress"])(data);
            if (requestId !== latestRequest.current) return;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$last$2d$search$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rememberLastSearch"])(jibunAddress);
            if (match.found) {
                // The 건물명 rides inside the id, so the report and the guide resolve the same building on multi-building lots.
                router.push(`/report/${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$address$2d$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodeAddressId"])(jibunAddress, data.buildingName)}`);
            } else {
                router.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$last$2d$search$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["searchHref"])(jibunAddress));
            }
        } catch  {
            if (requestId === latestRequest.current) setStatus("error");
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-labelledby": "home-hero-title",
        className: "bg-[var(--surface-brand)]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "eco-container grid items-center gap-[var(--space-12)] py-[var(--space-16)] lg:grid-cols-[1.1fr_0.9fr] lg:gap-[var(--space-16)] lg:py-[var(--space-20)]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex min-w-0 flex-col gap-[var(--space-6)]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "inline-flex items-center gap-1.5 self-start whitespace-nowrap rounded-[var(--radius-pill)] bg-[var(--teal-100)] px-4 py-2 text-[16px] font-bold text-[var(--teal-800)]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                    name: "leaf",
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/src/app/_components/HomeHero.tsx",
                                    lineNumber: 80,
                                    columnNumber: 13
                                }, this),
                                "탄소중립 의사결정 플랫폼"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/_components/HomeHero.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            id: "home-hero-title",
                            className: "font-brand text-[40px] font-black leading-[1.15] tracking-[-0.03em] text-white md:text-[56px]",
                            children: [
                                "AI로 추적하는",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/src/app/_components/HomeHero.tsx",
                                    lineNumber: 88,
                                    columnNumber: 13
                                }, this),
                                "우리 집 에너지 성적표"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/_components/HomeHero.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "max-w-[520px] text-[19px] leading-[1.65] text-[var(--teal-100)] md:text-[21px]",
                            children: "인증 이력이 없는 건물도 공공 데이터로 등급을 추정하고, 맞춤 지원사업까지 연결해 드려요."
                        }, void 0, false, {
                            fileName: "[project]/src/app/_components/HomeHero.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$_components$2f$AddressSearchBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AddressSearchBar"], {
                            value: address,
                            onSelect: handleSelect,
                            className: "max-w-[620px]"
                        }, void 0, false, {
                            fileName: "[project]/src/app/_components/HomeHero.tsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/_components/HomeHero.tsx",
                    lineNumber: 78,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                        padding: "lg",
                        "aria-live": "polite",
                        "aria-busy": status === "loading",
                        className: "flex w-full max-w-[380px] flex-col items-center gap-[var(--space-5)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "flex w-full items-center justify-center gap-[var(--space-2)] rounded-[var(--radius-md)] bg-[var(--surface-sunken)] px-[var(--space-4)] py-[var(--space-3)] text-center text-[17px] break-keep text-[var(--text-muted)]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                        name: "map-pin",
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/_components/HomeHero.tsx",
                                        lineNumber: 105,
                                        columnNumber: 15
                                    }, this),
                                    picked ? address : "주소를 입력하면 에너지 등급을 알려 드려요"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/_components/HomeHero.tsx",
                                lineNumber: 104,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(UnknownGradeBadge, {
                                caption: CAPTIONS[status],
                                pulsing: status === "loading"
                            }, void 0, false, {
                                fileName: "[project]/src/app/_components/HomeHero.tsx",
                                lineNumber: 108,
                                columnNumber: 13
                            }, this),
                            status === "error" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                role: "alert",
                                className: "text-center text-[15px] leading-[1.6] break-keep text-[var(--status-danger)]",
                                children: "등급 서버에 연결하지 못했어요. 백엔드가 켜져 있는지 확인한 뒤 다시 검색해 주세요."
                            }, void 0, false, {
                                fileName: "[project]/src/app/_components/HomeHero.tsx",
                                lineNumber: 110,
                                columnNumber: 15
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                                className: "flex w-full justify-between border-t border-[var(--border-subtle)] pt-[var(--space-4)]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                className: "text-[15px] text-[var(--text-muted)]",
                                                children: "연간 난방비"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/_components/HomeHero.tsx",
                                                lineNumber: 116,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                className: "font-brand text-[24px] font-black text-[var(--ink-300)]",
                                                children: "?"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/_components/HomeHero.tsx",
                                                lineNumber: 117,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/_components/HomeHero.tsx",
                                        lineNumber: 115,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                className: "text-[15px] text-[var(--text-muted)]",
                                                children: "절감 여지"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/_components/HomeHero.tsx",
                                                lineNumber: 120,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                className: "font-brand text-[24px] font-black text-[var(--ink-300)]",
                                                children: "?"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/_components/HomeHero.tsx",
                                                lineNumber: 121,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/_components/HomeHero.tsx",
                                        lineNumber: 119,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/_components/HomeHero.tsx",
                                lineNumber: 114,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/_components/HomeHero.tsx",
                        lineNumber: 98,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/_components/HomeHero.tsx",
                    lineNumber: 97,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/_components/HomeHero.tsx",
            lineNumber: 77,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/_components/HomeHero.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/domain/AiEnergyComment.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AiEnergyComment",
    ()=>AiEnergyComment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/ui/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/icons.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$energy$2d$comment$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/energy-comment.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function AiEnergyComment(props) {
    // `comment === null` doubles as the loading flag, so there's no separate
    // state to resynchronize (and no synchronous setState in the effect body).
    const [comment, setComment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const loading = comment === null;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        fetch("/api/energy-comment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(props)
        }).then((res)=>res.ok ? res.json() : Promise.reject(new Error(`status ${res.status}`))).then((data)=>{
            if (!cancelled) {
                setComment(data.comment ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$energy$2d$comment$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fallbackEnergyComment"])(props));
            }
        }).catch(()=>{
            if (!cancelled) {
                setComment((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$energy$2d$comment$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fallbackEnergyComment"])(props));
            }
        });
        return ()=>{
            cancelled = true;
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        props.grade,
        props.buildingName
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
        tone: "brand",
        padding: "lg",
        className: "flex items-start gap-[var(--space-4)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--teal-600)] text-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                    name: "sparkles",
                    size: 18
                }, void 0, false, {
                    fileName: "[project]/src/components/domain/AiEnergyComment.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/domain/AiEnergyComment.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-w-0 flex-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[length:var(--text-caption-size)] font-bold text-[var(--teal-700)]",
                        children: "AI 한마디 · Gemini"
                    }, void 0, false, {
                        fileName: "[project]/src/components/domain/AiEnergyComment.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-[var(--space-2)] h-5 w-3/4 animate-pulse rounded bg-[var(--teal-100)]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/domain/AiEnergyComment.tsx",
                        lineNumber: 56,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-[var(--space-1)] text-[17px] font-bold leading-relaxed text-[var(--text-strong)]",
                        children: comment
                    }, void 0, false, {
                        fileName: "[project]/src/components/domain/AiEnergyComment.tsx",
                        lineNumber: 58,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/domain/AiEnergyComment.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/domain/AiEnergyComment.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/domain/GradeScale.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GradeScale",
    ()=>GradeScale
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$grades$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/grades.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$domain$2f$grade$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/domain/grade-tokens.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
/** Primary-energy range for a grade, e.g. `"270 ~ 320"`, `"60 미만"`, `"370 이상"`. */ function requirementLabel(code) {
    const { minPrimaryEnergyKwh: min, maxPrimaryEnergyKwh: max } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$grades$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GRADES"][code];
    if (max === null) return `${min} 이상`;
    if (min === 0) return `${max} 미만`;
    return `${min} ~ ${max}`;
}
function GradeScale({ value, selectable = false, showLabels = true, className }) {
    const [picked, setPicked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const open = selectable ? picked ?? value : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-[var(--space-3)]", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: selectable ? "group" : "img",
                "aria-label": `건물 에너지효율등급 척도, 현재 건물은 ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$grades$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GRADES"][value].label}`,
                className: "flex items-end gap-1",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$grades$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GRADE_ORDER"].map((code)=>{
                    const current = code === value;
                    const expanded = code === open;
                    const { color } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$domain$2f$grade$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getGradeColorVars"])(code);
                    const content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "aria-hidden": "true",
                                className: "block w-full transition-[height,opacity] duration-[var(--dur-slow)] ease-[var(--ease-standard)]",
                                style: {
                                    height: expanded ? 96 : current ? 24 : 14,
                                    borderRadius: expanded ? "var(--radius-sm)" : "var(--radius-pill)",
                                    backgroundColor: `var(${color})`,
                                    opacity: current || expanded ? 1 : 0.32,
                                    outline: current && expanded ? "3px solid var(--ink-900)" : "none",
                                    outlineOffset: 2
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/domain/GradeScale.tsx",
                                lineNumber: 48,
                                columnNumber: 15
                            }, this),
                            showLabels ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "aria-hidden": "true",
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("whitespace-nowrap font-brand font-bold tracking-[-0.04em]", code.length > 2 ? "text-[11px]" : "text-[15px]"),
                                style: {
                                    color: current || expanded ? `var(${color})` : "var(--text-muted)"
                                },
                                children: code
                            }, void 0, false, {
                                fileName: "[project]/src/components/domain/GradeScale.tsx",
                                lineNumber: 61,
                                columnNumber: 17
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/domain/GradeScale.tsx",
                        lineNumber: 47,
                        columnNumber: 13
                    }, this);
                    const cellClassName = "flex min-w-0 flex-1 flex-col items-center gap-1.5";
                    if (!selectable) {
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: cellClassName,
                            children: content
                        }, code, false, {
                            fileName: "[project]/src/components/domain/GradeScale.tsx",
                            lineNumber: 78,
                            columnNumber: 15
                        }, this);
                    }
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-pressed": expanded,
                        "aria-label": `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$grades$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GRADES"][code].label}${current ? " (현재 건물)" : ""}`,
                        onClick: ()=>setPicked(code),
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(cellClassName, "cursor-pointer rounded-[var(--radius-sm)]"),
                        children: content
                    }, code, false, {
                        fileName: "[project]/src/components/domain/GradeScale.tsx",
                        lineNumber: 84,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/domain/GradeScale.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            open ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-live": "polite",
                className: "flex flex-wrap items-center gap-[var(--space-3)] rounded-[var(--radius-md)] px-[var(--space-4)] py-[var(--space-3)]",
                style: {
                    backgroundColor: `var(${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$domain$2f$grade$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getGradeColorVars"])(open).soft})`,
                    border: `2px solid var(${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$domain$2f$grade$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getGradeColorVars"])(open).color})`
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "whitespace-nowrap font-brand text-[24px] font-black tracking-[-0.04em]",
                        style: {
                            color: `var(${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$domain$2f$grade$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getGradeColorVars"])(open).color})`
                        },
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$grades$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GRADES"][open].label
                    }, void 0, false, {
                        fileName: "[project]/src/components/domain/GradeScale.tsx",
                        lineNumber: 107,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "min-w-0 flex-1 text-[length:var(--text-body-size)] text-[var(--text-body)]",
                        children: "1차에너지소요량"
                    }, void 0, false, {
                        fileName: "[project]/src/components/domain/GradeScale.tsx",
                        lineNumber: 113,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "whitespace-nowrap font-brand text-[24px] font-black text-[var(--text-strong)]",
                        children: requirementLabel(open)
                    }, void 0, false, {
                        fileName: "[project]/src/components/domain/GradeScale.tsx",
                        lineNumber: 116,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "whitespace-nowrap text-[length:var(--text-caption-size)] text-[var(--text-muted)]",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$grades$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PRIMARY_ENERGY_UNIT"]
                    }, void 0, false, {
                        fileName: "[project]/src/components/domain/GradeScale.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/domain/GradeScale.tsx",
                lineNumber: 99,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/domain/GradeScale.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/domain/grade-tokens.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getGradeColorVars",
    ()=>getGradeColorVars,
    "getGradeOnColor",
    ()=>getGradeOnColor
]);
const GRADE_VAR_SUFFIX = {
    "1+++": "1p3",
    "1++": "1p2",
    "1+": "1p1",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7"
};
/**
 * Text color that stays legible on each grade's solid fill. Precomputed with
 * the design system's `readableOn` rule (WCAG relative luminance: white vs
 * `--ink-900`, whichever contrasts more) against the hex values in
 * `src/app/globals.css` — recompute if the grade palette changes.
 */ const GRADE_ON_COLOR = {
    "1+++": "#ffffff",
    "1++": "#ffffff",
    "1+": "#ffffff",
    "1": "var(--ink-900)",
    "2": "var(--ink-900)",
    "3": "var(--ink-900)",
    "4": "var(--ink-900)",
    "5": "var(--ink-900)",
    "6": "var(--ink-900)",
    "7": "#ffffff"
};
function getGradeColorVars(grade) {
    const suffix = GRADE_VAR_SUFFIX[grade];
    return {
        color: `--grade-${suffix}`,
        soft: `--grade-${suffix}-soft`
    };
}
function getGradeOnColor(grade) {
    return GRADE_ON_COLOR[grade];
}
}),
"[project]/src/components/layout/AppBarNav.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppBarNav",
    ()=>AppBarNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$last$2d$search$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/last-search.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$site$2d$nav$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/site-nav.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function AppBarNav({ defaultBuildingId, className }) {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$site$2d$nav$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildSiteNav"])(pathname, defaultBuildingId, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$last$2d$search$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLastSearchHref"])());
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        "aria-label": "주요 메뉴",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("items-center gap-[var(--space-2)]", className),
        children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                href: item.href,
                "aria-current": item.active ? "page" : undefined,
                className: "inline-flex h-14 items-center whitespace-nowrap rounded-[var(--radius-md)] px-[18px] font-brand text-[18px] font-bold text-[var(--text-body)] transition-colors duration-[var(--dur-fast)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)] aria-[current=page]:bg-[var(--surface-brand-soft)] aria-[current=page]:text-[var(--teal-800)]",
                children: item.label
            }, item.href, false, {
                fileName: "[project]/src/components/layout/AppBarNav.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/layout/AppBarNav.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/layout/MobileNav.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MobileNav",
    ()=>MobileNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/icons.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$last$2d$search$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/last-search.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$site$2d$nav$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/site-nav.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function MobileNav({ defaultBuildingId }) {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$site$2d$nav$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildSiteNav"])(pathname, defaultBuildingId, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$last$2d$search$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLastSearchHref"])());
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const panelId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])();
    const panelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const buttonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!open) return undefined;
        function onKeyDown(event) {
            if (event.key === "Escape") {
                setOpen(false);
                buttonRef.current?.focus();
            }
        }
        function onPointerDown(event) {
            const target = event.target;
            if (panelRef.current && !panelRef.current.contains(target) && !buttonRef.current?.contains(target)) {
                setOpen(false);
            }
        }
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("pointerdown", onPointerDown);
        return ()=>{
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("pointerdown", onPointerDown);
        };
    }, [
        open
    ]);
    const close = ()=>setOpen(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ml-auto lg:hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                ref: buttonRef,
                type: "button",
                "aria-expanded": open,
                "aria-controls": panelId,
                onClick: ()=>setOpen((value)=>!value),
                className: "flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border-subtle)] text-[var(--text-strong)] transition-colors duration-[var(--dur-fast)] hover:bg-[var(--surface-sunken)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "sr-only",
                        children: open ? "메뉴 닫기" : "메뉴 열기"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/MobileNav.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                        name: open ? "close" : "menu",
                        size: 20
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/MobileNav.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/MobileNav.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: panelId,
                ref: panelRef,
                hidden: !open,
                className: "absolute inset-x-0 top-full border-b border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-[var(--shadow-sheet)]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    "aria-label": "모바일 메뉴",
                    className: "eco-container flex flex-col gap-[var(--space-1)] py-[var(--space-3)]",
                    children: [
                        items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: item.href,
                                "aria-current": item.active ? "page" : undefined,
                                onClick: close,
                                className: "rounded-[var(--radius-md)] px-[var(--space-4)] py-[var(--space-3)] font-brand text-[18px] font-bold text-[var(--text-body)] hover:bg-[var(--surface-sunken)] aria-[current=page]:bg-[var(--surface-brand-soft)] aria-[current=page]:text-[var(--teal-800)]",
                                children: item.label
                            }, item.href, false, {
                                fileName: "[project]/src/components/layout/MobileNav.tsx",
                                lineNumber: 78,
                                columnNumber: 13
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-[var(--space-2)] grid grid-cols-2 gap-[var(--space-2)] border-t border-[var(--border-subtle)] pt-[var(--space-3)]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/mypage/notifications",
                                    onClick: close,
                                    className: "inline-flex h-11 items-center justify-center gap-[var(--space-2)] rounded-[var(--radius-md)] border border-[var(--border-subtle)] text-[length:var(--text-label-size)] font-bold text-[var(--text-strong)] hover:bg-[var(--surface-sunken)]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                            name: "bell",
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/MobileNav.tsx",
                                            lineNumber: 94,
                                            columnNumber: 15
                                        }, this),
                                        "알림"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/MobileNav.tsx",
                                    lineNumber: 89,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/login",
                                    onClick: close,
                                    className: "inline-flex h-11 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border-strong)] text-[length:var(--text-label-size)] font-bold text-[var(--text-strong)] hover:bg-[var(--surface-sunken)]",
                                    children: "로그인"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/MobileNav.tsx",
                                    lineNumber: 97,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/MobileNav.tsx",
                            lineNumber: 88,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/MobileNav.tsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/MobileNav.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/MobileNav.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/layout/site-nav.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildSiteNav",
    ()=>buildSiteNav
]);
const BUILDING_ROUTE = /^\/(?:report|guide)\/([^/]+)/;
function isWithin(pathname, prefix) {
    return pathname === prefix || pathname.startsWith(`${prefix}/`);
}
function buildSiteNav(pathname, defaultBuildingId, reportHref) {
    const buildingId = BUILDING_ROUTE.exec(pathname)?.[1] ?? defaultBuildingId;
    return [
        {
            label: "에너지 성적표",
            href: reportHref,
            active: isWithin(pathname, "/report") || isWithin(pathname, "/search")
        },
        {
            label: "개선 하기",
            href: `/guide/${buildingId}`,
            active: isWithin(pathname, "/guide")
        },
        {
            label: "지원사업",
            href: "/programs",
            active: isWithin(pathname, "/programs")
        },
        {
            label: "서비스 소개",
            href: "/about",
            active: isWithin(pathname, "/about")
        }
    ];
}
}),
"[project]/src/components/ui/Badge.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/utils.ts [app-ssr] (ecmascript)");
;
;
const TONE_CLASSES = {
    neutral: "bg-[var(--surface-sunken)] text-[var(--text-body)]",
    brand: "bg-[var(--surface-brand-soft)] text-[var(--teal-700)]",
    good: "bg-[var(--status-good-soft)] text-[var(--status-good)]",
    caution: "bg-[var(--status-caution-soft)] text-[var(--status-caution)]",
    warn: "bg-[var(--status-warn-soft)] text-[var(--status-warn)]",
    danger: "bg-[var(--status-danger-soft)] text-[var(--status-danger)]"
};
function Badge({ tone = "neutral", className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center gap-[var(--space-1)] rounded-[var(--radius-pill)] px-[var(--space-3)] py-[2px] text-[var(--text-caption-size)] font-[var(--weight-medium)] leading-[var(--text-caption-lh)]", TONE_CLASSES[tone], className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Badge.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ui/Button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2d$styles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button-styles.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const Button = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(function Button({ variant, size, fullWidth, loading = false, leadingIcon, trailingIcon, className, disabled, children, type = "button", ...props }, ref) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        ref: ref,
        type: type,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2d$styles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buttonClasses"])({
            variant,
            size,
            fullWidth,
            className
        }),
        disabled: disabled || loading,
        "aria-busy": loading || undefined,
        ...props,
        children: [
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "aria-hidden": "true",
                className: "h-4 w-4 animate-spin rounded-[var(--radius-pill)] border-[var(--border-width-strong)] border-current border-t-transparent"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Button.tsx",
                lineNumber: 48,
                columnNumber: 9
            }, this) : leadingIcon,
            children ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Button.tsx",
                lineNumber: 55,
                columnNumber: 19
            }, this) : null,
            !loading ? trailingIcon : null,
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "sr-only",
                children: "Loading"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Button.tsx",
                lineNumber: 57,
                columnNumber: 18
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Button.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
});
}),
"[project]/src/components/ui/ButtonLink.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ButtonLink",
    ()=>ButtonLink
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2d$styles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button-styles.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/icons.tsx [app-ssr] (ecmascript)");
;
;
;
;
function isExternalHref(href) {
    if (typeof href !== "string") return false;
    return /^https?:\/\//.test(href) || href.startsWith("//");
}
function ButtonLink({ variant, size, fullWidth, className, leadingIcon, trailingIcon, children, href, target, rel, ...props }) {
    const external = isExternalHref(href);
    const resolvedTarget = target ?? (external ? "_blank" : undefined);
    const resolvedRel = rel ?? (external ? "noopener noreferrer" : undefined);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        href: href,
        target: resolvedTarget,
        rel: resolvedRel,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2d$styles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buttonClasses"])({
            variant,
            size,
            fullWidth,
            className
        }),
        ...props,
        children: [
            leadingIcon,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/ui/ButtonLink.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            trailingIcon ?? (external ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                name: "external-link",
                size: 16
            }, void 0, false, {
                fileName: "[project]/src/components/ui/ButtonLink.tsx",
                lineNumber: 60,
                columnNumber: 36
            }, this) : null)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/ButtonLink.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ui/Card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/utils.ts [app-ssr] (ecmascript)");
;
;
const PADDING_CLASSES = {
    none: "p-0",
    sm: "p-[var(--space-4)]",
    md: "p-[var(--pad-card)]",
    lg: "p-[var(--pad-section)]"
};
const ELEVATION_CLASSES = {
    flat: "shadow-none",
    card: "shadow-[var(--shadow-card)]",
    raised: "shadow-[var(--shadow-raised)]"
};
const TONE_CLASSES = {
    default: "border-[var(--border-subtle)] bg-[var(--surface-card)]",
    brand: "border-[var(--teal-100)] bg-[var(--surface-brand-soft)]",
    sunken: "border-transparent bg-[var(--surface-sunken)]",
    accent: "border-[var(--celadon-400)] bg-[var(--surface-accent-soft)]"
};
function Card({ padding = "md", elevation = "card", tone = "default", interactive = false, className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("rounded-[var(--radius-lg)] border", TONE_CLASSES[tone], PADDING_CLASSES[padding], ELEVATION_CLASSES[elevation], interactive && "transition-shadow duration-[var(--dur-base)] ease-[var(--ease-standard)] hover:shadow-[var(--shadow-raised)]", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Card.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("mb-[var(--space-4)] flex flex-col gap-[var(--space-1)]", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Card.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("eco-subhead text-[var(--text-strong)]", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Card.tsx",
        lineNumber: 69,
        columnNumber: 10
    }, this);
}
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-[var(--text-caption-size)] text-[var(--text-muted)]", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Card.tsx",
        lineNumber: 74,
        columnNumber: 5
    }, this);
}
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-[var(--text-body)]", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Card.tsx",
        lineNumber: 82,
        columnNumber: 10
    }, this);
}
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("mt-[var(--space-4)] flex items-center gap-[var(--space-3)]", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Card.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ui/Checkbox.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Checkbox",
    ()=>Checkbox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const Checkbox = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(function Checkbox({ label, description, className, id, ...props }, ref) {
    const generatedId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])();
    const inputId = id ?? generatedId;
    const descId = description ? `${inputId}-description` : undefined;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-start gap-[var(--space-3)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: ref,
                id: inputId,
                type: "checkbox",
                "aria-describedby": descId,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("mt-[2px] h-5 w-5 shrink-0 cursor-pointer rounded-[6px] border-[var(--border-width-strong)] border-[var(--border-strong)] accent-[var(--action-primary)] disabled:cursor-not-allowed disabled:opacity-50", className),
                ...props
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Checkbox.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            label || description ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col",
                children: [
                    label ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: inputId,
                        className: "cursor-pointer text-[var(--text-body-size)] text-[var(--text-strong)]",
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Checkbox.tsx",
                        lineNumber: 41,
                        columnNumber: 13
                    }, this) : null,
                    description ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        id: descId,
                        className: "text-[var(--text-caption-size)] text-[var(--text-muted)]",
                        children: description
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Checkbox.tsx",
                        lineNumber: 49,
                        columnNumber: 13
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/Checkbox.tsx",
                lineNumber: 39,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Checkbox.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
});
}),
"[project]/src/components/ui/Dialog.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dialog",
    ()=>Dialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$IconButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/IconButton.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Dialog({ open, onClose, title, description, children, footer, className, closeOnOverlayClick = true }) {
    const generatedId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])();
    const titleId = `${generatedId}-title`;
    const descId = description ? `${generatedId}-description` : undefined;
    const panelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const previousActiveElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!open) return;
        previousActiveElement.current = document.activeElement;
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const panel = panelRef.current;
        const initialFocusable = panel?.querySelector(FOCUSABLE_SELECTOR);
        (initialFocusable ?? panel)?.focus();
        function handleKeyDown(event) {
            if (event.key === "Escape") {
                event.preventDefault();
                onClose();
                return;
            }
            if (event.key !== "Tab" || !panelRef.current) return;
            const focusables = Array.from(panelRef.current.querySelectorAll(FOCUSABLE_SELECTOR));
            if (focusables.length === 0) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            const active = document.activeElement;
            if (event.shiftKey && active === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && active === last) {
                event.preventDefault();
                first.focus();
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return ()=>{
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = originalOverflow;
            previousActiveElement.current?.focus();
        };
    }, [
        open,
        onClose
    ]);
    if (!open || typeof document === "undefined") return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center p-[var(--space-4)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-hidden": "true",
                onClick: closeOnOverlayClick ? ()=>onClose() : undefined,
                className: "absolute inset-0 bg-[rgb(20_32_30_/_55%)] transition-opacity duration-[var(--dur-base)] ease-[var(--ease-standard)]"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Dialog.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: panelRef,
                role: "dialog",
                "aria-modal": "true",
                "aria-labelledby": titleId,
                "aria-describedby": descId,
                tabIndex: -1,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative z-10 flex max-h-[85vh] w-full max-w-[480px] flex-col gap-[var(--space-4)] overflow-y-auto rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-[var(--pad-section)] shadow-[var(--shadow-overlay)]", className),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start justify-between gap-[var(--space-4)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-[var(--space-1)]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        id: titleId,
                                        className: "eco-subhead text-[var(--text-strong)]",
                                        children: title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/Dialog.tsx",
                                        lineNumber: 116,
                                        columnNumber: 13
                                    }, this),
                                    description ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        id: descId,
                                        className: "text-[var(--text-caption-size)] text-[var(--text-muted)]",
                                        children: description
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/Dialog.tsx",
                                        lineNumber: 120,
                                        columnNumber: 15
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/Dialog.tsx",
                                lineNumber: 115,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$IconButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IconButton"], {
                                icon: "close",
                                label: "Close dialog",
                                variant: "ghost",
                                size: "sm",
                                onClick: onClose
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/Dialog.tsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/Dialog.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this),
                    children,
                    footer ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-end gap-[var(--space-3)]",
                        children: footer
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Dialog.tsx",
                        lineNumber: 129,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/Dialog.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Dialog.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this), document.body);
}
}),
"[project]/src/components/ui/IconButton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IconButton",
    ()=>IconButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/icons.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const VARIANT_CLASSES = {
    solid: "bg-[var(--action-primary)] text-[var(--text-on-primary)] border border-transparent hover:bg-[var(--action-primary-hover)] active:bg-[var(--action-primary-press)]",
    soft: "bg-[var(--surface-brand-soft)] text-[var(--teal-700)] border border-transparent hover:bg-[var(--teal-100)]",
    ghost: "bg-transparent text-[var(--text-body)] border border-transparent hover:bg-[var(--surface-sunken)]",
    outline: "bg-[var(--surface-card)] text-[var(--text-strong)] border border-[var(--border-strong)] hover:bg-[var(--surface-sunken)]"
};
const SIZE_CLASSES = {
    sm: {
        box: "h-9 w-9",
        icon: 16
    },
    md: {
        box: "h-11 w-11",
        icon: 20
    },
    lg: {
        box: "h-14 w-14",
        icon: 24
    }
};
const IconButton = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(function IconButton({ icon, label, variant = "ghost", size = "md", iconSize, className, type = "button", ...props }, ref) {
    const sizing = SIZE_CLASSES[size];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        ref: ref,
        type: type,
        "aria-label": label,
        title: label,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("inline-flex shrink-0 items-center justify-center rounded-[var(--radius-md)] transition-colors duration-[var(--dur-fast)] ease-[var(--ease-standard)] disabled:pointer-events-none disabled:opacity-50", sizing.box, VARIANT_CLASSES[variant], className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
            name: icon,
            size: iconSize ?? sizing.icon
        }, void 0, false, {
            fileName: "[project]/src/components/ui/IconButton.tsx",
            lineNumber: 72,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/IconButton.tsx",
        lineNumber: 59,
        columnNumber: 7
    }, this);
});
}),
"[project]/src/components/ui/Input.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const Input = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(function Input({ label, hint, error, leadingIcon, trailingIcon, className, wrapperClassName, id, "aria-describedby": describedBy, ...props }, ref) {
    const generatedId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])();
    const inputId = id ?? generatedId;
    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const describedByIds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(describedBy, hintId, errorId) || undefined;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-[var(--space-1)]", wrapperClassName),
        children: [
            label ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: inputId,
                className: "text-[var(--text-label-size)] font-[var(--weight-medium)] text-[var(--text-strong)]",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Input.tsx",
                lineNumber: 41,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative flex items-center",
                children: [
                    leadingIcon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "pointer-events-none absolute left-[var(--space-3)] text-[var(--text-muted)]",
                        children: leadingIcon
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Input.tsx",
                        lineNumber: 50,
                        columnNumber: 11
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: ref,
                        id: inputId,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("h-11 w-full rounded-[var(--radius-md)] border bg-[var(--surface-card)] px-[var(--space-3)] text-[var(--text-body-size)] text-[var(--text-strong)] transition-colors duration-[var(--dur-fast)] ease-[var(--ease-standard)] placeholder:text-[var(--text-muted)] disabled:cursor-not-allowed disabled:opacity-50", error ? "border-[var(--status-danger)]" : "border-[var(--border-strong)] focus:border-[var(--border-brand)]", leadingIcon ? "pl-[var(--space-10)]" : undefined, trailingIcon ? "pr-[var(--space-10)]" : undefined, className),
                        "aria-invalid": error ? true : undefined,
                        "aria-describedby": describedByIds,
                        ...props
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Input.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    trailingIcon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "pointer-events-none absolute right-[var(--space-3)] text-[var(--text-muted)]",
                        children: trailingIcon
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Input.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/Input.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            hint && !error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                id: hintId,
                className: "text-[var(--text-caption-size)] text-[var(--text-muted)]",
                children: hint
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Input.tsx",
                lineNumber: 77,
                columnNumber: 9
            }, this) : null,
            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                id: errorId,
                role: "alert",
                className: "text-[var(--text-caption-size)] text-[var(--status-danger)]",
                children: error
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Input.tsx",
                lineNumber: 82,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Input.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
});
}),
"[project]/src/components/ui/Notice.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Notice",
    ()=>Notice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/icons.tsx [app-ssr] (ecmascript)");
;
;
;
const TONES = {
    info: {
        className: "bg-[var(--surface-brand-soft)] text-[var(--teal-800)]",
        icon: "info"
    },
    good: {
        className: "bg-[var(--status-good-soft)] text-[var(--status-good)]",
        icon: "circle-check"
    },
    warn: {
        className: "bg-[var(--status-warn-soft)] text-[var(--status-warn)]",
        icon: "triangle-alert"
    },
    danger: {
        className: "bg-[var(--status-danger-soft)] text-[var(--status-danger)]",
        icon: "triangle-alert"
    }
};
function Notice({ tone = "info", className, children, role = "note", ...props }) {
    const { className: toneClassName, icon } = TONES[tone];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: role,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-[var(--space-3)] rounded-[var(--radius-md)] p-[var(--space-4)] text-[length:var(--text-body-size)] font-medium shadow-[var(--shadow-card)]", toneClassName, className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                name: icon,
                size: 24,
                className: "shrink-0"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Notice.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "flex-1",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Notice.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Notice.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ui/RadioGroup.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RadioGroup",
    ()=>RadioGroup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function RadioGroup({ name, legend, "aria-label": ariaLabel, options, value, defaultValue, onValueChange, className, orientation = "vertical", variant = "plain" }) {
    const generatedName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])();
    const groupName = name ?? generatedName;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("m-0 flex flex-col gap-[var(--space-2)] border-0 p-0", className),
        children: [
            legend ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                className: "mb-[var(--space-1)] text-[var(--text-label-size)] font-[var(--weight-medium)] text-[var(--text-strong)]",
                children: legend
            }, void 0, false, {
                fileName: "[project]/src/components/ui/RadioGroup.tsx",
                lineNumber: 55,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "radiogroup",
                "aria-label": legend ?? ariaLabel,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex gap-[var(--space-3)]", orientation === "vertical" ? "flex-col" : "flex-row flex-wrap"),
                children: options.map((option)=>{
                    const optionId = `${groupName}-${option.value}`;
                    const input = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: optionId,
                        type: "radio",
                        name: groupName,
                        value: option.value,
                        disabled: option.disabled,
                        checked: value !== undefined ? value === option.value : undefined,
                        defaultChecked: value === undefined ? defaultValue === option.value : undefined,
                        onChange: (event)=>{
                            if (event.target.checked) onValueChange?.(option.value);
                        },
                        className: variant === "card" ? "peer sr-only" : "mt-[3px] h-5 w-5 shrink-0 cursor-pointer accent-[var(--action-primary)] disabled:cursor-not-allowed disabled:opacity-50"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/RadioGroup.tsx",
                        lineNumber: 70,
                        columnNumber: 13
                    }, this);
                    if (variant === "card") {
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: [
                                input,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: optionId,
                                    className: "flex min-h-[var(--hit-min)] cursor-pointer items-start gap-[var(--space-3)] rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-card)] px-[var(--space-4)] py-[var(--space-3)] transition-colors duration-[var(--dur-fast)] ease-[var(--ease-standard)] peer-checked:border-[var(--border-brand)] peer-checked:bg-[var(--surface-brand-soft)] peer-checked:shadow-[inset_0_0_0_1px_var(--border-brand)] peer-focus-visible:shadow-[var(--ring-focus)] peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "aria-hidden": "true",
                                            className: "mt-[2px] flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-[var(--border-strong)] bg-[var(--surface-card)] [.peer:checked~label_&]:border-[var(--action-primary)]",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "h-3.5 w-3.5 scale-0 rounded-full bg-[var(--action-primary)] transition-transform duration-[var(--dur-fast)] [.peer:checked~label_&]:scale-100"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ui/RadioGroup.tsx",
                                                lineNumber: 101,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/RadioGroup.tsx",
                                            lineNumber: 97,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex flex-col gap-[2px]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[length:var(--text-body-lg-size)] font-bold text-[var(--text-strong)]",
                                                    children: option.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ui/RadioGroup.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 21
                                                }, this),
                                                option.description ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[length:var(--text-caption-size)] text-[var(--text-muted)]",
                                                    children: option.description
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ui/RadioGroup.tsx",
                                                    lineNumber: 108,
                                                    columnNumber: 23
                                                }, this) : null
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ui/RadioGroup.tsx",
                                            lineNumber: 103,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ui/RadioGroup.tsx",
                                    lineNumber: 93,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, option.value, true, {
                            fileName: "[project]/src/components/ui/RadioGroup.tsx",
                            lineNumber: 91,
                            columnNumber: 15
                        }, this);
                    }
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-[var(--space-3)]",
                        children: [
                            input,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: optionId,
                                        className: "cursor-pointer text-[var(--text-body-size)] text-[var(--text-strong)]",
                                        children: option.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/RadioGroup.tsx",
                                        lineNumber: 122,
                                        columnNumber: 17
                                    }, this),
                                    option.description ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[var(--text-caption-size)] text-[var(--text-muted)]",
                                        children: option.description
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/RadioGroup.tsx",
                                        lineNumber: 129,
                                        columnNumber: 19
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/RadioGroup.tsx",
                                lineNumber: 121,
                                columnNumber: 15
                            }, this)
                        ]
                    }, option.value, true, {
                        fileName: "[project]/src/components/ui/RadioGroup.tsx",
                        lineNumber: 119,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/ui/RadioGroup.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/RadioGroup.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ui/Select.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Select",
    ()=>Select
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/icons.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const Select = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(function Select({ label, hint, error, options, placeholder, className, id, ...props }, ref) {
    const generatedId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])();
    const selectId = id ?? generatedId;
    const hintId = hint ? `${selectId}-hint` : undefined;
    const errorId = error ? `${selectId}-error` : undefined;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-[var(--space-1)]",
        children: [
            label ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: selectId,
                className: "text-[var(--text-label-size)] font-[var(--weight-medium)] text-[var(--text-strong)]",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Select.tsx",
                lineNumber: 39,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        ref: ref,
                        id: selectId,
                        defaultValue: props.value === undefined ? "" : undefined,
                        "aria-invalid": error ? true : undefined,
                        "aria-describedby": (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(hintId, errorId) || undefined,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("h-11 w-full appearance-none rounded-[var(--radius-md)] border bg-[var(--surface-card)] px-[var(--space-3)] pr-[var(--space-10)] text-[var(--text-body-size)] text-[var(--text-strong)] transition-colors duration-[var(--dur-fast)] ease-[var(--ease-standard)] disabled:cursor-not-allowed disabled:opacity-50", error ? "border-[var(--status-danger)]" : "border-[var(--border-strong)] focus:border-[var(--border-brand)]", className),
                        ...props,
                        children: [
                            placeholder ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                disabled: true,
                                hidden: true,
                                children: placeholder
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/Select.tsx",
                                lineNumber: 63,
                                columnNumber: 13
                            }, this) : null,
                            options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: option.value,
                                    disabled: option.disabled,
                                    children: option.label
                                }, option.value, false, {
                                    fileName: "[project]/src/components/ui/Select.tsx",
                                    lineNumber: 68,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/Select.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                        name: "chevron-down",
                        size: 18,
                        className: "pointer-events-none absolute right-[var(--space-3)] top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Select.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/Select.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            hint && !error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                id: hintId,
                className: "text-[var(--text-caption-size)] text-[var(--text-muted)]",
                children: hint
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Select.tsx",
                lineNumber: 80,
                columnNumber: 9
            }, this) : null,
            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                id: errorId,
                role: "alert",
                className: "text-[var(--text-caption-size)] text-[var(--status-danger)]",
                children: error
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Select.tsx",
                lineNumber: 85,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Select.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
});
}),
"[project]/src/components/ui/Switch.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Switch",
    ()=>Switch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const Switch = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(function Switch({ label, description, className, id, ...props }, ref) {
    const generatedId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])();
    const inputId = id ?? generatedId;
    const descId = description ? `${inputId}-description` : undefined;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-[var(--space-3)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: ref,
                id: inputId,
                type: "checkbox",
                role: "switch",
                "aria-describedby": descId,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative h-6 w-11 shrink-0 cursor-pointer appearance-none rounded-[var(--radius-pill)] border border-[var(--border-strong)] bg-[var(--ink-200)] transition-colors duration-[var(--dur-base)] ease-[var(--ease-standard)] disabled:cursor-not-allowed disabled:opacity-50", "before:absolute before:left-[2px] before:top-[1px] before:h-4 before:w-4 before:rounded-full before:bg-[var(--paper)] before:shadow-[var(--shadow-card)] before:transition-transform before:duration-[var(--dur-base)] before:ease-[var(--ease-standard)] before:content-['']", "checked:border-[var(--action-primary)] checked:bg-[var(--action-primary)] checked:before:translate-x-5", className),
                ...props
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Switch.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            label || description ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col",
                children: [
                    label ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: inputId,
                        className: "cursor-pointer text-[var(--text-body-size)] text-[var(--text-strong)]",
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Switch.tsx",
                        lineNumber: 45,
                        columnNumber: 13
                    }, this) : null,
                    description ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        id: descId,
                        className: "text-[var(--text-caption-size)] text-[var(--text-muted)]",
                        children: description
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Switch.tsx",
                        lineNumber: 53,
                        columnNumber: 13
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/Switch.tsx",
                lineNumber: 43,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Switch.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
});
}),
"[project]/src/components/ui/Tabs.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tab",
    ()=>Tab,
    "TabList",
    ()=>TabList,
    "TabPanel",
    ()=>TabPanel,
    "Tabs",
    ()=>Tabs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const TabsContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function useTabsContext(component) {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(TabsContext);
    if (!ctx) throw new Error(`<${component}> must be rendered inside <Tabs>`);
    return ctx;
}
function Tabs({ defaultValue, value: controlledValue, onValueChange, children, className }) {
    const baseId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])();
    const [uncontrolledValue, setUncontrolledValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(defaultValue ?? "");
    const [tabOrder, setTabOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // If nothing has been explicitly selected yet, derive the active tab from
    // the first registered one — computed during render rather than synced
    // via an effect, so there's no extra setState-driven render pass.
    const value = controlledValue ?? (uncontrolledValue || tabOrder[0] || "");
    const setValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((next)=>{
        if (controlledValue === undefined) setUncontrolledValue(next);
        onValueChange?.(next);
    }, [
        controlledValue,
        onValueChange
    ]);
    // Tabs register/unregister themselves from an effect (post-render), so
    // `tabOrder` is plain reactive state rather than a ref read during render.
    const registerTab = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((tabValue)=>{
        setTabOrder((current)=>current.includes(tabValue) ? current : [
                ...current,
                tabValue
            ]);
    }, []);
    const unregisterTab = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((tabValue)=>{
        setTabOrder((current)=>current.filter((existing)=>existing !== tabValue));
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TabsContext.Provider, {
        value: {
            value,
            setValue,
            baseId,
            registerTab,
            unregisterTab,
            tabOrder
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: className,
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/ui/Tabs.tsx",
            lineNumber: 68,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Tabs.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
function TabList({ children, className, "aria-label": ariaLabel }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "tablist",
        "aria-label": ariaLabel,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center gap-[var(--space-1)] rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-[var(--space-1)]", className),
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Tabs.tsx",
        lineNumber: 81,
        columnNumber: 5
    }, this);
}
function Tab({ value, children, disabled, className }) {
    const { value: activeValue, setValue, baseId, registerTab, unregisterTab, tabOrder } = useTabsContext("Tab");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        registerTab(value);
        return ()=>unregisterTab(value);
    }, [
        value,
        registerTab,
        unregisterTab
    ]);
    const isActive = activeValue === value;
    function handleKeyDown(event) {
        const order = tabOrder;
        const currentIndex = order.indexOf(value);
        if (order.length === 0 || currentIndex < 0) return;
        let nextIndex = null;
        if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % order.length;
        else if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + order.length) % order.length;
        else if (event.key === "Home") nextIndex = 0;
        else if (event.key === "End") nextIndex = order.length - 1;
        if (nextIndex !== null) {
            event.preventDefault();
            const nextValue = order[nextIndex];
            setValue(nextValue);
            document.getElementById(`${baseId}-tab-${nextValue}`)?.focus();
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        id: `${baseId}-tab-${value}`,
        role: "tab",
        type: "button",
        "aria-selected": isActive,
        "aria-controls": `${baseId}-panel-${value}`,
        tabIndex: isActive ? 0 : -1,
        disabled: disabled,
        onClick: ()=>setValue(value),
        onKeyDown: handleKeyDown,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("rounded-[var(--radius-sm)] px-[var(--space-4)] py-[var(--space-2)] text-[var(--text-label-size)] font-[var(--weight-medium)] transition-colors duration-[var(--dur-fast)] ease-[var(--ease-standard)] disabled:pointer-events-none disabled:opacity-50", isActive ? "bg-[var(--surface-card)] text-[var(--text-strong)] shadow-[var(--shadow-card)]" : "text-[var(--text-muted)] hover:text-[var(--text-strong)]", className),
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Tabs.tsx",
        lineNumber: 134,
        columnNumber: 5
    }, this);
}
function TabPanel({ value, children, className }) {
    const { value: activeValue, baseId } = useTabsContext("TabPanel");
    if (activeValue !== value) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        id: `${baseId}-panel-${value}`,
        role: "tabpanel",
        "aria-labelledby": `${baseId}-tab-${value}`,
        tabIndex: 0,
        className: className,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Tabs.tsx",
        lineNumber: 168,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ui/Tag.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tag",
    ()=>Tag
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/utils.ts [app-ssr] (ecmascript)");
;
;
const TONE_CLASSES = {
    neutral: "border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-[var(--text-body)]",
    teal: "border-[var(--teal-300)] bg-[var(--teal-50)] text-[var(--teal-700)]",
    celadon: "border-[var(--celadon-400)] bg-[var(--celadon-100)] text-[var(--celadon-700)]",
    vanilla: "border-[var(--vanilla-400)] bg-[var(--vanilla-100)] text-[var(--vanilla-700)]",
    peach: "border-[var(--peach-500)] bg-[var(--peach-100)] text-[var(--peach-700)]",
    brick: "border-[var(--brick-600)] bg-[var(--brick-100)] text-[var(--brick-700)]"
};
function Tag({ tone = "neutral", className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center gap-[var(--space-1)] rounded-[var(--radius-sm)] border px-[var(--space-2)] py-[1px] text-[var(--text-caption-size)] font-[var(--weight-medium)]", TONE_CLASSES[tone], className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Tag.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ui/Toast.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToastProvider",
    ()=>ToastProvider,
    "useToast",
    ()=>useToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/icons.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const ToastContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function useToast() {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ToastContext);
    if (!ctx) throw new Error("useToast must be used within a <ToastProvider>");
    return ctx;
}
const TONE_CLASSES = {
    neutral: "border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--text-strong)]",
    good: "border-[var(--status-good)] bg-[var(--status-good-soft)] text-[var(--status-good)]",
    warn: "border-[var(--status-warn)] bg-[var(--status-warn-soft)] text-[var(--status-warn)]",
    danger: "border-[var(--status-danger)] bg-[var(--status-danger-soft)] text-[var(--status-danger)]"
};
const TONE_ICON = {
    neutral: "info",
    good: "check",
    warn: "info",
    danger: "close"
};
let toastSeq = 0;
const noopSubscribe = ()=>()=>{};
/** True once on the client, false during SSR — via `useSyncExternalStore` so no render-triggering `setState` is needed in an effect. */ function useIsClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(noopSubscribe, ()=>true, ()=>false);
}
function ToastProvider({ children }) {
    const [toasts, setToasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const mounted = useIsClient();
    const timers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timersMap = timers.current;
        return ()=>{
            timersMap.forEach((timer)=>clearTimeout(timer));
            timersMap.clear();
        };
    }, []);
    const dismiss = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        setToasts((current)=>current.filter((toast)=>toast.id !== id));
        const timer = timers.current.get(id);
        if (timer) {
            clearTimeout(timer);
            timers.current.delete(id);
        }
    }, []);
    const show = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((options)=>{
        const id = `toast-${++toastSeq}`;
        const duration = options.duration ?? 5000;
        setToasts((current)=>[
                ...current,
                {
                    ...options,
                    id
                }
            ]);
        if (duration > 0) {
            timers.current.set(id, setTimeout(()=>dismiss(id), duration));
        }
        return id;
    }, [
        dismiss
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            show,
            dismiss
        }), [
        show,
        dismiss
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastContext.Provider, {
        value: value,
        children: [
            children,
            mounted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none fixed inset-x-0 bottom-[var(--space-4)] z-[100] flex flex-col items-center gap-[var(--space-2)] px-[var(--space-4)] sm:left-auto sm:right-[var(--space-4)] sm:items-end",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    role: "region",
                    "aria-label": "Notifications",
                    className: "flex w-full max-w-[380px] flex-col gap-[var(--space-2)]",
                    children: toasts.map((toast)=>{
                        const tone = toast.tone ?? "neutral";
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            role: tone === "danger" ? "alert" : "status",
                            "aria-live": tone === "danger" ? "assertive" : "polite",
                            "aria-atomic": "true",
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("pointer-events-auto flex items-start gap-[var(--space-3)] rounded-[var(--radius-md)] border p-[var(--space-4)] shadow-[var(--shadow-raised)]", TONE_CLASSES[tone]),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                    name: TONE_ICON[tone],
                                    size: 18,
                                    className: "mt-[2px] shrink-0"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/Toast.tsx",
                                    lineNumber: 144,
                                    columnNumber: 23
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-1 flex-col gap-[2px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[var(--text-label-size)] font-[var(--weight-bold)]",
                                            children: toast.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/Toast.tsx",
                                            lineNumber: 146,
                                            columnNumber: 25
                                        }, this),
                                        toast.description ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[var(--text-caption-size)] opacity-90",
                                            children: toast.description
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/Toast.tsx",
                                            lineNumber: 150,
                                            columnNumber: 27
                                        }, this) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ui/Toast.tsx",
                                    lineNumber: 145,
                                    columnNumber: 23
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    "aria-label": "Dismiss notification",
                                    onClick: ()=>dismiss(toast.id),
                                    className: "shrink-0 rounded-[var(--radius-sm)] p-[2px] text-current opacity-70 hover:opacity-100",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                        name: "close",
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/Toast.tsx",
                                        lineNumber: 161,
                                        columnNumber: 25
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/Toast.tsx",
                                    lineNumber: 155,
                                    columnNumber: 23
                                }, this)
                            ]
                        }, toast.id, true, {
                            fileName: "[project]/src/components/ui/Toast.tsx",
                            lineNumber: 134,
                            columnNumber: 21
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/Toast.tsx",
                    lineNumber: 126,
                    columnNumber: 15
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Toast.tsx",
                lineNumber: 125,
                columnNumber: 13
            }, this), document.body) : null
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Toast.tsx",
        lineNumber: 121,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ui/button-styles.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buttonClasses",
    ()=>buttonClasses
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/utils.ts [app-ssr] (ecmascript)");
;
const BASE = "inline-flex items-center justify-center gap-[var(--space-2)] rounded-[var(--radius-md)] font-[var(--weight-bold)] tracking-[var(--tracking-normal)] transition-colors duration-[var(--dur-fast)] ease-[var(--ease-standard)] whitespace-nowrap disabled:pointer-events-none disabled:opacity-50";
const VARIANT_CLASSES = {
    primary: "border border-transparent bg-[var(--action-primary)] text-[var(--text-on-primary)] hover:bg-[var(--action-primary-hover)] active:bg-[var(--action-primary-press)]",
    secondary: "border border-[var(--border-strong)] bg-[var(--surface-card)] text-[var(--text-strong)] hover:bg-[var(--surface-sunken)]",
    outline: "border border-[var(--border-brand)] bg-transparent text-[var(--action-primary)] hover:bg-[var(--surface-brand-soft)]",
    ghost: "border border-transparent bg-transparent text-[var(--text-body)] hover:bg-[var(--surface-sunken)]",
    danger: "border border-transparent bg-[var(--status-danger)] text-[var(--text-on-primary)] hover:bg-[var(--brick-700)]"
};
const SIZE_CLASSES = {
    sm: "h-9 px-[var(--space-3)] text-[var(--text-caption-size)]",
    md: "h-11 px-[var(--space-4)] text-[var(--text-label-size)]",
    lg: "h-[var(--hit-min)] px-[var(--space-6)] text-[var(--text-body-size)]"
};
function buttonClasses({ variant = "primary", size = "md", fullWidth, className }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(BASE, VARIANT_CLASSES[variant], SIZE_CLASSES[size], fullWidth && "w-full", className);
}
}),
"[project]/src/components/ui/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

// Eco Check shared UI primitives — barrel export.
__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/icons.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$IconButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/IconButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2d$styles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button-styles.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ButtonLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/ButtonLink.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Tag$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Tag.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Checkbox.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$RadioGroup$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/RadioGroup.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Select.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Switch$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Switch.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Tabs.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Dialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Toast.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Notice$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Notice.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/src/components/ui/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
function pushClass(value, out) {
    if (!value && value !== 0) return;
    if (typeof value === "string" || typeof value === "number") {
        out.push(String(value));
        return;
    }
    if (Array.isArray(value)) {
        for (const item of value)pushClass(item, out);
        return;
    }
    if (typeof value === "object") {
        for(const key in value){
            if (Object.prototype.hasOwnProperty.call(value, key) && value[key]) {
                out.push(key);
            }
        }
    }
}
function cn(...values) {
    const out = [];
    for (const value of values)pushClass(value, out);
    return out.join(" ");
}
}),
"[project]/src/data/grades.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Eco Check grade fixtures.
 *
 * Buildings are rated on their annual **primary energy consumption**
 * (1차에너지소요량, kWh/m²·yr — lower is better) and bucketed into one of the
 * 10 grades below, ordered from best (`1+++`) to worst (`7`), mirroring
 * Korea's 건축물 에너지효율등급 (Building Energy Efficiency Rating) scale for
 * residential buildings (공동주택 기준).
 */ __turbopack_context__.s([
    "CURRENT_BUILDING_GRADE",
    ()=>CURRENT_BUILDING_GRADE,
    "GRADES",
    ()=>GRADES,
    "GRADE_ORDER",
    ()=>GRADE_ORDER,
    "PRIMARY_ENERGY_UNIT",
    ()=>PRIMARY_ENERGY_UNIT,
    "getGradeByCode",
    ()=>getGradeByCode,
    "getGradeByPrimaryEnergy",
    ()=>getGradeByPrimaryEnergy,
    "getGradeByScore",
    ()=>getGradeByScore,
    "getGradeDistribution",
    ()=>getGradeDistribution,
    "getGrades",
    ()=>getGrades
]);
const GRADE_ORDER = [
    "1+++",
    "1++",
    "1+",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7"
];
const PRIMARY_ENERGY_UNIT = "kWh/m²·yr";
const GRADES = {
    "1+++": {
        code: "1+++",
        rank: 1,
        label: "1+++등급",
        minPrimaryEnergyKwh: 0,
        maxPrimaryEnergyKwh: 60
    },
    "1++": {
        code: "1++",
        rank: 2,
        label: "1++등급",
        minPrimaryEnergyKwh: 60,
        maxPrimaryEnergyKwh: 90
    },
    "1+": {
        code: "1+",
        rank: 3,
        label: "1+등급",
        minPrimaryEnergyKwh: 90,
        maxPrimaryEnergyKwh: 120
    },
    "1": {
        code: "1",
        rank: 4,
        label: "1등급",
        minPrimaryEnergyKwh: 120,
        maxPrimaryEnergyKwh: 150
    },
    "2": {
        code: "2",
        rank: 5,
        label: "2등급",
        minPrimaryEnergyKwh: 150,
        maxPrimaryEnergyKwh: 190
    },
    "3": {
        code: "3",
        rank: 6,
        label: "3등급",
        minPrimaryEnergyKwh: 190,
        maxPrimaryEnergyKwh: 230
    },
    "4": {
        code: "4",
        rank: 7,
        label: "4등급",
        minPrimaryEnergyKwh: 230,
        maxPrimaryEnergyKwh: 270
    },
    "5": {
        code: "5",
        rank: 8,
        label: "5등급",
        minPrimaryEnergyKwh: 270,
        maxPrimaryEnergyKwh: 320
    },
    "6": {
        code: "6",
        rank: 9,
        label: "6등급",
        minPrimaryEnergyKwh: 320,
        maxPrimaryEnergyKwh: 370
    },
    "7": {
        code: "7",
        rank: 10,
        label: "7등급",
        minPrimaryEnergyKwh: 370,
        maxPrimaryEnergyKwh: null
    }
};
/**
 * Distribution of buildings across every grade, sourced from the Eco Check
 * report for the current building (whose own grade is `5`, see
 * `CURRENT_BUILDING_GRADE`). The current building's slot carries
 * `count: null` rather than a peer count.
 */ const GRADE_DISTRIBUTION_COUNTS = {
    "1+++": 42,
    "1++": 1134,
    "1+": 1091,
    "1": 294,
    "2": 26,
    "3": 7,
    "4": 0,
    "5": null,
    "6": 0,
    "7": 0
};
const CURRENT_BUILDING_GRADE = "5";
async function getGrades() {
    return GRADE_ORDER.map((code)=>GRADES[code]);
}
async function getGradeByCode(code) {
    return GRADES[code];
}
async function getGradeByPrimaryEnergy(kwhPerM2PerYear) {
    return GRADE_ORDER.map((code)=>GRADES[code]).find((grade)=>kwhPerM2PerYear >= grade.minPrimaryEnergyKwh && (grade.maxPrimaryEnergyKwh === null || kwhPerM2PerYear < grade.maxPrimaryEnergyKwh));
}
const getGradeByScore = getGradeByPrimaryEnergy;
async function getGradeDistribution() {
    return GRADE_ORDER.map((code)=>({
            grade: code,
            label: GRADES[code].label,
            count: GRADE_DISTRIBUTION_COUNTS[code],
            isCurrentBuildingGrade: code === CURRENT_BUILDING_GRADE
        }));
}
}),
"[project]/src/lib/address-id.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decodeAddressId",
    ()=>decodeAddressId,
    "decodeAddressIdParts",
    ()=>decodeAddressIdParts,
    "decodeEstimateId",
    ()=>decodeEstimateId,
    "encodeAddressId",
    ()=>encodeAddressId,
    "encodeEstimateId",
    ()=>encodeEstimateId
]);
/**
 * Packs an address into a route-safe `/report/[buildingId]` segment and back.
 * beec has no persistent building ids, only address matching, so the id *is*
 * the address (UTF-8 → base64url). Uses `btoa`/`TextEncoder` rather than
 * Node's `Buffer` so the home hero can build report links in the browser;
 * the output is byte-for-byte what `Buffer#toString("base64url")` produced.
 */ /** Prefix marking a building id as a live beec match rather than a fixture id like `"bld-001"`. */ const ADDRESS_ID_PREFIX = "addr-";
/** Prefix marking an id as a 용도·지역·규모 estimate (`/api/report`) for an address beec has no 실측 record for. */ const ESTIMATE_ID_PREFIX = "est-";
/**
 * Separates the address from the Kakao 건물명 inside an `addr-` id. Addresses
 * never contain a newline, and ids made before the name was packed in still
 * decode to just the address.
 */ const NAME_SEPARATOR = "\n";
function toBase64url(text) {
    let binary = "";
    for (const byte of new TextEncoder().encode(text)){
        binary += String.fromCharCode(byte);
    }
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function fromBase64url(encoded) {
    try {
        const binary = atob(encoded.replace(/-/g, "+").replace(/_/g, "/"));
        const bytes = Uint8Array.from(binary, (char)=>char.charCodeAt(0));
        return new TextDecoder("utf-8", {
            fatal: true
        }).decode(bytes);
    } catch  {
        return null;
    }
}
function encodeAddressId(address, buildingName) {
    const name = buildingName?.trim();
    return `${ADDRESS_ID_PREFIX}${toBase64url(name ? `${address}${NAME_SEPARATOR}${name}` : address)}`;
}
function decodeAddressIdParts(id) {
    if (!id.startsWith(ADDRESS_ID_PREFIX)) return null;
    const decoded = fromBase64url(id.slice(ADDRESS_ID_PREFIX.length));
    if (decoded === null) return null;
    const [address, buildingName] = decoded.split(NAME_SEPARATOR, 2);
    return buildingName ? {
        address,
        buildingName
    } : {
        address
    };
}
function decodeAddressId(id) {
    return decodeAddressIdParts(id)?.address ?? null;
}
function encodeEstimateId({ address, purpose, region, sizeBucket }) {
    return `${ESTIMATE_ID_PREFIX}${toBase64url(JSON.stringify([
        address,
        purpose,
        region,
        sizeBucket
    ]))}`;
}
function decodeEstimateId(id) {
    if (!id.startsWith(ESTIMATE_ID_PREFIX)) return null;
    const decoded = fromBase64url(id.slice(ESTIMATE_ID_PREFIX.length));
    if (decoded === null) return null;
    try {
        const parts = JSON.parse(decoded);
        if (!Array.isArray(parts) || parts.length !== 4 || !parts.every((part)=>typeof part === "string")) {
            return null;
        }
        const [address, purpose, region, sizeBucket] = parts;
        return {
            address,
            purpose,
            region,
            sizeBucket
        };
    } catch  {
        return null;
    }
}
}),
"[project]/src/lib/eco-api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchEnergyCost",
    ()=>fetchEnergyCost,
    "matchPostcodeAddress",
    ()=>matchPostcodeAddress,
    "toJibunAddress",
    ()=>toJibunAddress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$base$2d$url$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api-base-url.ts [app-ssr] (ecmascript)");
;
async function getJson(path, params) {
    const url = new URL(path, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$base$2d$url$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_BASE_URL"]);
    for (const [key, value] of Object.entries(params)){
        if (value) url.searchParams.set(key, value);
    }
    const res = await fetch(url, {
        cache: "no-store"
    });
    if (!res.ok) {
        throw new Error(`${path} error: ${res.status}`);
    }
    return res.json();
}
function toJibunAddress(data) {
    return data.jibunAddress || data.autoJibunAddress;
}
function matchPostcodeAddress(data) {
    return getJson("/api/match", {
        jibunAddress: toJibunAddress(data),
        roadAddress: data.roadAddress || data.autoRoadAddress,
        buildingName: data.buildingName
    });
}
async function fetchEnergyCost(gradeCode, primaryEnergyKwh) {
    const params = new URLSearchParams({
        gradeCode,
        primaryEnergyKwh: String(primaryEnergyKwh)
    });
    const res = await fetch(`/api/energy-cost?${params.toString()}`, {
        cache: "no-store"
    });
    if (!res.ok) {
        throw new Error(`/api/energy-cost error: ${res.status}`);
    }
    return res.json();
}
}),
"[project]/src/lib/energy-comment.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildEnergyCommentPrompt",
    ()=>buildEnergyCommentPrompt,
    "fallbackEnergyComment",
    ()=>fallbackEnergyComment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$grades$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/grades.ts [app-ssr] (ecmascript)");
;
function buildEnergyCommentPrompt(input) {
    const gradeLabel = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$grades$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GRADES"][input.grade].label;
    const lines = [
        "당신은 에너지 효율 컨설턴트입니다. 아래 건물 정보만 근거로, 사용자에게 보여줄",
        '"현재 등급 평가 + 절감 방향" 한마디를 한국어 존댓말 2문장 이내로 작성하세요.',
        "새로운 숫자를 만들어내지 말고 주어진 값만 언급하세요. 코멘트 텍스트만 출력하세요",
        "(따옴표, 접두어, 마크다운 없이).",
        "",
        `- 건물명: ${input.buildingName}`,
        `- 주소: ${input.address}`,
        `- 준공 연도: ${input.completionYear}년`,
        `- 용도: ${input.useType}`,
        `- 연면적: ${input.areaSqm}㎡`,
        `- 등급 산정 방식: ${input.isEstimated ? "공공데이터 기반 추정 등급" : "한국에너지공단 인증 등급"}`,
        `- 현재 등급: ${gradeLabel} (1차에너지소요량 ${input.primaryEnergyKwh}kWh/㎡·yr)`
    ];
    if (input.metrics) {
        lines.push(`- 연간 난방비: 약 ${input.metrics.annualEnergyCostManwon}만원`, `- 절감 여지: ${input.metrics.percentileRank}%`, `- 연간 탄소 배출: ${input.metrics.annualCarbonEmissionTons} tCO₂`, `- 권장 조치를 모두 실천할 경우 연간 절감액: 약 ${input.metrics.annualSavingsPotentialManwon}만원`);
    }
    return lines.join("\n");
}
function fallbackEnergyComment(input) {
    const gradeLabel = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$grades$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GRADES"][input.grade].label;
    if (input.metrics) {
        return `현재 ${gradeLabel}으로, 권장 조치를 모두 실천하면 연간 약 ${input.metrics.annualSavingsPotentialManwon}만원까지 절감할 수 있어요.`;
    }
    return `현재 ${gradeLabel}으로 평가됐어요. 절감 하기에서 우리 집에 맞는 실천 항목을 확인해보세요.`;
}
}),
"[project]/src/lib/kakao-postcode.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "embedKakaoPostcode",
    ()=>embedKakaoPostcode,
    "loadKakaoPostcode",
    ()=>loadKakaoPostcode,
    "toSelectedAddress",
    ()=>toSelectedAddress
]);
/**
 * Typed wrapper around the Kakao(Daum) 우편번호 서비스 popup
 * (https://postcode.map.kakao.com/guide). Browser-only: the script adds
 * `window.kakao.Postcode`, which opens an address-search popup and reports
 * the picked address through `oncomplete`.
 */ const POSTCODE_SCRIPT_SRC = "https://t1.kakaocdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
let scriptPromise = null;
function loadKakaoPostcode() {
    if (window.kakao?.Postcode) return Promise.resolve();
    scriptPromise ??= new Promise((resolve, reject)=>{
        const script = document.createElement("script");
        script.src = POSTCODE_SCRIPT_SRC;
        script.async = true;
        script.onload = ()=>{
            if (window.kakao?.Postcode) {
                resolve();
            } else {
                reject(new Error("카카오 우편번호 스크립트가 kakao.Postcode를 제공하지 않습니다."));
            }
        };
        script.onerror = ()=>{
            // Let the next call retry instead of caching the failure forever.
            scriptPromise = null;
            script.remove();
            reject(new Error("카카오 우편번호 스크립트를 불러오지 못했습니다."));
        };
        document.head.appendChild(script);
    });
    return scriptPromise;
}
function embedKakaoPostcode(element, onComplete, options) {
    const Postcode = window.kakao?.Postcode;
    if (!Postcode) {
        throw new Error("embedKakaoPostcode() called before loadKakaoPostcode() resolved.");
    }
    new Postcode({
        oncomplete: onComplete,
        width: "100%",
        height: "100%"
    }).embed(element, options);
}
function toSelectedAddress(data) {
    return data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress;
}
}),
"[project]/src/lib/last-search.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rememberLastSearch",
    ()=>rememberLastSearch,
    "searchHref",
    ()=>searchHref,
    "useLastSearchHref",
    ()=>useLastSearchHref
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
/**
 * Remembers the last address the user searched (per tab, in sessionStorage)
 * so "에너지 성적표" in the site nav can bring them back to those results
 * (`/search?q=…`) after they wander off to another page.
 */ const STORAGE_KEY = "eco:last-search-query";
const CHANGE_EVENT = "eco:last-search-change";
function searchHref(query) {
    return query ? `/search?q=${encodeURIComponent(query)}` : "/search";
}
function rememberLastSearch(query) {
    try {
        sessionStorage.setItem(STORAGE_KEY, query);
    } catch  {
        return; // Storage blocked (private mode, sandbox) — the nav just falls back to "/search".
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
}
function readLastSearch() {
    try {
        return sessionStorage.getItem(STORAGE_KEY);
    } catch  {
        return null;
    }
}
function subscribe(onChange) {
    window.addEventListener(CHANGE_EVENT, onChange);
    return ()=>window.removeEventListener(CHANGE_EVENT, onChange);
}
function useLastSearchHref() {
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(subscribe, readLastSearch, ()=>null);
    return searchHref(query);
}
}),
];

//# sourceMappingURL=src_0qykubl._.js.map