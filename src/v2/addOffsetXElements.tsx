import {Element, Node} from "./newGraphModel";
import {assertNever} from "./assertNever";

export type OffsetXElements = { offsetXElements: number };

export function addOffsetXElementsG<N>(element: Element<N>): Element<N & OffsetXElements> {
    addOffsetXElements(element);
    return element as Element<N & OffsetXElements>;
}

export function addOffsetXElements(element: Element<unknown>, accumulator = {offsetXElements: 0}) {
    switch (element.kind) {
        case "node": {
            Object.assign<Node, OffsetXElements>(element, {
                offsetXElements: accumulator.offsetXElements
            });
            accumulator.offsetXElements++;
            return;
        }
        case "row": {
            element.elements.forEach(nestedElement => addOffsetXElements(nestedElement, accumulator));
            return;
        }
        case "column": {
            let maxOffsetXElements = 0;
            let oldOffsetXElements = accumulator.offsetXElements;
            element.elements.forEach(nestedElement => {
                addOffsetXElements(nestedElement, accumulator);
                maxOffsetXElements = Math.max(maxOffsetXElements, accumulator.offsetXElements);
                accumulator.offsetXElements = oldOffsetXElements;
            });
            accumulator.offsetXElements = maxOffsetXElements;
            return;
        }
        default: {
            assertNever(element);
        }
    }
}