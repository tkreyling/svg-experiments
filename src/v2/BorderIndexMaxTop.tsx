import {Column, Element, Node, Row} from "./newGraphModel";
import {assertNever} from "./assertNever";
import {BorderIndexTop} from "./BorderIndexTop";

export type BorderIndexMaxTop = { borderIndexMaxTop: number };

export function addBorderIndexMaxTopG<N extends BorderIndexTop>(
    element: Element<N>
): Element<N & BorderIndexMaxTop> {
    let max = determineBorderIndexMaxTop(element);
    addBorderIndexMaxTop(element, max);
    return element as Element<N & BorderIndexMaxTop>;
}

function determineBorderIndexMaxTop(element: Element<BorderIndexTop>): number {
    switch (element.kind) {
        case "node": return 0;
        case "row": return Math.max(
            ...element.elements.map(determineBorderIndexMaxTop),
            element.borderIndexTop
        );
        case "column": return Math.max(
            ...element.elements.map(determineBorderIndexMaxTop),
            element.borderIndexTop
        );
        default: {
            assertNever(element);
        }
    }
}

export function addBorderIndexMaxTop(element: Element<BorderIndexTop>, borderIndexMaxTop: number) {
    switch (element.kind) {
        case "node": {
            Object.assign<Node, BorderIndexMaxTop>(element, {
                borderIndexMaxTop: borderIndexMaxTop
            });
            return;
        }
        case "row": {
            Object.assign<Row<unknown>, BorderIndexMaxTop>(element, {
                borderIndexMaxTop: borderIndexMaxTop
            });
            element.elements.forEach(nestedElement =>
                addBorderIndexMaxTop(nestedElement, borderIndexMaxTop));
            return;
        }
        case "column": {
            Object.assign<Column<unknown>, BorderIndexMaxTop>(element, {
                borderIndexMaxTop: borderIndexMaxTop
            });
            element.elements.forEach(nestedElement =>
                addBorderIndexMaxTop(nestedElement, borderIndexMaxTop));
            return;
        }
        default: {
            assertNever(element);
        }
    }
}