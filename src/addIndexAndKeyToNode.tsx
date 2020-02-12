import {Graph, Group, Index, Key, Layer, Node, Stack} from "./graphModel";

export function addIndexAndKeyToNodeG<N extends Node, E, G>(graph: Graph<N, E, G>):
    Graph<N & Index & Key, E, G & Index & Key> {
    addIndexAndKeyToNode(graph.stack);
    return graph as unknown as Graph<N & Index & Key, E, G & Index & Key>;
}

export function addIndexAndKeyToNode<N extends Node, G>(
    element: N | Group<N, G> | Layer<N, G> | Stack<N, G>,
    layerIndex: number = 0,
    accumulator: { index: number, groupIndex: number } = {index: 0, groupIndex: 0}
) {
    switch (element.kind) {
        case "stack": {
            element.elements.forEach((groups, layerIndex) => {
                addIndexAndKeyToNode(groups, layerIndex);
            });
            return;
        }
        case "layer": {
            let accumulator = {index: 0, groupIndex: 0};

            element.elements.forEach(group => {
                addIndexAndKeyToNode(group, layerIndex, accumulator);
            });
            return;
        }
        case "group": {
            Object.assign(element, {
                key: "G_" + layerIndex + "_" + accumulator.groupIndex,
                index: accumulator.groupIndex
            });
            accumulator.groupIndex++;

            element.elements.forEach(node => {
                addIndexAndKeyToNode(node, layerIndex, accumulator);
            });
            return;
        }
        case "node": {
            Object.assign(element, {
                key: layerIndex + "_" + accumulator.index,
                index: accumulator.index
            });
            accumulator.index++;
            return;
        }
    }
}