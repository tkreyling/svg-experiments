import {Column, Element, Node, Row} from "./newGraphModel";
import {assertNever} from "./assertNever";
import {BorderIndexBottom} from "./BorderIndexBottom";

export type BorderIndexMaxBottom = { borderIndexMaxBottom: number };

export function addBorderIndexMaxBottomG<N extends BorderIndexBottom>(
    element: Element<N>
): Element<N & BorderIndexMaxBottom> {
    let max = determineBorderIndexMaxBottom(element);
    addBorderIndexMaxBottom(element, max);
    return element as Element<N & BorderIndexMaxBottom>;
}

function determineBorderIndexMaxBottom(element: Element<BorderIndexBottom>): number {
    switch (element.kind) {
        case "node": return 0;
        case "row": return Math.max(
            ...element.elements.map(determineBorderIndexMaxBottom),
            element.borderIndexBottom
        );
        case "column": return Math.max(
            ...element.elements.map(determineBorderIndexMaxBottom),
            element.borderIndexBottom
        );
        default: {
            assertNever(element);
        }
    }
}

export function addBorderIndexMaxBottom(element: Element<BorderIndexBottom>, borderIndexMaxBottom: number) {
    switch (element.kind) {
        case "node": {
            Object.assign<Node, BorderIndexMaxBottom>(element, {
                borderIndexMaxBottom: borderIndexMaxBottom
            });
            return;
        }
        case "row": {
            Object.assign<Row<unknown>, BorderIndexMaxBottom>(element, {
                borderIndexMaxBottom: borderIndexMaxBottom
            });
            element.elements.forEach(nestedElement =>
                addBorderIndexMaxBottom(nestedElement, borderIndexMaxBottom));
            return;
        }
        case "column": {
            Object.assign<Column<unknown>, BorderIndexMaxBottom>(element, {
                borderIndexMaxBottom: borderIndexMaxBottom
            });
            element.elements.forEach(nestedElement =>
                addBorderIndexMaxBottom(nestedElement, borderIndexMaxBottom));
            return;
        }
        default: {
            assertNever(element);
        }
    }
}