import {Column, Edge, Element, Graph, Node, Row, transformElementsUsingGraph} from "../newGraphModel";
import {OffsetElementsY} from "../elementsLayout/OffsetElementsY";
import {getUpperLeftNode} from "../EdgeHelper";
import {OffsetElementsX} from "../elementsLayout/OffsetElementsX";
import {MidPathSegmentOffsetY} from "./MidPathSegmentOffsetY";
import {sumOfPreviousRowsFillLayers} from "../sumOfPreviousRows";
import {assertNever} from "../assertNever";

export type NodeData = OffsetElementsX & OffsetElementsY
export type EdgeData = MidPathSegmentOffsetY
type EdgeType = Edge<NodeData, EdgeData>
export type AddedNodeData = MidPathSegmentOffsetMaxPreviousY

export type MidPathSegmentOffsetMaxPreviousY = {
    midPathSegmentOffsetMaxPreviousY: number
}

export function addMidPathSegmentOffsetYAggregatesG<N extends NodeData, E extends EdgeData>(
    graph: Graph<N, E>
): Graph<N & AddedNodeData, E> {
    return transformElementsUsingGraph<N, AddedNodeData, E>(graph, addMidPathSegmentOffsetYAggregates);
}

export function addMidPathSegmentOffsetYAggregates<N extends NodeData, E extends EdgeData>(graph: Graph<N, E>) {
    let maxOffsetY = determineMaxOffsetY(graph.element);
    let maxs = determineMidPathSegmentMaxOffsetY(graph.edges);
    let sums = sumOfPreviousRowsFillLayers(maxs, maxOffsetY);
    applyMidPathSegmentOffsetYAggregates(graph.element, sums);
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

function applyMidPathSegmentOffsetYAggregates<N extends NodeData, E extends EdgeData>(
    element: Element<N>, sums: Map<number, number>) {
    switch (element.kind) {
        case "node": {
            Object.assign<Node, AddedNodeData>(element, {
                midPathSegmentOffsetMaxPreviousY: sums.get(element.offsetElementsY) || 0
            });
            return;
        }
        case "row": {
            Object.assign<Row<unknown>, AddedNodeData>(element, {
                midPathSegmentOffsetMaxPreviousY: sums.get(element.offsetElementsY) || 0
            });
            element.elements.forEach(nestedElement =>
                applyMidPathSegmentOffsetYAggregates(nestedElement, sums));
            return;
        }
        case "column": {
            Object.assign<Column<unknown>, AddedNodeData>(element, {
                midPathSegmentOffsetMaxPreviousY: sums.get(element.offsetElementsY) || 0
            });
            element.elements.forEach(nestedElement =>
                applyMidPathSegmentOffsetYAggregates(nestedElement, sums));
            return;
        }
        default: {
            assertNever(element);
        }
    }
}