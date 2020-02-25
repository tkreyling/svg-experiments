import {Column, Element, Node, Row} from "../newGraphModel";
import {assertNever} from "../assertNever";

export type OffsetElementsX = { offsetElementsX: number };

export function addOffsetElementsXG<N>(element: Element<N>): Element<N & OffsetElementsX> {
    addOffsetElementsX(element);
    return element as Element<N & OffsetElementsX>;
}

export function addOffsetElementsX(element: Element<unknown>, accumulator = {offsetElementsX: 0}) {
    switch (element.kind) {
        case "node": {
            Object.assign<Node, OffsetElementsX>(element, {
                offsetElementsX: accumulator.offsetElementsX
            });
            accumulator.offsetElementsX++;
            return;
        }
        case "row": {
            Object.assign<Row<unknown>, OffsetElementsX>(element, {
                offsetElementsX: accumulator.offsetElementsX
            });
            element.elements.forEach(nestedElement => addOffsetElementsX(nestedElement, accumulator));
            return;
        }
        case "column": {
            Object.assign<Column<unknown>, OffsetElementsX>(element, {
                offsetElementsX: accumulator.offsetElementsX
            });
            let maxOffsetXElements = 0;
            let oldOffsetXElements = accumulator.offsetElementsX;
            element.elements.forEach(nestedElement => {
                addOffsetElementsX(nestedElement, accumulator);
                maxOffsetXElements = Math.max(maxOffsetXElements, accumulator.offsetElementsX);
                accumulator.offsetElementsX = oldOffsetXElements;
            });
            accumulator.offsetElementsX = maxOffsetXElements;
            return;
        }
        default: {
            assertNever(element);
        }
    }
}