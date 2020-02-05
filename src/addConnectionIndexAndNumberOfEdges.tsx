import {ascending, descending} from "./sorting";
import {ConnectionIndex, Edge, Graph, LayerPosition, NumberOfEdges} from "./graphModel";

export function addConnectionIndexAndNumberOfEdgesG<N extends LayerPosition, E, G>(graph: Graph<N, E, G>):
    Graph<N & NumberOfEdges, E & ConnectionIndex, G> {
    addConnectionIndexAndNumberOfEdges(graph.edges);
    return graph as unknown as Graph<N & NumberOfEdges, E & ConnectionIndex, G>;
}

export function addConnectionIndexAndNumberOfEdges(edges: Edge<LayerPosition>[]) {
    type NodeSide = {
        node: LayerPosition
        side: "LOWER" | "UPPER"
        edgeEnds: EdgeEnd[]
    }

    type EdgeEnd = {
        reverseNode: LayerPosition
        setIndex: (index: number) => void
    }

    let groupedByNodeAndSide = new Map<string, NodeSide>();

    function addEdgeEnd(firstNode: LayerPosition, secondNode: LayerPosition, setIndex: (index: number) => void) {
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
        let before = sameLayer.filter(edgeEnd => edgeEnd.reverseNode.index <= node.index);
        let after = sameLayer.filter(edgeEnd => edgeEnd.reverseNode.index >= node.index);
        let otherLayer = edgeEnds.filter(edgeEnd => edgeEnd.reverseNode.layerIndex !== node.layerIndex);

        before.sort(descending(e => e.reverseNode.index));
        otherLayer.sort(ascending(e => e.reverseNode.index));
        after.sort(descending(e => e.reverseNode.index));

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