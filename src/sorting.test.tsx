import {and, ascending} from "./App";

test('sorts ascending', () => {
    let elements = [{x: 5}, {x: 2}];

    elements.sort(ascending(e => e.x));

    expect(elements).toStrictEqual([{x: 2}, {x: 5}]);
});

test('sorts first by x then by y', () => {
    type Point = {x: number, y: number}
    let elements: Point[] = [{x: 5, y: 0}, {x: 2, y: 1}, {x: 2, y: 0}];

    elements.sort(and(ascending(e => e.x), ascending(e => e.y)));

    expect(elements).toStrictEqual([{x: 2, y: 0}, {x: 2, y: 1}, {x: 5, y: 0}]);
});

test('keeps order if sorting does not deliver order', () => {
    let elements = [{x: 2, name: "a"}, {x: 2, name: "b"}];

    elements.sort(and(ascending(e => e.x)));

    expect(elements).toStrictEqual([{x: 2, name: "a"}, {x: 2, name: "b"}]);
});