import {Column, Element, Node, Row} from "./newGraphModel";
import {assertNever} from "./assertNever";
import {LeftBorderIndex} from "./addLeftBorderIndex";
import {RightBorderIndex} from "./addRightBorderIndex";

export type MaxXBorderIndex = { maxXBorderIndex: number };

export function addMaxXBorderIndexG<N extends LeftBorderIndex & RightBorderIndex>(
    element: Element<N>
): Element<N & MaxXBorderIndex> {
    let maxEmbeddedXBorders = determineMaxXBorderIndex(element);
    addMaxXBorderIndex(element, maxEmbeddedXBorders);
    return element as Element<N & MaxXBorderIndex>;
}

function determineMaxXBorderIndex(element: Element<LeftBorderIndex & RightBorderIndex>): number {
    switch (element.kind) {
        case "node": return 0;
        case "row": return Math.max(
            ...element.elements.map(determineMaxXBorderIndex),
            element.leftBorderIndex,
            element.rightBorderIndex
        );
        case "column": return Math.max(
            ...element.elements.map(determineMaxXBorderIndex),
            element.leftBorderIndex,
            element.rightBorderIndex
        );
        default: {
            assertNever(element);
        }
    }
}

export function addMaxXBorderIndex(element: Element<LeftBorderIndex & RightBorderIndex>, maxXBorderIndex: number) {
    switch (element.kind) {
        case "node": {
            Object.assign<Node, MaxXBorderIndex>(element, {
                maxXBorderIndex: maxXBorderIndex
            });
            return;
        }
        case "row": {
            Object.assign<Row<unknown>, MaxXBorderIndex>(element, {
                maxXBorderIndex: maxXBorderIndex
            });
            element.elements.forEach(nestedElement =>
                addMaxXBorderIndex(nestedElement, maxXBorderIndex));
            return;
        }
        case "column": {
            Object.assign<Column<unknown>, MaxXBorderIndex>(element, {
                maxXBorderIndex: maxXBorderIndex
            });
            element.elements.forEach(nestedElement =>
                addMaxXBorderIndex(nestedElement, maxXBorderIndex));
            return;
        }
        default: {
            assertNever(element);
        }
    }
}