import {Graph, Group, Index, Key, Layer, LayerIndex, Node, Stack} from "./graphModel";

export function addKeyToNodeG<N extends Node & LayerIndex & Index, E, G extends LayerIndex & Index>(
    graph: Graph<N, E, G>
): Graph<N & Key, E, G & Key> {
    addKeyToNode(graph.stack);
    return graph as unknown as Graph<N & Key, E, G & Key>;
}

export function addKeyToNode<N extends Node & LayerIndex & Index, G extends LayerIndex & Index>(
    element: N | (Group<N, G> & G) | Layer<N, G> | Stack<N, G>
) {
    switch (element.kind) {
        case "stack": {
            element.elements.forEach(groups => addKeyToNode(groups));
            return;
        }
        case "layer": {
            element.elements.forEach(group => addKeyToNode(group));
            return;
        }
        case "group": {
            Object.assign(element, {
                key: "G_" + element.layerIndex + "_" + element.index
            });

            element.elements.forEach(node => addKeyToNode(node));
            return;
        }
        case "node": {
            Object.assign(element, {
                key: element.layerIndex + "_" + element.index
            });
            return;
        }
    }
}