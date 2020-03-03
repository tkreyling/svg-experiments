import {Column, Edge, Element, Graph, Node, Row, transformElementsUsingGraph} from "../newGraphModel";
import {OffsetElementsY} from "../elementsLayout/OffsetElementsY";
import {getUpperLeftNode} from "../EdgeHelper";
import {OffsetElementsX} from "../elementsLayout/OffsetElementsX";
import {MidPathSegmentOffsetY} from "./MidPathSegmentOffsetY";
import {sumOfPreviousRowsFillLayers} from "../sumOfPreviousRows";
import {assertNever} from "../assertNever";
import {getMostBottomOffsetElementsY} from "../getMostBottomOffsetElementsY";

export type NodeData = OffsetElementsX & OffsetElementsY
export type EdgeData = MidPathSegmentOffsetY
type EdgeType = Edge<NodeData, EdgeData>
export type AddedNodeData = MidPathSegmentOffsetMaxPreviousY & EmbeddedMidPathSegmentY

export type MidPathSegmentOffsetMaxPreviousY = {
    midPathSegmentOffsetMaxPreviousY: number
}

export type EmbeddedMidPathSegmentY = { embeddedMidPathSegmentY: number };

export function addMidPathSegmentOffsetYAggregatesG<N extends NodeData, E extends EdgeData>(
    graph: Graph<N, E>
): Graph<N & AddedNodeData, E> {
    return transformElementsUsingGraph<N, AddedNodeData, E>(graph, addMidPathSegmentOffsetYAggregates);
}

export function addMidPathSegmentOffsetYAggregates<N extends NodeData, E extends EdgeData>(graph: Graph<N, E>) {
    let maxOffsetY = determineMaxOffsetY(graph.element);
    let maxs = determineMidPathSegmentMaxOffsetY(graph.edges.concat(graph.syntheticEdges));
    let sums = sumOfPreviousRowsFillLayers(maxs, maxOffsetY);
    applyMidPathSegmentOffsetYAggregates(graph.element, maxs, sums);
    graph.syntheticNodes.forEach(node => applyMidPathSegmentOffsetYAggregates(node, maxs, sums));
}

function determineMaxOffsetY(element: Element<OffsetElementsY>): number {
    switch (element.kind) {
        case "node": return element.offsetElementsY;
        case "column":
        case "row":
            return Math.max(...element.elements.map(determineMaxOffsetY));
        default: {
            assertNever(element);
        }
    }
}

function determineMidPathSegmentMaxOffsetY(edges: EdgeType[]): Map<number, number> {
    let result = new Map<number, number>();
    edges.forEach(edge => {
        let offsetElementsY = getUpperLeftNode(edge).offsetElementsY;
        let midPathSegmentOffsetY = result.get(offsetElementsY) || 0;
        result.set(offsetElementsY, Math.max(midPathSegmentOffsetY, edge.midPathSegmentOffsetY));
    });
    return result;
}

function calculateEmbeddedPaths(element: Element<OffsetElementsY>, current: Map<number, number>) {
    let from = element.offsetElementsY;
    let to = getMostBottomOffsetElementsY(element) - 1;
    let embeddedPaths = 0;
    for (let i = from; i <= to; i++) {
        embeddedPaths += current.get(i) || 0;
    }
    return embeddedPaths;
}

function applyMidPathSegmentOffsetYAggregates<N extends NodeData, E extends EdgeData>(
    element: Element<N>,
    current: Map<number, number>,
    sums: Map<number, number>
) {
    switch (element.kind) {
        case "node": {
            Object.assign<Node, AddedNodeData>(element, {
                midPathSegmentOffsetMaxPreviousY: sums.get(element.offsetElementsY) || 0,
                embeddedMidPathSegmentY: 0
            });
            return;
        }
        case "row": {
            Object.assign<Row<unknown>, AddedNodeData>(element, {
                midPathSegmentOffsetMaxPreviousY: sums.get(element.offsetElementsY) || 0,
                embeddedMidPathSegmentY: calculateEmbeddedPaths(element, current)
            });
            element.elements.forEach(nestedElement =>
                applyMidPathSegmentOffsetYAggregates(nestedElement, current, sums));
            return;
        }
        case "column": {
            Object.assign<Column<unknown>, AddedNodeData>(element, {
                midPathSegmentOffsetMaxPreviousY: sums.get(element.offsetElementsY) || 0,
                embeddedMidPathSegmentY: calculateEmbeddedPaths(element, current)
            });
            element.elements.forEach(nestedElement =>
                applyMidPathSegmentOffsetYAggregates(nestedElement, current, sums));
            return;
        }
        default: {
            assertNever(element);
        }
    }
}