import {Column, Element, Node, Row} from "../newGraphModel";
import {assertNever} from "../assertNever";

export type EmbeddedElementsX = { embeddedElementsX: number };

export function addEmbeddedElementsXG<N>(element: Element<N>): Element<N & EmbeddedElementsX> {
    addEmbeddedElementsX(element);
    return element as Element<N & EmbeddedElementsX>;
}

export function addEmbeddedElementsX(element: Element<unknown>): number {
    switch (element.kind) {
        case "node": {
            Object.assign<Node, EmbeddedElementsX>(element, {
                embeddedElementsX: 1
            });
            return 1;
        }
        case "row": {
            let embeddedXElements =
                element.elements.map(addEmbeddedElementsX).reduce((sum, add) => sum + add, 0);

            Object.assign<Row<unknown>, EmbeddedElementsX>(element, {
                embeddedElementsX: embeddedXElements
            });
            return embeddedXElements;
        }
        case "column": {
            let embeddedXElements =
                Math.max(...element.elements.map(addEmbeddedElementsX), 0);

            Object.assign<Column<unknown>, EmbeddedElementsX>(element, {
                embeddedElementsX: embeddedXElements
            });
            return embeddedXElements;
        }
        default: {
            assertNever(element);
        }
    }
}