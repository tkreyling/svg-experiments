import {Column, Element, Node, Row} from "./newGraphModel";
import {assertNever} from "./assertNever";
import {BorderIndexBottom} from "./BorderIndexBottom";
import {OffsetElementsY} from "./OffsetElementsY";

export type BorderIndexMaxBottom = { borderIndexMaxBottom: number };

export function addBorderIndexMaxBottomG<N extends OffsetElementsY & BorderIndexBottom>(
    element: Element<N>
): Element<N & BorderIndexMaxBottom> {
    let max = determineBorderIndexMaxBottom(element);
    addBorderIndexMaxBottom(element, max);
    return element as Element<N & BorderIndexMaxBottom>;
}

function getMostBottomOffsetElementsY(element: Element<OffsetElementsY>): number {
    switch (element.kind) {
        case "node":
            return element.offsetElementsY;
        case "row":
        case "column":
            return Math.max(...element.elements.map(getMostBottomOffsetElementsY), element.offsetElementsY);
    }
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

function addBorderIndexMaxBottom(element: Element<OffsetElementsY & BorderIndexBottom>, borderIndexMaxBottom: Map<number, number>) {
    switch (element.kind) {
        case "node": {
            Object.assign<Node, BorderIndexMaxBottom>(element, {
                borderIndexMaxBottom: borderIndexMaxBottom.get(element.offsetElementsY)!
            });
            return;
        }
        case "row": {
            Object.assign<Row<unknown>, BorderIndexMaxBottom>(element, {
                borderIndexMaxBottom: borderIndexMaxBottom.get(getMostBottomOffsetElementsY(element))!
            });
            element.elements.forEach(nestedElement =>
                addBorderIndexMaxBottom(nestedElement, borderIndexMaxBottom));
            return;
        }
        case "column": {
            Object.assign<Column<unknown>, BorderIndexMaxBottom>(element, {
                borderIndexMaxBottom: borderIndexMaxBottom.get(getMostBottomOffsetElementsY(element))!
            });
            element.elements.forEach(nestedElement =>
                addBorderIndexMaxBottom(nestedElement, borderIndexMaxBottom));
            return;
        }
        default: {
            assertNever(element);
        }
    }
}