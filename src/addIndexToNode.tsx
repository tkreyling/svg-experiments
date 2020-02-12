import {Graph, Group, Index, Layer, Node, Stack} from "./graphModel";

export function addIndexToNodeG<N extends Node, E, G>(graph: Graph<N, E, G>):
    Graph<N & Index, E, G & Index> {
    addIndexToNode(graph.stack);
    return graph as unknown as Graph<N & Index, E, G & Index>;
}

export function addIndexToNode<N extends Node, G>(
    element: N | Group<N, G> | Layer<N, G> | Stack<N, G>,
    accumulator: { index: number, groupIndex: number } = {index: 0, groupIndex: 0}
) {
    switch (element.kind) {
        case "stack": {
            element.elements.forEach(groups => addIndexToNode(groups));
            return;
        }
        case "layer": {
            let accumulator = {index: 0, groupIndex: 0};

            element.elements.forEach(group => addIndexToNode(group, accumulator));
            return;
        }
        case "group": {
            Object.assign(element, {
                index: accumulator.groupIndex
            });
            accumulator.groupIndex++;

            element.elements.forEach(node => addIndexToNode(node, accumulator));
            return;
        }
        case "node": {
            Object.assign(element, {
                index: accumulator.index
            });
            accumulator.index++;
            return;
        }
    }
}