"use client";

import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

type SelectionPayload = {
    selectedText: string;
    currentPage: number;
};

interface PDFViewerClientProps {
    onSelection: (payload: SelectionPayload) => void;
}

export const PDFViewerClient = ({ onSelection }: PDFViewerClientProps) => {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const textLayerRef = useRef<HTMLDivElement>(null);

    const onLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    useEffect(() => {
        function handleSelection() {
            const selection = window.getSelection();
            if (
                selection &&
                !selection.isCollapsed &&
                textLayerRef.current?.contains(selection.anchorNode)
            ) {
                const text = selection.toString();
                onSelection({
                    selectedText: text,
                    currentPage: pageNumber,
                });
            }
        }

        document.addEventListener("mouseup", handleSelection);
        return () => document.removeEventListener("mouseup", handleSelection);
    }, [pageNumber, onSelection]);

    return (
        <div className="pdf-viewer">
            <nav>
                <button onClick={() => setPageNumber(p => Math.max(1, p - 1))} disabled={pageNumber <= 1}>Prev</button>
                <span>Page {pageNumber}/{numPages}</span>
                <button onClick={() => setPageNumber(p => Math.min(numPages, p + 1))} disabled={pageNumber >= numPages}>Next</button>
            </nav>
            <div ref={textLayerRef}>
                <Document file="/dummy.pdf" onLoadSuccess={onLoadSuccess}>
                    <Page pageNumber={pageNumber} width={600} />
                </Document>
            </div>
        </div>
    );
};
