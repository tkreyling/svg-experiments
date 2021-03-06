import {Column, Element, Graph, Node, Row, transformElements} from "../newGraphModel";
import {assertNever} from "../assertNever";
import {BorderIndexLeft} from "./BorderIndexLeft";
import {BorderIndexRight} from "./BorderIndexRight";

export type BorderIndexMaxX = { borderIndexMaxX: number };

export function addBorderIndexMaxXG<N extends BorderIndexLeft & BorderIndexRight, E>(
    graph: Graph<N, E>
): Graph<N & BorderIndexMaxX, E> {
    return transformElements<N, BorderIndexMaxX, E>(graph, determineAndAddBorderIndexMaxX);
}

function determineAndAddBorderIndexMaxX(element: Element<BorderIndexLeft & BorderIndexRight>) {
    let maxEmbeddedXBorders = determineBorderIndexMaxX(element);
    addBorderIndexMaxX(element, maxEmbeddedXBorders);
}

function determineBorderIndexMaxX(element: Element<BorderIndexLeft & BorderIndexRight>): number {
    switch (element.kind) {
        case "node": return 0;
        case "row": return Math.max(
            ...element.elements.map(determineBorderIndexMaxX),
            element.borderIndexLeft,
            element.borderIndexRight
        );
        case "column": return Math.max(
            ...element.elements.map(determineBorderIndexMaxX),
            element.borderIndexLeft,
            element.borderIndexRight
        );
        default: {
            assertNever(element);
        }
    }
}

export function addBorderIndexMaxX(element: Element<BorderIndexLeft & BorderIndexRight>, borderIndexMaxX: number) {
    switch (element.kind) {
        case "node": {
            Object.assign<Node, BorderIndexMaxX>(element, {
                borderIndexMaxX: borderIndexMaxX
            });
            return;
        }
        case "row": {
            Object.assign<Row<unknown>, BorderIndexMaxX>(element, {
                borderIndexMaxX: borderIndexMaxX
            });
            element.elements.forEach(nestedElement =>
                addBorderIndexMaxX(nestedElement, borderIndexMaxX));
            return;
        }
        case "column": {
            Object.assign<Column<unknown>, BorderIndexMaxX>(element, {
                borderIndexMaxX: borderIndexMaxX
            });
            element.elements.forEach(nestedElement =>
                addBorderIndexMaxX(nestedElement, borderIndexMaxX));
            return;
        }
        default: {
            assertNever(element);
        }
    }
}