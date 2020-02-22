import {Column, Element, Node, Row} from "./newGraphModel";
import {assertNever} from "./assertNever";

export type OffsetYElements = { offsetYElements: number };

export function addOffsetYElementsG<N>(element: Element<N>): Element<N & OffsetYElements> {
    addOffsetYElements(element);
    return element as Element<N & OffsetYElements>;
}

export function addOffsetYElements(element: Element<unknown>, accumulator = {offsetYElements: 0}) {
    switch (element.kind) {
        case "node": {
            Object.assign<Node, OffsetYElements>(element, {
                offsetYElements: accumulator.offsetYElements
            });
            accumulator.offsetYElements++;
            return;
        }
        case "row": {
            Object.assign<Row<unknown>, OffsetYElements>(element, {
                offsetYElements: accumulator.offsetYElements
            });
            let maxOffsetYElements = 0;
            let oldOffsetYElements = accumulator.offsetYElements;
            element.elements.forEach(nestedElement => {
                addOffsetYElements(nestedElement, accumulator);
                maxOffsetYElements = Math.max(maxOffsetYElements, accumulator.offsetYElements);
                accumulator.offsetYElements = oldOffsetYElements;
            });
            accumulator.offsetYElements = maxOffsetYElements;
            return;
        }
        case "column": {
            Object.assign<Column<unknown>, OffsetYElements>(element, {
                offsetYElements: accumulator.offsetYElements
            });
            element.elements.forEach(nestedElement => addOffsetYElements(nestedElement, accumulator));
            return;
        }
        default: {
            assertNever(element);
        }
    }
}