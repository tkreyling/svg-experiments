import {allElements, Edge, Graph, Node, node} from "../newGraphModel";
import {OffsetElementsX} from "../elementsLayout/OffsetElementsX";
import {OffsetElementsY} from "../elementsLayout/OffsetElementsY";
import {getLowerRightNode, getUpperLeftNode} from "../EdgeHelper";
import {ElementKey} from "../elementsLayout/ElementKey";

export type NodeData = OffsetElementsX & OffsetElementsY & ElementKey

export type IsLowerLayerEdge = {
    isLowerLayerEdge: true
};

export type OriginalEdge<N, E> = {
    originalEdge: Edge<N, E>
};

export type LowerLayerEdge<N, E> = {
    lowerLayerEdge?: Edge<N, E> & IsLowerLayerEdge & OriginalEdge<N, E>
}

export function isMultiLayerEdge(edge: Edge<OffsetElementsY, unknown>) {
    return Math.abs(edge.from.offsetElementsY - edge.to.offsetElementsY) >= 2;
}

export function addSyntheticNodesAndEdgesG(graph: Graph<NodeData, unknown>): Graph<NodeData, LowerLayerEdge<NodeData, unknown>> {
    let elementKey = Math.max(...allElements(graph.element).map(element => element.elementKey));

    let syntheticNodes: NodeData[] = [];
    let syntheticEdges = graph.edges
        .filter(isMultiLayerEdge)
        .map(edge => {
            let lowerRightNode = getLowerRightNode(edge);
            let upperLeftNode = getUpperLeftNode(edge);
            elementKey++;
            let from: NodeData = Object.assign<Node, NodeData>(node(), {
                elementKey: elementKey,
                offsetElementsY: lowerRightNode.offsetElementsY - 1,
                offsetElementsX: Math.min(upperLeftNode.offsetElementsX, lowerRightNode.offsetElementsX)
            });
            syntheticNodes.push(from);
            let lowerLayerEdgeProperty: LowerLayerEdge<NodeData, unknown> = {
                lowerLayerEdge: {
                    from: from,
                    to: lowerRightNode,
                    isLowerLayerEdge: true,
                    originalEdge: edge
                }};
            Object.assign<Edge<NodeData, unknown>, LowerLayerEdge<NodeData, unknown>>(
                edge, lowerLayerEdgeProperty);
            return lowerLayerEdgeProperty.lowerLayerEdge;
        });

    return Object.assign(graph, {syntheticNodes, syntheticEdges});
}