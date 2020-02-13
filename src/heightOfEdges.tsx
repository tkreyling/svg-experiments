import {EDGE_SPACING} from "./styling";
import {Edge, getUpperNode, LayerIndex, LayerPosition, X} from "./graphModel";

export function heightOfEdges(edges: (Edge<LayerIndex & X> & LayerPosition)[], numberOfLayers: number): number[] {
    let groupedByLayerIndex = new Map<number, (Edge<LayerIndex & X> & LayerPosition)[]>();
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