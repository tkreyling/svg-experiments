import {Column, Element, Node, Row} from "./newGraphModel";
import {assertNever} from "./assertNever";
import {BorderIndexLeft} from "./BorderIndexLeft";
import {RightBorderIndex} from "./addRightBorderIndex";

export type BorderIndexMaxX = { borderIndexMaxX: number };

export function addBorderIndexMaxXG<N extends BorderIndexLeft & RightBorderIndex>(
    element: Element<N>
): Element<N & BorderIndexMaxX> {
    let maxEmbeddedXBorders = determineBorderIndexMaxX(element);
    addBorderIndexMaxX(element, maxEmbeddedXBorders);
    return element as Element<N & BorderIndexMaxX>;
}

function determineBorderIndexMaxX(element: Element<BorderIndexLeft & RightBorderIndex>): number {
    switch (element.kind) {
        case "node": return 0;
        case "row": return Math.max(
            ...element.elements.map(determineBorderIndexMaxX),
            element.borderIndexLeft,
            element.rightBorderIndex
        );
        case "column": return Math.max(
            ...element.elements.map(determineBorderIndexMaxX),
            element.borderIndexLeft,
            element.rightBorderIndex
        );
        default: {
            assertNever(element);
        }
    }
}

export function addBorderIndexMaxX(element: Element<BorderIndexLeft & RightBorderIndex>, borderIndexMaxX: number) {
    switch (element.kind) {
        case "node": {
            Object.assign<Node, BorderIndexMaxX>(element, {
                borderIndexMaxX: borderIndexMaxX
            });
            return;
        }
        case "row": {
            Object.assign<Row<unknown>, BorderIndexMaxX>(element, {
                borderIndexMaxX: borderIndexMaxX
            });
            element.elements.forEach(nestedElement =>
                addBorderIndexMaxX(nestedElement, borderIndexMaxX));
            return;
        }
        case "column": {
            Object.assign<Column<unknown>, BorderIndexMaxX>(element, {
                borderIndexMaxX: borderIndexMaxX
            });
            element.elements.forEach(nestedElement =>
                addBorderIndexMaxX(nestedElement, borderIndexMaxX));
            return;
        }
        default: {
            assertNever(element);
        }
    }
}