import {Group, Layer, Node, Stack} from "./App";
import {ELEMENT_WIDTH, GROUP_MARGIN_SIDE, HORIZONTAL_SPACING} from "./styling";

export function width(element: Node | Stack<Node, unknown> | Layer<Node, unknown> | Group<Node, unknown>): number {
    switch (element.kind) {
        case "stack":
            return Math.max(...element.elements.map(width));
        case "layer":
            return element.elements
                .map(width)
                .map((width, index) => width + (index > 0 ? HORIZONTAL_SPACING : 0))
                .reduce((sum, add) => sum + add, 0);
        case "group": {
            return element.elements
                .map(width)
                .map((width, index) => width + (index > 0 ? HORIZONTAL_SPACING : 0))
                .reduce((sum, add) => sum + add, 0) + 2 * GROUP_MARGIN_SIDE;
        }
        case "node":
            return ELEMENT_WIDTH * (element.size || 1);
    }
}