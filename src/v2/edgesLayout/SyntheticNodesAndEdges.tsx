import {Edge, Element, Graph, Node, node} from "../newGraphModel";
import {OffsetElementsX} from "../elementsLayout/OffsetElementsX";
import {OffsetElementsY} from "../elementsLayout/OffsetElementsY";
import {getLowerRightNode, getUpperLeftNode} from "../EdgeHelper";
import {ElementKey} from "../elementsLayout/ElementKey";
import {assertNever} from "../assertNever";

export type NodeData = OffsetElementsX & OffsetElementsY & ElementKey

export type LowerLayerEdge<N, E> = {
    lowerLayerEdge?: Edge<N, E>
}

export function addSyntheticNodesAndEdgesG(graph: Graph<NodeData, unknown>): Graph<NodeData, LowerLayerEdge<NodeData, unknown>> {
    let elementKey = Math.max(...allElements(graph.element).map(element => element.elementKey));

    let syntheticNodes: NodeData[] = [];
    let syntheticEdges = graph.edges
        .filter(edge => Math.abs(edge.from.offsetElementsY - edge.to.offsetElementsY) >= 2)
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
            let syntheticEdge = {
                from: from,
                to: lowerRightNode
            };
            Object.assign<Edge<NodeData, unknown>, LowerLayerEdge<NodeData, unknown>>(
                edge, {lowerLayerEdge: syntheticEdge});
            return syntheticEdge;
        });

    return Object.assign(graph, {syntheticNodes, syntheticEdges});
}

function allElements<N>(element: Element<N>): Element<N>[] {
    switch (element.kind) {
        case "node": return [element];
        case "row": return element.elements.flatMap(allElements).concat(element);
        case "column": return element.elements.flatMap(allElements).concat(element);
        default: {
            assertNever(element);
        }
    }
}