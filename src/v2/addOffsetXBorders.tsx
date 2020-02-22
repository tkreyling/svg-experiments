import {Element, Node} from "./newGraphModel";
import {assertNever} from "./assertNever";

export type OffsetXBorder = { offsetXBorders: number };

export function addOffsetXBordersG<N>(element: Element<N>): Element<N & OffsetXBorder> {
    addOffsetXBorders(element);
    return element as Element<N & OffsetXBorder>;
}

export function addOffsetXBorders(element: Element<unknown>, accumulator = {offsetXBorders: 0}) {
    switch (element.kind) {
        case "node": {
            Object.assign<Node, OffsetXBorder>(element, {
                offsetXBorders: accumulator.offsetXBorders
            });
            return;
        }
        case "row": {
            if (element.border) {
                accumulator.offsetXBorders++;
            }
            element.elements.forEach(nestedElement => addOffsetXBorders(nestedElement, accumulator));
            if (element.border) {
                accumulator.offsetXBorders++;
            }
            return;
        }
        case "column": {
            if (element.border) {
                accumulator.offsetXBorders++;
            }
            let oldOffsetXBorders = accumulator.offsetXBorders;
            element.elements.forEach(nestedElement => {
                addOffsetXBorders(nestedElement, accumulator);
                accumulator.offsetXBorders = oldOffsetXBorders;
            });
            if (element.border) {
                accumulator.offsetXBorders++;
            }
            return;
        }
        default: {
            assertNever(element);
        }
    }
}