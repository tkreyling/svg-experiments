import {Column, Element, Node, Row} from "./newGraphModel";
import {assertNever} from "./assertNever";
import {BorderIndexTop} from "./BorderIndexTop";
import {OffsetElementsY} from "./OffsetElementsY";
import {sumOfPreviousRows} from "./sumOfPreviousRows";

export type BorderIndexMaxTop = { borderIndexMaxTop: number };
export type BorderIndexMaxPreviousTop = { borderIndexMaxPreviousTop: number };

export function addBorderIndexMaxTopG<N extends OffsetElementsY & BorderIndexTop>(
    element: Element<N>
): Element<N & BorderIndexMaxTop & BorderIndexMaxPreviousTop> {
    let max = determineBorderIndexMaxTop(element);
    let sums = sumOfPreviousRows(max);
    addBorderIndexMaxTop(element, max, sums);
    return element as Element<N & BorderIndexMaxTop & BorderIndexMaxPreviousTop>;
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

function addBorderIndexMaxTop(element: Element<OffsetElementsY & BorderIndexTop>, current: Map<number, number>, sums: Map<number, number>) {
    switch (element.kind) {
        case "node": {
            Object.assign<Node, BorderIndexMaxTop & BorderIndexMaxPreviousTop>(element, {
                borderIndexMaxTop: current.get(element.offsetElementsY)!,
                borderIndexMaxPreviousTop: sums.get(element.offsetElementsY)!
            });
            return;
        }
        case "row": {
            Object.assign<Row<unknown>, BorderIndexMaxTop & BorderIndexMaxPreviousTop>(element, {
                borderIndexMaxTop: current.get(element.offsetElementsY)!,
                borderIndexMaxPreviousTop: sums.get(element.offsetElementsY)!
            });
            element.elements.forEach(nestedElement =>
                addBorderIndexMaxTop(nestedElement, current, sums));
            return;
        }
        case "column": {
            Object.assign<Column<unknown>, BorderIndexMaxTop & BorderIndexMaxPreviousTop>(element, {
                borderIndexMaxTop: current.get(element.offsetElementsY)!,
                borderIndexMaxPreviousTop: sums.get(element.offsetElementsY)!
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