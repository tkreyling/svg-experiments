import {Column, Element, Node, Row} from "./newGraphModel";
import {assertNever} from "./assertNever";

export type RightBorderIndex = { rightBorderIndex: number };

export function addRightBorderIndexG<N>(element: Element<N>): Element<N & RightBorderIndex> {
    addRightBorderIndex(element);
    return element as Element<N & RightBorderIndex>;
}

export function addRightBorderIndex(element: Element<unknown>): number {
    switch (element.kind) {
        case "node": {
            Object.assign<Node, RightBorderIndex>(element, {
                rightBorderIndex: 0
            });
            return 0;
        }
        case "row": {
            let rightBorderIndices = element.elements.length > 0 ? element.elements.map(addRightBorderIndex) :  [0];
            let rightBorderIndex = rightBorderIndices[rightBorderIndices.length - 1] + (element.border ?  1 : 0);

            Object.assign<Row<unknown>, RightBorderIndex>(element, {
                rightBorderIndex: rightBorderIndex
            });
            return rightBorderIndex;
        }
        case "column": {
            let rightBorderIndex =
                Math.max(...element.elements.map(addRightBorderIndex), 0) +
                (element.border ?  1 : 0);

            Object.assign<Column<unknown>, RightBorderIndex>(element, {
                rightBorderIndex: rightBorderIndex
            });
            return rightBorderIndex;
        }
        default: {
            assertNever(element);
        }
    }
}