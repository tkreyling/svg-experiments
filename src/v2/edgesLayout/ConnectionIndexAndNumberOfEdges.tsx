import {ElementKey} from "../elementsLayout/ElementKey";
import {OffsetElementsX} from "../elementsLayout/OffsetElementsX";
import {OffsetElementsY} from "../elementsLayout/OffsetElementsY";
import {Edge, Graph} from "../newGraphModel";
import {and, ascending, descending} from "../sorting";
import {EdgeIndex} from "./EdgeIndex";
import {LowerLayerEdge} from "./SyntheticNodesAndEdges";
import {fromIsUpperLeft} from "../EdgeHelper";

export type ConnectionIndex = {
    fromIndex: number
    toIndex: number
}

export type NumberOfEdges = {
    upperSideEdges?: number
    lowerSideEdges?: number
}

export function addConnectionIndexAndNumberOfEdgesG<
    N extends OffsetElementsY & OffsetElementsX & ElementKey,
    E extends EdgeIndex & LowerLayerEdge<unknown, unknown>, G>(
        graph: Graph<N, E>):
    Graph<N & NumberOfEdges, E & ConnectionIndex> {
    addConnectionIndexAndNumberOfEdges(graph.edges);
    let edgesWithConnectionIndex = graph.edges as unknown as Edge<OffsetElementsX & OffsetElementsY, ConnectionIndex & LowerLayerEdge<unknown, unknown>>[];
    copyConnectionIndexToLowerLayerEdge(edgesWithConnectionIndex);
    return graph as Graph<N & NumberOfEdges, E & ConnectionIndex>;
}

type EdgeType = Edge<OffsetElementsY & OffsetElementsX & ElementKey, EdgeIndex>

export function addConnectionIndexAndNumberOfEdges(edges: EdgeType[]) {
    type NodeSide = {
        node: OffsetElementsY & OffsetElementsX
        side: "LOWER" | "UPPER"
        edgeEnds: EdgeEnd[]
    }

    type EdgeEnd = {
        edge: EdgeType
        reverseNode: OffsetElementsY & OffsetElementsX
        setIndex: (index: number) => void
    }

    let groupedByNodeAndSide = new Map<string, NodeSide>();

    function addEdgeEnd(edge: EdgeType, firstNode: OffsetElementsY & OffsetElementsX & ElementKey, secondNode: OffsetElementsY & OffsetElementsX, setIndex: (index: number) => void) {
        let side: "LOWER" | "UPPER" = firstNode.offsetElementsY <= secondNode.offsetElementsY ? "LOWER" : "UPPER";
        let key = firstNode.elementKey + side;
        let nodeSide: NodeSide = groupedByNodeAndSide.get(key) || {
            node: firstNode,
            side: side,
            edgeEnds: []
        };
        nodeSide.edgeEnds.push({
            edge: edge,
            reverseNode: secondNode,
            setIndex: setIndex
        });
        groupedByNodeAndSide.set(key, nodeSide);
    }

    edges.forEach(edge => {
        addEdgeEnd(edge, edge.from, edge.to, index => Object.assign(edge, {fromIndex: index}));
        addEdgeEnd(edge, edge.to, edge.from, index => Object.assign(edge, {toIndex: index}));
    });

    Array.from(groupedByNodeAndSide.values()).forEach(({edgeEnds, node, side}) => {
        let sameLayer = edgeEnds.filter(edgeEnd => edgeEnd.reverseNode.offsetElementsY === node.offsetElementsY);
        let before = sameLayer.filter(edgeEnd => edgeEnd.reverseNode.offsetElementsX <= node.offsetElementsX);
        let after = sameLayer.filter(edgeEnd => edgeEnd.reverseNode.offsetElementsX > node.offsetElementsX);
        let otherLayer = edgeEnds.filter(edgeEnd => edgeEnd.reverseNode.offsetElementsY !== node.offsetElementsY);
        let otherLayerBefore = otherLayer.filter(edgeEnd => edgeEnd.reverseNode.offsetElementsX <= node.offsetElementsX);
        let otherLayerAfter = otherLayer.filter(edgeEnd => edgeEnd.reverseNode.offsetElementsX > node.offsetElementsX);

        before.sort(and(descending(e => e.reverseNode.offsetElementsX), descending(e => e.edge.edgeIndex)));
        otherLayerBefore.sort(and(ascending(e => e.reverseNode.offsetElementsX), descending(e => e.reverseNode.offsetElementsY)));
        otherLayerAfter.sort(and(ascending(e => e.reverseNode.offsetElementsX), ascending(e => e.reverseNode.offsetElementsY)));
        after.sort(and(descending(e => e.reverseNode.offsetElementsX), ascending(e => e.edge.edgeIndex)));

        let all = before.concat(otherLayerBefore).concat(otherLayerAfter).concat(after);
        all.forEach((edgeEnd, index) => {
            edgeEnd.setIndex(index);
        });
        if (side === "UPPER") {
            Object.assign(node, {
                upperSideEdges: edgeEnds.length
            });
        } else {
            Object.assign(node, {
                lowerSideEdges: edgeEnds.length
            });
        }
    });
}

function copyConnectionIndexToLowerLayerEdge(edges: Edge<OffsetElementsX & OffsetElementsY, ConnectionIndex & LowerLayerEdge<unknown, unknown>>[]) {
    edges.forEach(edge => {
        if (edge.lowerLayerEdge) {
            Object.assign<Edge<unknown, unknown>, ConnectionIndex>(edge.lowerLayerEdge, {
                fromIndex: 0,
                toIndex: getLowerRightNodeIndex(edge)
            });
        }
    });
}

export function getUpperLeftNodeIndex<N extends OffsetElementsX & OffsetElementsY>(edge: Edge<N, ConnectionIndex>): number {
    return fromIsUpperLeft(edge) ? edge.fromIndex : edge.toIndex;
}

export function getLowerRightNodeIndex<N extends OffsetElementsX & OffsetElementsY>(edge: Edge<N, ConnectionIndex>): number {
    return fromIsUpperLeft(edge) ? edge.toIndex : edge.fromIndex;
}