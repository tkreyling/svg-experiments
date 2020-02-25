import {Column, Element, Node, Row} from "../newGraphModel";
import {assertNever} from "../assertNever";

export type BorderIndexRight = { borderIndexRight: number };

export function addBorderIndexRightG<N>(element: Element<N>): Element<N & BorderIndexRight> {
    addBorderIndexRight(element);
    return element as Element<N & BorderIndexRight>;
}

export function addBorderIndexRight(element: Element<unknown>): number {
    switch (element.kind) {
        case "node": {
            Object.assign<Node, BorderIndexRight>(element, {
                borderIndexRight: 0
            });
            return 0;
        }
        case "row": {
            let borderIndices = element.elements.length > 0 ? element.elements.map(addBorderIndexRight) :  [0];
            let borderIndex = borderIndices[borderIndices.length - 1] + (element.border ?  1 : 0);

            Object.assign<Row<unknown>, BorderIndexRight>(element, {
                borderIndexRight: borderIndex
            });
            return borderIndex;
        }
        case "column": {
            let borderIndex =
                Math.max(...element.elements.map(addBorderIndexRight), 0) +
                (element.border ?  1 : 0);

            Object.assign<Column<unknown>, BorderIndexRight>(element, {
                borderIndexRight: borderIndex
            });
            return borderIndex;
        }
        default: {
            assertNever(element);
        }
    }
}