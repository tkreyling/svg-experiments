import {ElementKey} from "../elementsLayout/ElementKey";
import {OffsetElementsX} from "../elementsLayout/OffsetElementsX";
import {OffsetElementsY} from "../elementsLayout/OffsetElementsY";
import {Edge, Graph} from "../newGraphModel";
import {and, ascending, descending} from "../../v1/sorting";
import {EdgeIndex} from "./EdgeIndex";

export type ConnectionIndex = {
    fromIndex: number
    toIndex: number
}

export type NumberOfEdges = {
    upperSideEdges?: number
    lowerSideEdges?: number
}

export function addConnectionIndexAndNumberOfEdgesG<N extends OffsetElementsY & OffsetElementsX & ElementKey, E extends EdgeIndex, G>(graph: Graph<N, E>):
    Graph<N & NumberOfEdges, E & ConnectionIndex> {
    addConnectionIndexAndNumberOfEdges(graph.edges);
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
        let after = sameLayer.filter(edgeEnd => edgeEnd.reverseNode.offsetElementsX >= node.offsetElementsX);
        let otherLayer = edgeEnds.filter(edgeEnd => edgeEnd.reverseNode.offsetElementsY !== node.offsetElementsY);

        before.sort(and(descending(e => e.reverseNode.offsetElementsX), descending(e => e.edge.edgeIndex)));
        otherLayer.sort(and(ascending(e => e.reverseNode.offsetElementsX), descending(e => e.reverseNode.offsetElementsY)));
        after.sort(and(descending(e => e.reverseNode.offsetElementsX), ascending(e => e.edge.edgeIndex)));

        let all = before.concat(otherLayer).concat(after);
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