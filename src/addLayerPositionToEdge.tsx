import {and, ascending, descending} from "./sorting";
import {Edge, EdgeIndex, getLowerNode, getUpperNode, Graph, LayerPosition, X} from "./graphModel";

export function addLayerPositionToEdgeG<N extends LayerPosition & X, E, G>(graph: Graph<N, E, G>):
    Graph<N, E & LayerPosition, G> {
    addLayerPositionToEdge(graph.edges);
    return graph as unknown as Graph<N, E & LayerPosition, G>;
}

export function addLayerPositionToEdge(edges: Edge<LayerPosition & X>[]) {
    let groupedByLayerIndex = new Map<number, (Edge<LayerPosition & X> & EdgeIndex)[]>();

    edges
        .map((edge, index) => Object.assign(edge, {edgeIndex: index}))
        .forEach(edge => {
            let key = getUpperNode(edge).layerIndex;
            let edges = groupedByLayerIndex.get(key) || [];
            edges.push(edge);
            groupedByLayerIndex.set(key, edges);
        });

    Array.from(groupedByLayerIndex.values()).forEach(addLayerPositionToEdgeForLayer);
}

function addLayerPositionToEdgeForLayer(edges: (Edge<LayerPosition & X> & EdgeIndex)[]) {
    let groupedByUpperNode = new Map<string, (Edge<LayerPosition & X> & EdgeIndex)[]>();

    edges.forEach(edge => {
        let key = getUpperNode(edge).key;
        let edges = groupedByUpperNode.get(key) || [];
        edges.push(edge);
        groupedByUpperNode.set(key, edges);
    });

    let nodeKeys = Array.from(groupedByUpperNode.keys());
    nodeKeys.sort();

    let indexOffset = 0;
    nodeKeys.forEach(nodeKey => {
        let edges = groupedByUpperNode.get(nodeKey)!;

        let sameLayer = edges.filter(edge => getLowerNode(edge).layerIndex === getUpperNode(edge).layerIndex);
        let sameLayerBefore = sameLayer.filter(edge => getLowerNode(edge).index <= getUpperNode(edge).index);
        let sameLayerAfter = sameLayer.filter(edge => getLowerNode(edge).index > getUpperNode(edge).index);
        let otherLayer = edges.filter(edge => getLowerNode(edge).layerIndex !== getUpperNode(edge).layerIndex);
        let otherLayerBefore = otherLayer.filter(edge => getLowerNode(edge).x <= getUpperNode(edge).x);
        let otherLayerAfter = otherLayer.filter(edge => getLowerNode(edge).x > getUpperNode(edge).x);

        sameLayerBefore.sort(and(ascending(edge => getLowerNode(edge).index), ascending(edge => edge.edgeIndex)));
        otherLayerBefore.sort(and(ascending(edge => getLowerNode(edge).index), ascending(edge => edge.edgeIndex)));
        otherLayerAfter.sort(and(descending(edge => getLowerNode(edge).index), descending(edge => edge.edgeIndex)));
        sameLayerAfter.sort(and(ascending(edge => getLowerNode(edge).index), ascending(edge => edge.edgeIndex)));

        let before = sameLayerBefore.concat(otherLayerBefore);
        let after = sameLayerAfter.concat(otherLayerAfter);

        function addLayerPosition(edge: Edge<LayerPosition>, indexInArray: number, beforeOrAfter: "A" | "B") {
            let layerIndex = getUpperNode(edge).layerIndex;
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