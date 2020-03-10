import {Column, Element, Graph, Node, Row, transformElements} from "../newGraphModel";
import {assertNever} from "../assertNever";

export type BorderIndexBottom = { borderIndexBottom: number };

export function addBorderIndexBottomG<N, E>(graph: Graph<N, E>): Graph<N & BorderIndexBottom, E> {
    return transformElements<N, BorderIndexBottom, E>(graph, addBorderIndexBottom);
}

export function addBorderIndexBottom(element: Element<unknown>): number {
    switch (element.kind) {
        case "node": {
            Object.assign<Node, BorderIndexBottom>(element, {
                borderIndexBottom: 0
            });
            return 0;
        }
        case "row": {
            let borderIndex =
                Math.max(...element.elements.map(addBorderIndexBottom), 0) +
                (element.shape ?  1 : 0);

            Object.assign<Row<unknown>, BorderIndexBottom>(element, {
                borderIndexBottom: borderIndex
            });
            return borderIndex;
        }
        case "column": {
            let borderIndices = element.elements.length > 0 ? element.elements.map(addBorderIndexBottom) :  [0];
            let borderIndex = borderIndices[borderIndices.length - 1] + (element.shape ?  1 : 0);

            Object.assign<Column<unknown>, BorderIndexBottom>(element, {
                borderIndexBottom: borderIndex
            });
            return borderIndex;
        }
        default: {
            assertNever(element);
        }
    }
}