import {Graph, Group, GroupPosition, Layer, LayerPosition, Node, Stack} from "./App";

export function addLayerPositionToNodeG<N extends Node, E, G>(graph: Graph<N, E, G>):
    Graph<N & LayerPosition, E, G & GroupPosition> {
    addLayerPositionToNode(graph.stack);
    return graph as unknown as Graph<N & LayerPosition, E, G & GroupPosition>;
}

export function addLayerPositionToNode<N extends Node, G>(
    element: N | Group<N, G> | Layer<N, G> | Stack<N, G>,
    layerIndex: number = 0,
    accumulator: { index: number, groupIndex: number } = {index: 0, groupIndex: 0}
) {
    switch (element.kind) {
        case "stack": {
            element.elements.forEach((groups, layerIndex) => {
                addLayerPositionToNode(groups, layerIndex);
            });
            return;
        }
        case "layer": {
            let accumulator = {index: 0, groupIndex: 0};

            element.elements.forEach(group => {
                addLayerPositionToNode(group, layerIndex, accumulator);
            });
            return;
        }
        case "group": {
            Object.assign(element, {
                key: "G_" + layerIndex + "_" + accumulator.groupIndex,
                index: accumulator.groupIndex,
                layerIndex: layerIndex
            });
            accumulator.groupIndex++;

            element.elements.forEach(node => {
                addLayerPositionToNode(node, layerIndex, accumulator);
            });
            return;
        }
        case "node": {
            Object.assign(element, {
                key: layerIndex + "_" + accumulator.index,
                index: accumulator.index,
                layerIndex: layerIndex
            });
            accumulator.index++;
            return;
        }
    }
}