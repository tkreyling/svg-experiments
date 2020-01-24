import {
    ELEMENT_WIDTH,
    HORIZONTAL_SPACING,
    layoutHorizontally,
    MARGIN_SIDE,
    MARGIN_TOP,
    widthOfElements,
    Layer,
    GROUP_MARGIN_SIDE, GROUP_MARGIN_TOP, ELEMENT_HEIGHT, VERTICAL_SPACING, GROUP_MARGIN_BOTTOM, LayerPosition
} from "./App";

test('no element results in no layouted elements', () => {
    let layer: Layer<LayerPosition, unknown> = {orientation: 'columns', elements: []};
    expect(layoutHorizontally(layer, widthOfElements(layer), 0))
        .toStrictEqual({orientation: 'columns', elements: []})
});

test('one element is layouted to the origin', () => {
    let elements: Layer<LayerPosition, unknown> = {orientation: 'columns', elements: [{
        name: "group 1", elements: [
            {key: "0_0", index: 0, layerIndex: 0, relativePosition: 0}
        ]
    }]};
    expect(layoutHorizontally(elements, widthOfElements(elements), 0))
        .toStrictEqual({orientation: 'columns', elements: [{
            name: "group 1", elements: [
                {
                    x: MARGIN_SIDE + GROUP_MARGIN_SIDE,
                    y: MARGIN_TOP + GROUP_MARGIN_TOP,
                    key: "0_0",
                    index: 0,
                    layerIndex: 0,
                    relativePosition: 0
                }
            ]
        }]})
});

test('one element in the second layer keeps space for the two borders between the layers', () => {
    let elements: Layer<LayerPosition, unknown> = {orientation: 'columns', elements: [{
        name: "group 1", elements: [
            {key: "0_0", index: 0, layerIndex: 1, relativePosition: 0}
        ]
    }]};
    expect(layoutHorizontally(elements, widthOfElements(elements), 0))
        .toStrictEqual({orientation: 'columns', elements: [{
            name: "group 1", elements: [
                {
                    x: MARGIN_SIDE + GROUP_MARGIN_SIDE,
                    y: MARGIN_TOP + GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING + GROUP_MARGIN_TOP,
                    key: "0_0",
                    index: 0,
                    layerIndex: 1,
                    relativePosition: 0
                }
            ]
        }]})
});

test('two elements are layouted right beside each other', () => {
    let elements: Layer<LayerPosition, unknown> = {orientation: 'columns', elements: [{
        name: "group 1", elements: [
            {key: "0_0", index: 0, layerIndex: 0, relativePosition: 0},
            {key: "0_1", index: 1, layerIndex: 0, relativePosition: 1}
        ]
    }]};
    expect(layoutHorizontally(elements, widthOfElements(elements), 0))
        .toStrictEqual({orientation: 'columns', elements: [{
            name: "group 1", elements: [
                {
                    x: MARGIN_SIDE + GROUP_MARGIN_SIDE,
                    y: MARGIN_TOP + GROUP_MARGIN_TOP,
                    key: "0_0",
                    index: 0,
                    layerIndex: 0,
                    relativePosition: 0
                },
                {
                    x: MARGIN_SIDE + GROUP_MARGIN_SIDE + ELEMENT_WIDTH + HORIZONTAL_SPACING,
                    y: MARGIN_TOP + GROUP_MARGIN_TOP,
                    key: "0_1",
                    index: 1,
                    layerIndex: 0,
                    relativePosition: 1
                }
            ]
        }]})
});

test('two elements in two groups have an additional spacing for the two group borders', () => {
    let elements: Layer<LayerPosition, unknown> = {orientation: 'columns', elements: [{
        name: "group 1", elements: [
            {key: "0_0", index: 0, layerIndex: 0, relativePosition: 0}
        ]
    }, {
        name: "group 2", elements: [
            {key: "0_1", index: 1, layerIndex: 0, relativePosition: 0}
        ]
    }]};
    expect(layoutHorizontally(elements, widthOfElements(elements), 0))
        .toStrictEqual({orientation: 'columns', elements: [{
            name: "group 1", elements: [
                {
                    x: MARGIN_SIDE + GROUP_MARGIN_SIDE,
                    y: MARGIN_TOP + GROUP_MARGIN_TOP,
                    key: "0_0",
                    index: 0,
                    layerIndex: 0,
                    relativePosition: 0
                }
            ]
        }, {
            name: "group 2", elements: [
                {
                    x: MARGIN_SIDE + GROUP_MARGIN_SIDE + ELEMENT_WIDTH + HORIZONTAL_SPACING + 2 * GROUP_MARGIN_SIDE,
                    y: MARGIN_TOP + GROUP_MARGIN_TOP,
                    key: "0_1",
                    index: 1,
                    layerIndex: 0,
                    relativePosition: 0
                }
            ]
        }]})
});
