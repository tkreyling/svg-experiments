import {Column, Element, Node, Row} from "./newGraphModel";
import {assertNever} from "./assertNever";

export type LeftBorderIndex = { leftBorderIndex: number };

export function addLeftBorderIndexG<N>(element: Element<N>): Element<N & LeftBorderIndex> {
    addLeftBorderIndex(element);
    return element as Element<N & LeftBorderIndex>;
}

export function addLeftBorderIndex(element: Element<unknown>): number {
    switch (element.kind) {
        case "node": {
            Object.assign<Node, LeftBorderIndex>(element, {
                leftBorderIndex: 0
            });
            return 0;
        }
        case "row": {
            let leftBorderIndices = element.elements.length > 0 ? element.elements.map(addLeftBorderIndex) :  [0];
            let leftBorderIndex = leftBorderIndices[0] + (element.border ?  1 : 0);

            Object.assign<Row<unknown>, LeftBorderIndex>(element, {
                leftBorderIndex: leftBorderIndex
            });
            return leftBorderIndex;
        }
        case "column": {
            let leftBorderIndex =
                Math.max(...element.elements.map(addLeftBorderIndex), 0) +
                (element.border ?  1 : 0);

            Object.assign<Column<unknown>, LeftBorderIndex>(element, {
                leftBorderIndex: leftBorderIndex
            });
            return leftBorderIndex;
        }
        default: {
            assertNever(element);
        }
    }
}