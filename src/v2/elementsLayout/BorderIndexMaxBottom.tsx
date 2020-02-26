import {Column, Element, Graph, Node, Row} from "../newGraphModel";
import {assertNever} from "../assertNever";
import {BorderIndexBottom} from "./BorderIndexBottom";
import {OffsetElementsY} from "./OffsetElementsY";
import {sumOfPreviousRows} from "../sumOfPreviousRows";
import {getMostBottomOffsetElementsY} from "../getMostBottomOffsetElementsY";

export type BorderIndexMaxBottom = { borderIndexMaxBottom: number };
export type BorderIndexMaxPreviousBottom = { borderIndexMaxPreviousBottom: number };
export type EmbeddedBorderIndexMaxBottom = { embeddedBorderIndexMaxBottom: number };

export function addBorderIndexMaxBottomG<N extends OffsetElementsY & BorderIndexBottom>(
    graph: Graph<N>
): Graph<N & BorderIndexMaxBottom & BorderIndexMaxPreviousBottom & EmbeddedBorderIndexMaxBottom> {
    let max = determineBorderIndexMaxBottom(graph.element);
    let sums = sumOfPreviousRows(max);
    addBorderIndexMaxBottom(graph.element, max, sums);
    return graph as Graph<N & BorderIndexMaxBottom & BorderIndexMaxPreviousBottom & EmbeddedBorderIndexMaxBottom>;
}

function determineBorderIndexMaxBottom(element: Element<OffsetElementsY & BorderIndexBottom>): Map<number, number> {
    switch (element.kind) {
        case "node": {
            let map = new Map<number, number>();
            map.set(element.offsetElementsY, element.borderIndexBottom);
            return map;
        }
        case "row":
        case "column": {
            let map = new Map<number, number>();
            map.set(getMostBottomOffsetElementsY(element), element.borderIndexBottom);
            return element.elements.map(determineBorderIndexMaxBottom).reduce((accumulator, addition) => {
                Array.from(addition.entries()).forEach((entry) => {
                    let max = Math.max(accumulator.get(entry[0]) || 0, entry[1]);
                    accumulator.set(entry[0], max);
                });
                return accumulator;
            }, map);
        }
        default: {
            assertNever(element);
        }
    }
}

function calculateEmbeddedBorders(element: Element<OffsetElementsY>, current: Map<number, number>) {
    let from = element.offsetElementsY;
    let to = getMostBottomOffsetElementsY(element) - 1;
    let embeddedBorders = 0;
    for (let i = from; i <= to; i++) {
        embeddedBorders += current.get(i) || 0;
    }
    return embeddedBorders;
}

function addBorderIndexMaxBottom(
    element: Element<OffsetElementsY & BorderIndexBottom>,
    current: Map<number, number>,
    sums: Map<number, number>
) {
    switch (element.kind) {
        case "node": {
            Object.assign<Node, BorderIndexMaxBottom & BorderIndexMaxPreviousBottom & EmbeddedBorderIndexMaxBottom>(element, {
                borderIndexMaxBottom: current.get(element.offsetElementsY)!,
                borderIndexMaxPreviousBottom: sums.get(element.offsetElementsY)!,
                embeddedBorderIndexMaxBottom: 0
            });
            return;
        }
        case "row": {
            Object.assign<Row<unknown>, BorderIndexMaxBottom & BorderIndexMaxPreviousBottom & EmbeddedBorderIndexMaxBottom>(element, {
                borderIndexMaxBottom: current.get(getMostBottomOffsetElementsY(element))!,
                borderIndexMaxPreviousBottom: sums.get(element.offsetElementsY)!,
                embeddedBorderIndexMaxBottom: calculateEmbeddedBorders(element, current)
            });
            element.elements.forEach(nestedElement =>
                addBorderIndexMaxBottom(nestedElement, current, sums));
            return;
        }
        case "column": {
            Object.assign<Column<unknown>, BorderIndexMaxBottom & BorderIndexMaxPreviousBottom & EmbeddedBorderIndexMaxBottom>(element, {
                borderIndexMaxBottom: current.get(getMostBottomOffsetElementsY(element))!,
                borderIndexMaxPreviousBottom: sums.get(element.offsetElementsY)!,
                embeddedBorderIndexMaxBottom: calculateEmbeddedBorders(element, current)
            });
            element.elements.forEach(nestedElement =>
                addBorderIndexMaxBottom(nestedElement, current, sums));
            return;
        }
        default: {
            assertNever(element);
        }
    }
}