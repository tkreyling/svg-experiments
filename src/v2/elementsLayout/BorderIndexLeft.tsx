import {Column, Element, Graph, Node, Row} from "../newGraphModel";
import {assertNever} from "../assertNever";

export type BorderIndexLeft = { borderIndexLeft: number };

export function addBorderIndexLeftG<N>(graph: Graph<N>): Graph<N & BorderIndexLeft> {
    addBorderIndexLeft(graph.element);
    return graph as Graph<N & BorderIndexLeft>;
}

export function addBorderIndexLeft(element: Element<unknown>): number {
    switch (element.kind) {
        case "node": {
            Object.assign<Node, BorderIndexLeft>(element, {
                borderIndexLeft: 0
            });
            return 0;
        }
        case "row": {
            let leftBorderIndices = element.elements.length > 0 ? element.elements.map(addBorderIndexLeft) :  [0];
            let leftBorderIndex = leftBorderIndices[0] + (element.border ?  1 : 0);

            Object.assign<Row<unknown>, BorderIndexLeft>(element, {
                borderIndexLeft: leftBorderIndex
            });
            return leftBorderIndex;
        }
        case "column": {
            let leftBorderIndex =
                Math.max(...element.elements.map(addBorderIndexLeft), 0) +
                (element.border ?  1 : 0);

            Object.assign<Column<unknown>, BorderIndexLeft>(element, {
                borderIndexLeft: leftBorderIndex
            });
            return leftBorderIndex;
        }
        default: {
            assertNever(element);
        }
    }
}