import {ascending, descending} from "./sorting";
import {ConnectionIndex, Edge, Graph, Key, LayerIndex, NumberOfEdges, X} from "./graphModel";

export function addConnectionIndexAndNumberOfEdgesG<N extends LayerIndex & X & Key, E, G>(graph: Graph<N, E, G>):
    Graph<N & NumberOfEdges, E & ConnectionIndex, G> {
    addConnectionIndexAndNumberOfEdges(graph.edges);
    return graph as unknown as Graph<N & NumberOfEdges, E & ConnectionIndex, G>;
}

export function addConnectionIndexAndNumberOfEdges(edges: Edge<LayerIndex & X & Key>[]) {
    type NodeSide = {
        node: LayerIndex & X
        side: "LOWER" | "UPPER"
        edgeEnds: EdgeEnd[]
    }

    type EdgeEnd = {
        reverseNode: LayerIndex & X
        setIndex: (index: number) => void
    }

    let groupedByNodeAndSide = new Map<string, NodeSide>();

    function addEdgeEnd(firstNode: LayerIndex & X & Key, secondNode: LayerIndex & X, setIndex: (index: number) => void) {
        let side: "LOWER" | "UPPER" = firstNode.layerIndex <= secondNode.layerIndex ? "LOWER" : "UPPER";
        let key = firstNode.key + side;
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
        let sameLayer = edgeEnds.filter(edgeEnd => edgeEnd.reverseNode.layerIndex === node.layerIndex);
        let before = sameLayer.filter(edgeEnd => edgeEnd.reverseNode.x <= node.x);
        let after = sameLayer.filter(edgeEnd => edgeEnd.reverseNode.x >= node.x);
        let otherLayer = edgeEnds.filter(edgeEnd => edgeEnd.reverseNode.layerIndex !== node.layerIndex);

        before.sort(descending(e => e.reverseNode.x));
        otherLayer.sort(ascending(e => e.reverseNode.x));
        after.sort(descending(e => e.reverseNode.x));

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