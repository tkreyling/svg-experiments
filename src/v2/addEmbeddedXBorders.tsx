import {Column, Element, Node, Row} from "./newGraphModel";
import {assertNever} from "./assertNever";

export type EmbeddedXBorders = { embeddedXBorders: number };

export function addEmbeddedXBordersG<N>(element: Element<N>): Element<N & EmbeddedXBorders> {
    addEmbeddedXBorders(element);
    return element as Element<N & EmbeddedXBorders>;
}

export function addEmbeddedXBorders(element: Element<unknown>): number {
    switch (element.kind) {
        case "node": {
            Object.assign<Node, EmbeddedXBorders>(element, {
                embeddedXBorders: 0
            });
            return 0;
        }
        case "row": {
            let embeddedXBorders =
                element.elements.map(addEmbeddedXBorders).reduce((sum, add) => sum + add, 0) +
                (element.border ?  1 : 0);

            Object.assign<Row<unknown>, EmbeddedXBorders>(element, {
                embeddedXBorders: embeddedXBorders
            });
            return embeddedXBorders;
        }
        case "column": {
            let embeddedXBorders =
                Math.max(...element.elements.map(addEmbeddedXBorders), 0) +
                (element.border ?  1 : 0);

            Object.assign<Column<unknown>, EmbeddedXBorders>(element, {
                embeddedXBorders: embeddedXBorders
            });
            return embeddedXBorders;
        }
        default: {
            assertNever(element);
        }
    }
}