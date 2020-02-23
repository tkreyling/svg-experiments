import {Column, Element, Node, Row} from "./newGraphModel";
import {assertNever} from "./assertNever";
import {EmbeddedXBorders} from "./addEmbeddedXBorders";

export type MaxEmbeddedXBorders = { maxEmbeddedXBorders: number };

export function addMaxEmbeddedXBordersG<N extends EmbeddedXBorders>(
    element: Element<N>
): Element<N & MaxEmbeddedXBorders> {
    let maxEmbeddedXBorders = determineMaxEmbeddedXBorders(element);
    addMaxEmbeddedXBorders(element, maxEmbeddedXBorders);
    return element as Element<N & MaxEmbeddedXBorders>;
}

function determineMaxEmbeddedXBorders(element: Element<EmbeddedXBorders>): number {
    switch (element.kind) {
        case "node": return 0;
        case "row": return Math.max(
            ...element.elements.map(determineMaxEmbeddedXBorders),
            element.embeddedXBorders
        );
        case "column": return Math.max(
            ...element.elements.map(determineMaxEmbeddedXBorders),
            element.embeddedXBorders
        );
        default: {
            assertNever(element);
        }
    }
}

export function addMaxEmbeddedXBorders(element: Element<EmbeddedXBorders>, maxEmbeddedXBorders: number) {
    switch (element.kind) {
        case "node": {
            Object.assign<Node, MaxEmbeddedXBorders>(element, {
                maxEmbeddedXBorders: maxEmbeddedXBorders
            });
            return;
        }
        case "row": {
            Object.assign<Row<unknown>, MaxEmbeddedXBorders>(element, {
                maxEmbeddedXBorders: maxEmbeddedXBorders
            });
            element.elements.forEach(nestedElement =>
                addMaxEmbeddedXBorders(nestedElement, maxEmbeddedXBorders));
            return;
        }
        case "column": {
            Object.assign<Column<unknown>, MaxEmbeddedXBorders>(element, {
                maxEmbeddedXBorders: maxEmbeddedXBorders
            });
            element.elements.forEach(nestedElement =>
                addMaxEmbeddedXBorders(nestedElement, maxEmbeddedXBorders));
            return;
        }
        default: {
            assertNever(element);
        }
    }
}