import {Column, Element, Graph, Node, Row, transformElements} from "../newGraphModel";
import {assertNever} from "../assertNever";

export type OffsetElementsY = { offsetElementsY: number };

export function addOffsetElementsYG<N, E>(graph: Graph<N, E>): Graph<N & OffsetElementsY, E> {
    return transformElements<N, OffsetElementsY, E>(graph, addOffsetElementsY);
}

export function addOffsetElementsY(element: Element<unknown>, accumulator = {offsetElementsY: 0}) {
    switch (element.kind) {
        case "node": {
            Object.assign<Node, OffsetElementsY>(element, {
                offsetElementsY: accumulator.offsetElementsY
            });
            accumulator.offsetElementsY++;
            return;
        }
        case "row": {
            Object.assign<Row<unknown>, OffsetElementsY>(element, {
                offsetElementsY: accumulator.offsetElementsY
            });
            let maxOffsetYElements = 0;
            let oldOffsetYElements = accumulator.offsetElementsY;
            element.elements.forEach(nestedElement => {
                addOffsetElementsY(nestedElement, accumulator);
                maxOffsetYElements = Math.max(maxOffsetYElements, accumulator.offsetElementsY);
                accumulator.offsetElementsY = oldOffsetYElements;
            });
            accumulator.offsetElementsY = maxOffsetYElements;
            return;
        }
        case "column": {
            Object.assign<Column<unknown>, OffsetElementsY>(element, {
                offsetElementsY: accumulator.offsetElementsY
            });
            element.elements.forEach(nestedElement => addOffsetElementsY(nestedElement, accumulator));
            return;
        }
        default: {
            assertNever(element);
        }
    }
}