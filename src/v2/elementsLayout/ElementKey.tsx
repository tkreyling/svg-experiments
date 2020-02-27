import {Column, Element, Graph, Node, Row, transformElements} from "../newGraphModel";
import {assertNever} from "../assertNever";

export type ElementKey = { elementKey: number };

export function addElementKeyG<N, E>(graph: Graph<N, E>): Graph<N & ElementKey, E> {
    return transformElements<N, ElementKey, E>(graph, addElementKey);
}

export function addElementKey(
    element: Element<unknown>,
    accumulator: { elementKey: number } = { elementKey: 0 }) {
    switch (element.kind) {
        case "node": {
            Object.assign<Node, ElementKey>(element, {
                elementKey: accumulator.elementKey
            });
            accumulator.elementKey++;
            return;
        }
        case "row": {
            Object.assign<Row<unknown>, ElementKey>(element, {
                elementKey: accumulator.elementKey
            });
            accumulator.elementKey++;
            element.elements.forEach(nestedElement => addElementKey(nestedElement, accumulator));
            return;
        }
        case "column": {
            Object.assign<Column<unknown>, ElementKey>(element, {
                elementKey: accumulator.elementKey
            });
            accumulator.elementKey++;
            element.elements.forEach(nestedElement => addElementKey(nestedElement, accumulator));
            return;
        }
        default: {
            assertNever(element);
        }
    }
}