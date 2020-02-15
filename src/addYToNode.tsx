import {heightOfEdges} from "./heightOfEdges";
import {
    ELEMENT_HEIGHT,
    GROUP_MARGIN_BOTTOM,
    GROUP_MARGIN_TOP,
    MARGIN_TOP,
    VERTICAL_SPACING
} from "./styling";
import {Graph, Group, Height, Layer, LayerDimensions, LayerIndex, LayerPosition, Node, Stack, X, Y} from "./graphModel";

export function heightOfNodes(
    element: Node | Stack<Node, unknown> | Layer<Node, unknown> | Group<Node, unknown>
): number {
    switch (element.kind) {
        case "stack":
            return element.elements
                .map(heightOfNodes)
                .map((height, index) => height + (index > 0 ? VERTICAL_SPACING : 0))
                .reduce((sum, add) => sum + add, 0);
        case "layer":
            return Math.max(...element.elements.map(heightOfNodes));
        case "group": {
            return GROUP_MARGIN_TOP + Math.max(...element.elements.map(heightOfNodes)) + GROUP_MARGIN_BOTTOM;
        }
        case "node":
            if (element.isPlaceholder) return 0;
            return ELEMENT_HEIGHT;
    }
}

export function heightOfNodesOnlyFirstLayerOfNestedStacks(
    element: Node | Stack<Node, unknown> | Layer<Node, unknown> | Group<Node, unknown>
): number {
    switch (element.kind) {
        case "stack":
            if (element.elements.length === 0) return 0;
            return heightOfNodesOnlyFirstLayerOfNestedStacks(element.elements[0]);
        case "layer":
            return Math.max(...element.elements.map(heightOfNodesOnlyFirstLayerOfNestedStacks));
        case "group": {
            return GROUP_MARGIN_TOP +
                Math.max(...element.elements.map(heightOfNodesOnlyFirstLayerOfNestedStacks)) +
                GROUP_MARGIN_BOTTOM;
        }
        case "node":
            if (element.isPlaceholder) return 0;
            return ELEMENT_HEIGHT;
    }
}

function groupNestingLevel(element: Node | Stack<Node, unknown> | Layer<Node, unknown> | Group<Node, unknown>): number {
    switch (element.kind) {
        case "stack": {
            if (element.elements.length === 0) return 0;
            // Ignore the nesting of the elements below the first one
            return groupNestingLevel(element.elements[0]);
        }
        case "layer":
            return Math.max(...element.elements.map(groupNestingLevel));
        case "group":
            return Math.max(...element.elements.map(groupNestingLevel)) + 1;
        case "node":
            return 0;
    }
}

export function addYToNodeG<N extends (Node & LayerIndex & X), E extends LayerPosition, G extends LayerIndex>(
    graph: Graph<N, E, G>
): Graph<N & Y & LayerDimensions, E, G & Y & Height> {
    let heightOfAllEdges = heightOfEdges(graph.edges, graph.stack.elements.length);
    addYToNode(graph.stack, {y: MARGIN_TOP, nodeY: 0, groupHeight: 0, belowLayerY: 0}, heightOfAllEdges);
    return graph as unknown as Graph<N & Y & LayerDimensions, E, G & Y & Height>;
}

export function addYToNode<N extends Node & LayerIndex, G extends LayerIndex>(
    element: N | (Group<N, G> & G) | Layer<N, G> | Stack<N, G>,
    accumulator: { y: number, nodeY: number, groupHeight: number, belowLayerY: number },
    heightOfEdges: number[]
) {
    switch (element.kind) {
        case "stack": {
            let oldY = accumulator.y;
            let oldNodeY = accumulator.nodeY;
            let oldBelowLayerY = accumulator.belowLayerY;
            element.elements.forEach((layer, layerIndex) => {
                addYToNode(layer, accumulator, heightOfEdges);
            });
            accumulator.y = oldY;
            accumulator.nodeY = oldNodeY;
            accumulator.belowLayerY = oldBelowLayerY;
            return;
        }
        case "layer": {
            accumulator.nodeY = accumulator.y + groupNestingLevel(element) * GROUP_MARGIN_TOP;
            accumulator.groupHeight = groupNestingLevel(element) * (GROUP_MARGIN_TOP + GROUP_MARGIN_BOTTOM) + ELEMENT_HEIGHT;
            accumulator.belowLayerY = accumulator.y + heightOfNodesOnlyFirstLayerOfNestedStacks(element) + VERTICAL_SPACING;
            element.elements.forEach(nestedElement => {
                addYToNode(nestedElement, accumulator, heightOfEdges);
            });
            accumulator.y += heightOfNodes(element) + VERTICAL_SPACING;
            return;
        }
        case "group": {
            let additionalEdgeHeight = heightOfEdges.slice(0, element.layerIndex).reduce((sum, add) => sum + add, 0);
            Object.assign(element, {
                y: accumulator.y + additionalEdgeHeight,
                height: accumulator.groupHeight
            });

            accumulator.y += GROUP_MARGIN_TOP;
            accumulator.groupHeight -= GROUP_MARGIN_TOP + GROUP_MARGIN_BOTTOM;
            element.elements.forEach(node => {
                addYToNode(node, accumulator, heightOfEdges);
            });
            accumulator.y -= GROUP_MARGIN_TOP;
            accumulator.groupHeight += GROUP_MARGIN_TOP + GROUP_MARGIN_BOTTOM;
            return;
        }
        case "node": {
            let additionalEdgeHeight = heightOfEdges.slice(0, element.layerIndex).reduce((sum, add) => sum + add, 0);
            Object.assign(element, {
                y: accumulator.nodeY + additionalEdgeHeight,
                belowLayerY: accumulator.belowLayerY + additionalEdgeHeight
            });
            return;
        }
    }
}