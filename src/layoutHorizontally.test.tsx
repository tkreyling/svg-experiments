import {
    ELEMENT_WIDTH,
    HORIZONTAL_SPACING,
    layoutHorizontally,
    MARGIN_SIDE,
    MARGIN_TOP,
    widthOfElements,
    Layer,
    BORDER_MARGIN_SIDE
} from "./App";

test('no element results in no layouted elements', () => {
    expect(layoutHorizontally([], widthOfElements([]), 0))
        .toStrictEqual([])
});

test('one element is layouted to the origin', () => {
    let elements: Layer<any> = [[
        {name: "element", key: "0_0", index: 0, layerIndex: 0}
    ]];
    expect(layoutHorizontally(elements, widthOfElements(elements), 0))
        .toStrictEqual([[
            {
                x: MARGIN_SIDE + BORDER_MARGIN_SIDE,
                y: MARGIN_TOP,
                name: "element",
                key: "0_0",
                index: 0,
                layerIndex: 0
            }
        ]])
});

test('two elements are layouted right beside each other', () => {
    let elements: Layer<any> = [[
        {name: "element", key: "0_0", index: 0, layerIndex: 0},
        {name: "element", key: "0_1", index: 1, layerIndex: 0}
    ]];
    expect(layoutHorizontally(elements, widthOfElements(elements), 0))
        .toStrictEqual([[
            {
                x: MARGIN_SIDE + BORDER_MARGIN_SIDE,
                y: MARGIN_TOP,
                name: "element",
                key: "0_0",
                index: 0,
                layerIndex: 0
            },
            {
                x: MARGIN_SIDE + BORDER_MARGIN_SIDE + ELEMENT_WIDTH + HORIZONTAL_SPACING,
                y: MARGIN_TOP,
                name: "element",
                key: "0_1",
                index: 1,
                layerIndex: 0
            }
        ]])
});

test('two elements in two groups have an additional spacing for the two group borders', () => {
    let elements: Layer<any> = [[
        {name: "element", key: "0_0", index: 0, layerIndex: 0}
    ], [
        {name: "element", key: "0_1", index: 1, layerIndex: 0}
    ]];
    expect(layoutHorizontally(elements, widthOfElements(elements), 0))
        .toStrictEqual([[
            {
                x: MARGIN_SIDE + BORDER_MARGIN_SIDE,
                y: MARGIN_TOP,
                name: "element",
                key: "0_0",
                index: 0,
                layerIndex: 0
            },
        ], [
            {
                x: MARGIN_SIDE + BORDER_MARGIN_SIDE + ELEMENT_WIDTH + HORIZONTAL_SPACING + 2 * BORDER_MARGIN_SIDE,
                y: MARGIN_TOP,
                name: "element",
                key: "0_1",
                index: 1,
                layerIndex: 0
            }
        ]])
});
