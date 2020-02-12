import {Graph, Group, Layer, LayerIndex, Node, Stack} from "./graphModel";

function numberOfLayers(element: Node | Stack<Node, unknown> | Layer<Node, unknown> | Group<Node, unknown>): number {
    switch (element.kind) {
        case "stack":
            return element.elements
                .map(numberOfLayers)
                .reduce((sum, add) => sum + add, 0);
        case "layer":
            return Math.max(...element.elements.map(numberOfLayers));
        case "group": {
            return Math.max(...element.elements.map(numberOfLayers));
        }
        case "node":
            return 1;
    }
}

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
            element.elements.forEach(nestedElement => {
                addLayerIndexToNode(nestedElement, layerIndex);
                layerIndex += numberOfLayers(nestedElement);
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