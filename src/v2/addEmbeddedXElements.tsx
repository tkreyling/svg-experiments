import {Column, Element, Node, Row} from "./newGraphModel";
import {assertNever} from "./assertNever";

export type EmbeddedXElements = { embeddedXElements: number };

export function addEmbeddedXElementsG<N>(element: Element<N>): Element<N & EmbeddedXElements> {
    addEmbeddedXElements(element);
    return element as Element<N & EmbeddedXElements>;
}

export function addEmbeddedXElements(element: Element<unknown>): number {
    switch (element.kind) {
        case "node": {
            Object.assign<Node, EmbeddedXElements>(element, {
                embeddedXElements: 1
            });
            return 1;
        }
        case "row": {
            let embeddedXElements =
                element.elements.map(addEmbeddedXElements).reduce((sum, add) => sum + add, 0);

            Object.assign<Row<unknown>, EmbeddedXElements>(element, {
                embeddedXElements: embeddedXElements
            });
            return embeddedXElements;
        }
        case "column": {
            let embeddedXElements =
                Math.max(...element.elements.map(addEmbeddedXElements), 0);

            Object.assign<Column<unknown>, EmbeddedXElements>(element, {
                embeddedXElements: embeddedXElements
            });
            return embeddedXElements;
        }
        default: {
            assertNever(element);
        }
    }
}