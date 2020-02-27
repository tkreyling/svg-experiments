import {Column, Element, Graph, Node, Row, transformElements} from "../newGraphModel";
import {assertNever} from "../assertNever";

export type OffsetElementsX = { offsetElementsX: number };

export function addOffsetElementsXG<N>(graph: Graph<N>): Graph<N & OffsetElementsX> {
    return transformElements<N, OffsetElementsX>(graph, addOffsetElementsX);
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