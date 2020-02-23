import {Column, Element, Node, Row} from "./newGraphModel";
import {assertNever} from "./assertNever";

export type BorderIndexTop = { borderIndexTop: number };

export function addBorderIndexTopG<N>(element: Element<N>): Element<N & BorderIndexTop> {
    addBorderIndexTop(element);
    return element as Element<N & BorderIndexTop>;
}

export function addBorderIndexTop(element: Element<unknown>): number {
    switch (element.kind) {
        case "node": {
            Object.assign<Node, BorderIndexTop>(element, {
                borderIndexTop: 0
            });
            return 0;
        }
        case "row": {
            let borderIndex =
                Math.max(...element.elements.map(addBorderIndexTop), 0) +
                (element.border ?  1 : 0);

            Object.assign<Row<unknown>, BorderIndexTop>(element, {
                borderIndexTop: borderIndex
            });
            return borderIndex;
        }
        case "column": {
            let borderIndices = element.elements.length > 0 ? element.elements.map(addBorderIndexTop) :  [0];
            let borderIndex = borderIndices[0] + (element.border ?  1 : 0);

            Object.assign<Column<unknown>, BorderIndexTop>(element, {
                borderIndexTop: borderIndex
            });
            return borderIndex;
        }
        default: {
            assertNever(element);
        }
    }
}