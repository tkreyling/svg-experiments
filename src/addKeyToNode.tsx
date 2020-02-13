import {Graph, Group, Key, Layer, Node, Stack} from "./graphModel";

export function addKeyToNodeG<N extends Node, E, G>(
    graph: Graph<N, E, G>
): Graph<N & Key, E, G & Key> {
    addKeyToNode(graph.stack);
    return graph as unknown as Graph<N & Key, E, G & Key>;
}

export function addKeyToNode<N extends Node, G>(
    element: N | (Group<N, G> & G) | Layer<N, G> | Stack<N, G>,
    accumulator: { globalCounter: number } = {globalCounter: 0}
) {
    switch (element.kind) {
        case "stack": {
            element.elements.forEach(groups => addKeyToNode(groups, accumulator));
            return;
        }
        case "layer": {
            element.elements.forEach(group => addKeyToNode(group, accumulator));
            return;
        }
        case "group": {
            Object.assign(element, {
                key: "" + accumulator.globalCounter
            });
            accumulator.globalCounter++;

            element.elements.forEach(node => addKeyToNode(node, accumulator));
            return;
        }
        case "node": {
            Object.assign(element, {
                key: "" + accumulator.globalCounter
            });
            accumulator.globalCounter++;
            return;
        }
    }
}