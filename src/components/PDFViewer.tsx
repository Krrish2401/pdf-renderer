"use client";

import dynamic from "next/dynamic";
import { fetchContextText } from "../lib/textSelection";

const PDFViewerClientNoSSR = dynamic(() => import("./PDFViewerClient").then(mod => mod.PDFViewerClient), {
    ssr: false
});

type SelectionPayload = {
    selectedText: string;
    currentPage: number;
};

export default function PDFViewer() {
    async function handleSelection(payload: SelectionPayload) {
        const extras = await fetchContextText(payload.currentPage);
        const fullPayload = { ...payload, ...extras };
        await fetch("/api/selection", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fullPayload),
        });
    }

    return <PDFViewerClientNoSSR onSelection={handleSelection} />;
}
