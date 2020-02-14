import {and, ascending, descending} from "./sorting";
import {Edge, EdgeIndex, getLowerRightNode, getUpperLeftNode, Graph, Key, LayerIndex, LayerPosition, X} from "./graphModel";

export function addLayerPositionToEdgeG<N extends LayerIndex & X & Key, E, G>(graph: Graph<N, E, G>):
    Graph<N, E & LayerPosition, G> {
    addLayerPositionToEdge(graph.edges);
    return graph as unknown as Graph<N, E & LayerPosition, G>;
}

export function addLayerPositionToEdge(edges: Edge<LayerIndex & X & Key>[]) {
    let groupedByLayerIndex = new Map<number, (Edge<LayerIndex & X & Key> & EdgeIndex)[]>();

    edges
        .map((edge, index) => Object.assign(edge, {edgeIndex: index}))
        .forEach(edge => {
            let key = getUpperLeftNode(edge).layerIndex;
            let edges = groupedByLayerIndex.get(key) || [];
            edges.push(edge);
            groupedByLayerIndex.set(key, edges);
        });

    Array.from(groupedByLayerIndex.values()).forEach(addLayerPositionToEdgeForLayer);
}

function addLayerPositionToEdgeForLayer(edges: (Edge<LayerIndex & X & Key> & EdgeIndex)[]) {
    let groupedByUpperNode = new Map<string, (Edge<LayerIndex & X & Key> & EdgeIndex)[]>();

    edges.forEach(edge => {
        let key = getUpperLeftNode(edge).key;
        let edges = groupedByUpperNode.get(key) || [];
        edges.push(edge);
        groupedByUpperNode.set(key, edges);
    });

    let nodeKeys = Array.from(groupedByUpperNode.keys());
    nodeKeys.sort();

    let indexOffset = 0;
    nodeKeys.forEach(nodeKey => {
        let edges = groupedByUpperNode.get(nodeKey)!;

        let sameLayer = edges.filter(edge => getLowerRightNode(edge).layerIndex === getUpperLeftNode(edge).layerIndex);
        let sameLayerBefore = sameLayer.filter(edge => getLowerRightNode(edge).x <= getUpperLeftNode(edge).x);
        let sameLayerAfter = sameLayer.filter(edge => getLowerRightNode(edge).x > getUpperLeftNode(edge).x);
        let otherLayer = edges.filter(edge => getLowerRightNode(edge).layerIndex !== getUpperLeftNode(edge).layerIndex);
        let otherLayerBefore = otherLayer.filter(edge => getLowerRightNode(edge).x <= getUpperLeftNode(edge).x);
        let otherLayerAfter = otherLayer.filter(edge => getLowerRightNode(edge).x > getUpperLeftNode(edge).x);

        sameLayerBefore.sort(and(ascending(edge => getLowerRightNode(edge).x), ascending(edge => edge.edgeIndex)));
        otherLayerBefore.sort(and(ascending(edge => getLowerRightNode(edge).x), ascending(edge => edge.edgeIndex)));
        otherLayerAfter.sort(and(descending(edge => getLowerRightNode(edge).x), descending(edge => edge.edgeIndex)));
        sameLayerAfter.sort(and(ascending(edge => getLowerRightNode(edge).x), ascending(edge => edge.edgeIndex)));

        let before = sameLayerBefore.concat(otherLayerBefore);
        let after = sameLayerAfter.concat(otherLayerAfter);

        function addLayerPosition(edge: Edge<LayerIndex & X>, indexInArray: number, beforeOrAfter: "A" | "B") {
            let layerIndex = getUpperLeftNode(edge).layerIndex;
            let index = indexOffset + indexInArray;
            Object.assign(edge, {
                key: nodeKey + "_" + beforeOrAfter + "_" + index,
                index: index,
                layerIndex: layerIndex
            });
        }

        before.forEach((edge, index) => addLayerPosition(edge, index, "B"));
        after.forEach((edge, index) => addLayerPosition(edge, index, "A"));

        indexOffset += Math.max(before.length, after.length);
    });
}