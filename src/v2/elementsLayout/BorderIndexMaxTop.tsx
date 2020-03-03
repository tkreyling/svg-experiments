import {Column, Element, Graph, Node, Row, transformElementsUsingGraph} from "../newGraphModel";
import {assertNever} from "../assertNever";
import {BorderIndexTop} from "./BorderIndexTop";
import {OffsetElementsY} from "./OffsetElementsY";
import {sumOfPreviousRows} from "../sumOfPreviousRows";
import {getMostBottomOffsetElementsY} from "../getMostBottomOffsetElementsY";

export type BorderIndexMaxTop = { borderIndexMaxTop: number };
export type BorderIndexMaxPreviousTop = { borderIndexMaxPreviousTop: number };
export type EmbeddedBorderIndexMaxTop = { embeddedBorderIndexMaxTop: number };

export function addBorderIndexMaxTopG<N extends OffsetElementsY & BorderIndexTop, E>(
    graph: Graph<N, E>
): Graph<N & BorderIndexMaxTop & BorderIndexMaxPreviousTop & EmbeddedBorderIndexMaxTop, E> {
    return transformElementsUsingGraph<N, BorderIndexMaxTop & BorderIndexMaxPreviousTop & EmbeddedBorderIndexMaxTop, E>(
        graph, determineAndAddBorderIndexTopAggregates
    );
}

function determineAndAddBorderIndexTopAggregates(graph: Graph<OffsetElementsY & BorderIndexTop, unknown>) {
    let max = determineBorderIndexMaxTop(graph.element);
    let sums = sumOfPreviousRows(max);
    addBorderIndexMaxTop(graph.element, max, sums);
    graph.syntheticNodes.forEach(node => addBorderIndexMaxTop(node, max, sums));
}

function determineBorderIndexMaxTop(element: Element<OffsetElementsY & BorderIndexTop>): Map<number, number> {
    switch (element.kind) {
        case "node": {
            let map = new Map<number, number>();
            map.set(element.offsetElementsY, element.borderIndexTop);
            return map;
        }
        case "row":
        case "column": {
            let map = new Map<number, number>();
            map.set(element.offsetElementsY, element.borderIndexTop);
            return element.elements.map(determineBorderIndexMaxTop).reduce((accumulator, addition) => {
                Array.from(addition.entries()).forEach(([offsetElementsY, borderIndexTop]) => {
                    let max = Math.max(accumulator.get(offsetElementsY) || 0, borderIndexTop);
                    accumulator.set(offsetElementsY, max);
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
    let from = element.offsetElementsY + 1;
    let to = getMostBottomOffsetElementsY(element);
    let embeddedBorders = 0;
    for (let i = from; i <= to; i++) {
        embeddedBorders += current.get(i) || 0;
    }
    return embeddedBorders;
}

function addBorderIndexMaxTop(
    element: Element<OffsetElementsY & BorderIndexTop>,
    current: Map<number, number>,
    sums: Map<number, number>
) {
    switch (element.kind) {
        case "node": {
            Object.assign<Node, BorderIndexMaxTop & BorderIndexMaxPreviousTop & EmbeddedBorderIndexMaxTop>(element, {
                borderIndexMaxTop: current.get(element.offsetElementsY)!,
                borderIndexMaxPreviousTop: sums.get(element.offsetElementsY)!,
                embeddedBorderIndexMaxTop: 0
            });
            return;
        }
        case "row": {
            Object.assign<Row<unknown>, BorderIndexMaxTop & BorderIndexMaxPreviousTop & EmbeddedBorderIndexMaxTop>(element, {
                borderIndexMaxTop: current.get(element.offsetElementsY)!,
                borderIndexMaxPreviousTop: sums.get(element.offsetElementsY)!,
                embeddedBorderIndexMaxTop: calculateEmbeddedBorders(element, current)
            });
            element.elements.forEach(nestedElement =>
                addBorderIndexMaxTop(nestedElement, current, sums));
            return;
        }
        case "column": {
            Object.assign<Column<unknown>, BorderIndexMaxTop & BorderIndexMaxPreviousTop & EmbeddedBorderIndexMaxTop>(element, {
                borderIndexMaxTop: current.get(element.offsetElementsY)!,
                borderIndexMaxPreviousTop: sums.get(element.offsetElementsY)!,
                embeddedBorderIndexMaxTop: calculateEmbeddedBorders(element, current)
            });
            element.elements.forEach(nestedElement =>
                addBorderIndexMaxTop(nestedElement, current, sums));
            return;
        }
        default: {
            assertNever(element);
        }
    }
}