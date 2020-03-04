import {Column, Element, Graph, Node, Row, transformElementsUsingGraph} from "../newGraphModel";
import {assertNever} from "../assertNever";
import {CrossLayerPathSegmentOffsetX} from "./CrossLayerPathSegmentOffsetX";

export type CrossLayerPathSegmentOffsetMaxX = { crossLayerPathSegmentOffsetMaxX: number };

type RequiredEdgeDataTypes = CrossLayerPathSegmentOffsetX;

export function addCrossLayerPathSegmentOffsetMaxXG<N, E extends RequiredEdgeDataTypes>(
    graph: Graph<N, E>
): Graph<N & CrossLayerPathSegmentOffsetMaxX, E> {
    return transformElementsUsingGraph<N, CrossLayerPathSegmentOffsetMaxX, E>(graph, determineAndAddCrossLayerPathSegmentOffsetMaxX);
}

function determineAndAddCrossLayerPathSegmentOffsetMaxX(graph: Graph<unknown, RequiredEdgeDataTypes>) {
    let crossLayerPathSegmentOffsetMaxX = determineCrossLayerPathSegmentOffsetMaxX(graph.edges);
    addCrossLayerPathSegmentOffsetMaxX(graph.element, crossLayerPathSegmentOffsetMaxX);
}

function determineCrossLayerPathSegmentOffsetMaxX(edges: RequiredEdgeDataTypes[]): number {
    return Math.max(...edges.map(edge => (edge.crossLayerPathSegmentOffsetX || 0) + 1), 0);
}

export function addCrossLayerPathSegmentOffsetMaxX(element: Element<unknown>, crossLayerPathSegmentOffsetMaxX: number) {
    switch (element.kind) {
        case "node": {
            Object.assign<Node, CrossLayerPathSegmentOffsetMaxX>(element, {
                crossLayerPathSegmentOffsetMaxX: crossLayerPathSegmentOffsetMaxX
            });
            return;
        }
        case "row": {
            Object.assign<Row<unknown>, CrossLayerPathSegmentOffsetMaxX>(element, {
                crossLayerPathSegmentOffsetMaxX: crossLayerPathSegmentOffsetMaxX
            });
            element.elements.forEach(nestedElement =>
                addCrossLayerPathSegmentOffsetMaxX(nestedElement, crossLayerPathSegmentOffsetMaxX));
            return;
        }
        case "column": {
            Object.assign<Column<unknown>, CrossLayerPathSegmentOffsetMaxX>(element, {
                crossLayerPathSegmentOffsetMaxX: crossLayerPathSegmentOffsetMaxX
            });
            element.elements.forEach(nestedElement =>
                addCrossLayerPathSegmentOffsetMaxX(nestedElement, crossLayerPathSegmentOffsetMaxX));
            return;
        }
        default: {
            assertNever(element);
        }
    }
}