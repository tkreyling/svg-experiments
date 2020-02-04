import {Edge, EDGE_SPACING, getUpperNode, LayerPosition} from "./App";

export function heightOfEdges(edges: (Edge<LayerPosition> & LayerPosition)[], numberOfLayers: number): number[] {
    let groupedByLayerIndex = new Map<number, (Edge<LayerPosition> & LayerPosition)[]>();
    edges.forEach(edge => {
        let layerIndex = getUpperNode(edge).layerIndex;
        let grouped = groupedByLayerIndex.get(layerIndex) || [];
        grouped.push(edge);
        groupedByLayerIndex.set(layerIndex, grouped);
    });
    let layerIndices = Array.from(Array(numberOfLayers).keys());
    return layerIndices.map(layerIndex => {
        let edgeIndices = groupedByLayerIndex.get(layerIndex)?.map(edge => edge.index) || [0];
        return Math.max(...edgeIndices) * EDGE_SPACING;
    })
}