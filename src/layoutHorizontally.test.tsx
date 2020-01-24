import {
    ELEMENT_HEIGHT,
    ELEMENT_WIDTH,
    GROUP_MARGIN_SIDE,
    GROUP_MARGIN_TOP,
    GROUP_MARGIN_BOTTOM,
    HORIZONTAL_SPACING,
    MARGIN_SIDE,
    MARGIN_TOP,
    VERTICAL_SPACING,
    layoutHorizontally,
    width,
    Layer,
    LayerPosition
} from "./App";

test('no element results in no layouted elements', () => {
    let layer: Layer<LayerPosition, unknown> = {kind: 'columns', elements: []};
    expect(layoutHorizontally(layer, width(layer), 0))
        .toStrictEqual({kind: 'columns', elements: []})
});

test('one element is layouted to the origin', () => {
    let elements: Layer<LayerPosition, unknown> = {
        kind: 'columns', elements: [{
            name: "group 1", kind: 'columns', elements: [
                {key: "0_0", index: 0, layerIndex: 0, relativePosition: 0}
            ]
        }]
    };
    expect(layoutHorizontally(elements, width(elements), 0))
        .toStrictEqual({
            kind: 'columns', elements: [{
                name: "group 1", kind: 'columns', elements: [
                    {
                        x: MARGIN_SIDE + GROUP_MARGIN_SIDE,
                        y: MARGIN_TOP + GROUP_MARGIN_TOP,
                        key: "0_0",
                        index: 0,
                        layerIndex: 0,
                        relativePosition: 0
                    }
                ]
            }]
        })
});

test('one element in the second layer keeps space for the two borders between the layers', () => {
    let elements: Layer<LayerPosition, unknown> = {
        kind: 'columns', elements: [{
            name: "group 1", kind: 'columns', elements: [
                {key: "0_0", index: 0, layerIndex: 1, relativePosition: 0}
            ]
        }]
    };
    expect(layoutHorizontally(elements, width(elements), 0))
        .toStrictEqual({
            kind: 'columns', elements: [{
                name: "group 1", kind: 'columns', elements: [
                    {
                        x: MARGIN_SIDE + GROUP_MARGIN_SIDE,
                        y: MARGIN_TOP + GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING + GROUP_MARGIN_TOP,
                        key: "0_0",
                        index: 0,
                        layerIndex: 1,
                        relativePosition: 0
                    }
                ]
            }]
        })
});

test('two elements are layouted right beside each other', () => {
    let elements: Layer<LayerPosition, unknown> = {
        kind: 'columns', elements: [{
            name: "group 1", kind: 'columns', elements: [
                {key: "0_0", index: 0, layerIndex: 0, relativePosition: 0},
                {key: "0_1", index: 1, layerIndex: 0, relativePosition: 1}
            ]
        }]
    };
    expect(layoutHorizontally(elements, width(elements), 0))
        .toStrictEqual({
            kind: 'columns', elements: [{
                name: "group 1", kind: 'columns', elements: [
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
            }]
        })
});

test('two elements in two groups have an additional spacing for the two group borders', () => {
    let elements: Layer<LayerPosition, unknown> = {
        kind: 'columns', elements: [{
            name: "group 1", kind: 'columns', elements: [
                {key: "0_0", index: 0, layerIndex: 0, relativePosition: 0}
            ]
        }, {
            name: "group 2", kind: 'columns', elements: [
                {key: "0_1", index: 1, layerIndex: 0, relativePosition: 0}
            ]
        }]
    };
    expect(layoutHorizontally(elements, width(elements), 0))
        .toStrictEqual({
            kind: 'columns', elements: [{
                name: "group 1", kind: 'columns', elements: [
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
                name: "group 2", kind: 'columns', elements: [
                    {
                        x: MARGIN_SIDE + GROUP_MARGIN_SIDE + ELEMENT_WIDTH + HORIZONTAL_SPACING + 2 * GROUP_MARGIN_SIDE,
                        y: MARGIN_TOP + GROUP_MARGIN_TOP,
                        key: "0_1",
                        index: 1,
                        layerIndex: 0,
                        relativePosition: 0
                    }
                ]
            }]
        })
});
