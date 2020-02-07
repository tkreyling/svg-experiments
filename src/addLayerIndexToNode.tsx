import {Graph, Group, Layer, LayerIndex, Node, Stack} from "./graphModel";

export function addLayerIndexToNodeG<N extends Node, E, G>(graph: Graph<N, E, G>):
    Graph<N & LayerIndex, E, G & LayerIndex> {
    addLayerIndexToNode(graph.stack);
    return graph as unknown as Graph<N & LayerIndex, E, G & LayerIndex>;
}

export function addLayerIndexToNode<N extends Node, G>(
    element: N | Group<N, G> | Layer<N, G> | Stack<N, G>,
    layerIndex: number = 0
) {
    switch (element.kind) {
        case "stack": {
            element.elements.forEach((groups, layerIndex) => {
                addLayerIndexToNode(groups, layerIndex);
            });
            return;
        }
        case "layer": {
            element.elements.forEach(group => {
                addLayerIndexToNode(group, layerIndex);
            });
            return;
        }
        case "group": {
            Object.assign(element, {
                layerIndex: layerIndex
            });

            element.elements.forEach(node => {
                addLayerIndexToNode(node, layerIndex);
            });
            return;
        }
        case "node": {
            Object.assign(element, {
                layerIndex: layerIndex
            });
            return;
        }
    }
}