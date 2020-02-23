import {Column, Element, Node, Row} from "./newGraphModel";
import {assertNever} from "./assertNever";

export type EmbeddedBordersX = { embeddedBordersX: number };

export function addEmbeddedBordersXG<N>(element: Element<N>): Element<N & EmbeddedBordersX> {
    embeddedBordersX(element);
    return element as Element<N & EmbeddedBordersX>;
}

export function embeddedBordersX(element: Element<unknown>): number {
    switch (element.kind) {
        case "node": {
            Object.assign<Node, EmbeddedBordersX>(element, {
                embeddedBordersX: 0
            });
            return 0;
        }
        case "row": {
            let embeddedXBorders =
                element.elements.map(embeddedBordersX).reduce((sum, add) => sum + add, 0) +
                (element.border ?  1 : 0);

            Object.assign<Row<unknown>, EmbeddedBordersX>(element, {
                embeddedBordersX: embeddedXBorders
            });
            return embeddedXBorders;
        }
        case "column": {
            let embeddedXBorders =
                Math.max(...element.elements.map(embeddedBordersX), 0) +
                (element.border ?  1 : 0);

            Object.assign<Column<unknown>, EmbeddedBordersX>(element, {
                embeddedBordersX: embeddedXBorders
            });
            return embeddedXBorders;
        }
        default: {
            assertNever(element);
        }
    }
}