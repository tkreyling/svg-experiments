import {Column, Element, Node, Row} from "./newGraphModel";
import {assertNever} from "./assertNever";
import {BorderIndexTop} from "./BorderIndexTop";
import {OffsetElementsY} from "./OffsetElementsY";
import {sumOfPreviousRows} from "./sumOfPreviousRows";
import {getMostBottomOffsetElementsY} from "./getMostBottomOffsetElementsY";

export type BorderIndexMaxTop = { borderIndexMaxTop: number };
export type BorderIndexMaxPreviousTop = { borderIndexMaxPreviousTop: number };
export type EmbeddedBorderIndexMaxTop = { embeddedBorderIndexMaxTop: number };

export function addBorderIndexMaxTopG<N extends OffsetElementsY & BorderIndexTop>(
    element: Element<N>
): Element<N & BorderIndexMaxTop & BorderIndexMaxPreviousTop & EmbeddedBorderIndexMaxTop> {
    let max = determineBorderIndexMaxTop(element);
    let sums = sumOfPreviousRows(max);
    addBorderIndexMaxTop(element, max, sums);
    return element as Element<N & BorderIndexMaxTop & BorderIndexMaxPreviousTop & EmbeddedBorderIndexMaxTop>;
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
                Array.from(addition.entries()).forEach((entry) => {
                    let maxBorderIndexTop = Math.max(accumulator.get(entry[0]) || 0, entry[1]);
                    accumulator.set(entry[0], maxBorderIndexTop);
                });
                return accumulator;
            }, map);
        }
        default: {
            assertNever(element);
        }
    }
}

function calculateEmbeddedBorders(element: Element<OffsetElementsY & BorderIndexTop>, current: Map<number, number>) {
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