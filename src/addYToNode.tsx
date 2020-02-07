import {heightOfEdges} from "./heightOfEdges";
import {ELEMENT_HEIGHT, GROUP_MARGIN_BOTTOM, GROUP_MARGIN_TOP, MARGIN_TOP, VERTICAL_SPACING} from "./styling";
import {Graph, Group, Height, Layer, LayerDimensions, LayerPosition, Node, Stack, Y} from "./graphModel";

export function heightOfNodes(element: Node | Stack<Node, unknown> | Layer<Node, unknown> | Group<Node, unknown>): number {
    switch (element.kind) {
        case "stack":
            return element.elements
                .map(heightOfNodes)
                .reduce((sum, add) => sum + add, 0);
        case "layer":
            return Math.max(...element.elements.map(heightOfNodes)) + VERTICAL_SPACING;
        case "group": {
            return GROUP_MARGIN_TOP + Math.max(...element.elements.map(heightOfNodes)) + GROUP_MARGIN_BOTTOM;
        }
        case "node":
            if (element.isPlaceholder) return 0;
            return ELEMENT_HEIGHT;
    }
}

function groupNestingLevel(element: Node | Layer<Node, unknown> | Group<Node, unknown>): number {
    switch (element.kind) {
        case "layer":
            return Math.max(...element.elements.map(groupNestingLevel));
        case "group":
            return Math.max(...element.elements.map(groupNestingLevel)) + 1;
        case "node":
            return 0;
    }
}

export function addYToNodeG<N extends (Node & LayerPosition), E extends LayerPosition, G>(
    graph: Graph<N, E, G>
): Graph<N & Y & LayerDimensions, E, G & Y & Height> {
    let heightOfAllEdges = heightOfEdges(graph.edges, graph.stack.elements.length);
    addYToNode(graph.stack, {y: 0, nodeY: 0, groupHeight: 0, belowLayerY: 0}, heightOfAllEdges);
    return graph as unknown as Graph<N & Y & LayerDimensions, E, G & Y & Height>;
}

export function addYToNode<N extends Node, G>(
    element: N | (Group<N, G> & G) | Layer<N, G> | Stack<N, G>,
    accumulator: { y: number, nodeY: number, groupHeight: number, belowLayerY: number },
    heightOfEdges: number[],
    additionalEdgeHeight: number = 0
) {
    switch (element.kind) {
        case "stack": {
            accumulator.y += MARGIN_TOP;
            element.elements.forEach((layer, layerIndex) => {
                let additionalEdgeHeight = heightOfEdges.slice(0, layerIndex).reduce((sum, add) => sum + add, 0);
                addYToNode(layer, accumulator, heightOfEdges, additionalEdgeHeight);
            });
            return;
        }
        case "layer": {
            accumulator.nodeY = accumulator.y + groupNestingLevel(element) * GROUP_MARGIN_TOP;
            accumulator.groupHeight = groupNestingLevel(element) * (GROUP_MARGIN_TOP + GROUP_MARGIN_BOTTOM) + ELEMENT_HEIGHT;
            accumulator.belowLayerY = accumulator.y + heightOfNodes(element) + additionalEdgeHeight;
            element.elements.forEach(group => {
                addYToNode(group, accumulator, heightOfEdges, additionalEdgeHeight);
            });
            accumulator.y += heightOfNodes(element);
            return;
        }
        case "group": {
            Object.assign(element, {
                y: accumulator.y + additionalEdgeHeight,
                height: accumulator.groupHeight
            });

            accumulator.y += GROUP_MARGIN_TOP;
            accumulator.groupHeight -= GROUP_MARGIN_TOP + GROUP_MARGIN_BOTTOM;
            element.elements.forEach(node => {
                addYToNode(node, accumulator, heightOfEdges, additionalEdgeHeight);
            });
            accumulator.y -= GROUP_MARGIN_TOP;
            accumulator.groupHeight += GROUP_MARGIN_TOP + GROUP_MARGIN_BOTTOM;
            return;
        }
        case "node": {
            Object.assign(element, {
                y: accumulator.nodeY + additionalEdgeHeight,
                belowLayerY: accumulator.belowLayerY
            });
            return;
        }
    }
}