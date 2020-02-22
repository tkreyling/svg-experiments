import {width} from "./width";
import {ELEMENT_WIDTH, GROUP_MARGIN_SIDE, HORIZONTAL_SPACING, MARGIN_SIDE} from "../styling";
import {Graph, Group, Layer, Node, Stack, X} from "./graphModel";

export function addXToNodeG<N extends Node, E, G>(
    graph: Graph<N, E, G>
): Graph<N & X, E, G & X> {
    addXToNode(graph.stack, {x: MARGIN_SIDE});
    return graph as unknown as Graph<N & X, E, G & X>;
}

export function addXToNode<N extends Node, G>(
    element: N | (Group<N, G> & G) | Layer<N, G> | Stack<N, G>,
    accumulator: { x: number },
    fullWidth: number = 0
) {
    switch (element.kind) {
        case "stack": {
            let fullWidth = width(element);
            element.elements.forEach(layer => {
                addXToNode(layer, accumulator, fullWidth);
            });
            accumulator.x += fullWidth + HORIZONTAL_SPACING;
            return;
        }
        case "layer": {
            let oldX = accumulator.x;
            accumulator.x = oldX + (fullWidth - width(element)) / 2;
            element.elements.forEach(group => {
                addXToNode(group, accumulator, fullWidth);
            });
            accumulator.x = oldX;
            return;
        }
        case "group": {
            Object.assign(element, {
                x: accumulator.x
            });

            accumulator.x += GROUP_MARGIN_SIDE;
            element.elements.forEach(node => {
                addXToNode(node, accumulator, fullWidth);
            });
            accumulator.x += GROUP_MARGIN_SIDE;
            return;
        }
        case "node": {
            Object.assign(element, {
                x: accumulator.x
            });
            accumulator.x += ELEMENT_WIDTH * (element.size || 1) + HORIZONTAL_SPACING;
            return;
        }
    }
}