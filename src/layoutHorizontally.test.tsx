import {
    ELEMENT_WIDTH,
    HORIZONTAL_SPACING,
    layoutHorizontally,
    MARGIN_SIDE,
    MARGIN_TOP,
    widthOfElements,
    Layer,
    GROUP_MARGIN_SIDE, GROUP_MARGIN_TOP, ELEMENT_HEIGHT, VERTICAL_SPACING, GROUP_MARGIN_BOTTOM
} from "./App";

test('no element results in no layouted elements', () => {
    let layer = {elements: []};
    expect(layoutHorizontally(layer, widthOfElements(layer), 0))
        .toStrictEqual({elements: []})
});

test('one element is layouted to the origin', () => {
    let elements: Layer<any, unknown> = {elements: [{
        name: "group 1", nodes: [
            {name: "element", key: "0_0", index: 0, layerIndex: 0}
        ]
    }]};
    expect(layoutHorizontally(elements, widthOfElements(elements), 0))
        .toStrictEqual({elements: [{
            name: "group 1", nodes: [
                {
                    x: MARGIN_SIDE + GROUP_MARGIN_SIDE,
                    y: MARGIN_TOP + GROUP_MARGIN_TOP,
                    name: "element",
                    key: "0_0",
                    index: 0,
                    layerIndex: 0
                }
            ]
        }]})
});

test('one element in the second layer keeps space for the two borders between the layers', () => {
    let elements: Layer<any, unknown> = {elements: [{
        name: "group 1", nodes: [
            {name: "element", key: "0_0", index: 0, layerIndex: 1}
        ]
    }]};
    expect(layoutHorizontally(elements, widthOfElements(elements), 0))
        .toStrictEqual({elements: [{
            name: "group 1", nodes: [
                {
                    x: MARGIN_SIDE + GROUP_MARGIN_SIDE,
                    y: MARGIN_TOP + GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING + GROUP_MARGIN_TOP,
                    name: "element",
                    key: "0_0",
                    index: 0,
                    layerIndex: 1
                }
            ]
        }]})
});

test('two elements are layouted right beside each other', () => {
    let elements: Layer<any, unknown> = {elements: [{
        name: "group 1", nodes: [
            {name: "element", key: "0_0", index: 0, layerIndex: 0},
            {name: "element", key: "0_1", index: 1, layerIndex: 0}
        ]
    }]};
    expect(layoutHorizontally(elements, widthOfElements(elements), 0))
        .toStrictEqual({elements: [{
            name: "group 1", nodes: [
                {
                    x: MARGIN_SIDE + GROUP_MARGIN_SIDE,
                    y: MARGIN_TOP + GROUP_MARGIN_TOP,
                    name: "element",
                    key: "0_0",
                    index: 0,
                    layerIndex: 0
                },
                {
                    x: MARGIN_SIDE + GROUP_MARGIN_SIDE + ELEMENT_WIDTH + HORIZONTAL_SPACING,
                    y: MARGIN_TOP + GROUP_MARGIN_TOP,
                    name: "element",
                    key: "0_1",
                    index: 1,
                    layerIndex: 0
                }
            ]
        }]})
});

test('two elements in two groups have an additional spacing for the two group borders', () => {
    let elements: Layer<any, unknown> = {elements: [{
        name: "group 1", nodes: [
            {name: "element", key: "0_0", index: 0, layerIndex: 0}
        ]
    }, {
        name: "group 2", nodes: [
            {name: "element", key: "0_1", index: 1, layerIndex: 0}
        ]
    }]};
    expect(layoutHorizontally(elements, widthOfElements(elements), 0))
        .toStrictEqual({elements: [{
            name: "group 1", nodes: [
                {
                    x: MARGIN_SIDE + GROUP_MARGIN_SIDE,
                    y: MARGIN_TOP + GROUP_MARGIN_TOP,
                    name: "element",
                    key: "0_0",
                    index: 0,
                    layerIndex: 0
                }
            ]
        }, {
            name: "group 2", nodes: [
                {
                    x: MARGIN_SIDE + GROUP_MARGIN_SIDE + ELEMENT_WIDTH + HORIZONTAL_SPACING + 2 * GROUP_MARGIN_SIDE,
                    y: MARGIN_TOP + GROUP_MARGIN_TOP,
                    name: "element",
                    key: "0_1",
                    index: 1,
                    layerIndex: 0
                }
            ]
        }]})
});
