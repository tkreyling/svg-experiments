import {Column, Element, Graph, Node, Row, transformElements} from "../newGraphModel";
import {assertNever} from "../assertNever";

export type EmbeddedElementsY = { embeddedElementsY: number };

export function addEmbeddedElementsYG<N>(graph: Graph<N>): Graph<N & EmbeddedElementsY> {
    return transformElements<N, EmbeddedElementsY>(graph, addEmbeddedElementsY);
}

export function addEmbeddedElementsY(element: Element<unknown>): number {
    switch (element.kind) {
        case "node": {
            Object.assign<Node, EmbeddedElementsY>(element, {
                embeddedElementsY: 1
            });
            return 1;
        }
        case "row": {
            let embeddedElementsY =
                Math.max(...element.elements.map(addEmbeddedElementsY), 0);

            Object.assign<Row<unknown>, EmbeddedElementsY>(element, {
                embeddedElementsY: embeddedElementsY
            });
            return embeddedElementsY;
        }
        case "column": {
            let embeddedElementsY =
                element.elements.map(addEmbeddedElementsY).reduce((sum, add) => sum + add, 0);

            Object.assign<Column<unknown>, EmbeddedElementsY>(element, {
                embeddedElementsY: embeddedElementsY
            });
            return embeddedElementsY;
        }
        default: {
            assertNever(element);
        }
    }
}