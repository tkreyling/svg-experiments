import {Column, Element, Graph, Node, Row, transformElementsUsingGraph} from "../newGraphModel";
import {assertNever} from "../assertNever";

export type BorderIndexTop = { borderIndexTop: number };

export function addBorderIndexTopG<N, E>(graph: Graph<N, E>): Graph<N & BorderIndexTop, E> {
    return transformElementsUsingGraph<N, BorderIndexTop, E>(graph, addBorderIndexTopGraph);
}

function addBorderIndexTopGraph(graph: Graph<unknown, unknown>) {
    addBorderIndexTop(graph.element);
    graph.syntheticNodes.forEach(node => Object.assign<Node, BorderIndexTop>(node, {borderIndexTop: 0}));
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
                (element.shape ?  1 : 0);

            Object.assign<Row<unknown>, BorderIndexTop>(element, {
                borderIndexTop: borderIndex
            });
            return borderIndex;
        }
        case "column": {
            let borderIndices = element.elements.length > 0 ? element.elements.map(addBorderIndexTop) :  [0];
            let borderIndex = borderIndices[0] + (element.shape ?  1 : 0);

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