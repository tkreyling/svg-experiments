import {Column, Element, Node, Row} from "./newGraphModel";
import {assertNever} from "./assertNever";
import {BorderIndexTop} from "./BorderIndexTop";
import {OffsetElementsY} from "./OffsetElementsY";

export type BorderIndexMaxTop = { borderIndexMaxTop: number };

export function addBorderIndexMaxTopG<N extends OffsetElementsY & BorderIndexTop>(
    element: Element<N>
): Element<N & BorderIndexMaxTop> {
    let max = determineBorderIndexMaxTop(element);
    addBorderIndexMaxTop(element, max);
    return element as Element<N & BorderIndexMaxTop>;
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

function addBorderIndexMaxTop(element: Element<OffsetElementsY & BorderIndexTop>, borderIndexMaxTop: Map<number, number>) {
    switch (element.kind) {
        case "node": {
            Object.assign<Node, BorderIndexMaxTop>(element, {
                borderIndexMaxTop: borderIndexMaxTop.get(element.offsetElementsY)!
            });
            return;
        }
        case "row": {
            Object.assign<Row<unknown>, BorderIndexMaxTop>(element, {
                borderIndexMaxTop: borderIndexMaxTop.get(element.offsetElementsY)!
            });
            element.elements.forEach(nestedElement =>
                addBorderIndexMaxTop(nestedElement, borderIndexMaxTop));
            return;
        }
        case "column": {
            Object.assign<Column<unknown>, BorderIndexMaxTop>(element, {
                borderIndexMaxTop: borderIndexMaxTop.get(element.offsetElementsY)!
            });
            element.elements.forEach(nestedElement =>
                addBorderIndexMaxTop(nestedElement, borderIndexMaxTop));
            return;
        }
        default: {
            assertNever(element);
        }
    }
}