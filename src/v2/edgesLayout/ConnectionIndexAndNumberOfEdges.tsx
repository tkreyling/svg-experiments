import {ElementKey} from "../elementsLayout/ElementKey";
import {OffsetElementsX} from "../elementsLayout/OffsetElementsX";
import {OffsetElementsY} from "../elementsLayout/OffsetElementsY";
import {Edge, Graph} from "../newGraphModel";
import {ascending, descending} from "../../v1/sorting";

export type ConnectionIndex = {
    fromIndex: number
    toIndex: number
}

export type NumberOfEdges = {
    upperSideEdges: number
    lowerSideEdges: number
}

export function addConnectionIndexAndNumberOfEdgesG<N extends OffsetElementsY & OffsetElementsX & ElementKey, E, G>(graph: Graph<N, E>):
    Graph<N & NumberOfEdges, E & ConnectionIndex> {
    connectionIndexAndNumberOfEdges(graph.edges);
    return graph as Graph<N & NumberOfEdges, E & ConnectionIndex>;
}

export function connectionIndexAndNumberOfEdges(edges: Edge<OffsetElementsY & OffsetElementsX & ElementKey, unknown>[]) {
    type NodeSide = {
        node: OffsetElementsY & OffsetElementsX
        side: "LOWER" | "UPPER"
        edgeEnds: EdgeEnd[]
    }

    type EdgeEnd = {
        reverseNode: OffsetElementsY & OffsetElementsX
        setIndex: (index: number) => void
    }

    let groupedByNodeAndSide = new Map<string, NodeSide>();

    function addEdgeEnd(firstNode: OffsetElementsY & OffsetElementsX & ElementKey, secondNode: OffsetElementsY & OffsetElementsX, setIndex: (index: number) => void) {
        let side: "LOWER" | "UPPER" = firstNode.offsetElementsY <= secondNode.offsetElementsY ? "LOWER" : "UPPER";
        let key = firstNode.elementKey + side;
        let nodeSide: NodeSide = groupedByNodeAndSide.get(key) || {
            node: firstNode,
            side: side,
            edgeEnds: []
        };
        nodeSide.edgeEnds.push({
            reverseNode: secondNode,
            setIndex: setIndex
        });
        groupedByNodeAndSide.set(key, nodeSide);
    }

    edges.forEach(edge => {
        addEdgeEnd(edge.from, edge.to, index => Object.assign(edge, {fromIndex: index}));
        addEdgeEnd(edge.to, edge.from, index => Object.assign(edge, {toIndex: index}));
    });

    Array.from(groupedByNodeAndSide.values()).forEach(({edgeEnds, node, side}) => {
        let sameLayer = edgeEnds.filter(edgeEnd => edgeEnd.reverseNode.offsetElementsY === node.offsetElementsY);
        let before = sameLayer.filter(edgeEnd => edgeEnd.reverseNode.offsetElementsX <= node.offsetElementsX);
        let after = sameLayer.filter(edgeEnd => edgeEnd.reverseNode.offsetElementsX >= node.offsetElementsX);
        let otherLayer = edgeEnds.filter(edgeEnd => edgeEnd.reverseNode.offsetElementsY !== node.offsetElementsY);

        before.sort(descending(e => e.reverseNode.offsetElementsX));
        otherLayer.sort(ascending(e => e.reverseNode.offsetElementsX));
        after.sort(descending(e => e.reverseNode.offsetElementsX));

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