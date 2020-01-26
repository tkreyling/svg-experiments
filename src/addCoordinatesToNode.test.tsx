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
    addCoordinatesToNode,
    width,
    Node,
    Layer,
    LayerPosition
} from "./App";

test('no element results in no layouted elements', () => {
    let layer: Layer<Node & LayerPosition, unknown> = {kind: 'layer', elements: []};
    expect(addCoordinatesToNode(layer, [], width(layer), 0))
        .toStrictEqual({kind: 'layer', elements: []})
});

test('one element is layouted to the origin', () => {
    let elements: Layer<Node & LayerPosition, unknown> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group', elements: [
                {kind: "node", name: "node 1", key: "0_0", index: 0, layerIndex: 0, relativePosition: 0}
            ]
        }]
    };
    expect(addCoordinatesToNode(elements, [], width(elements), 0))
        .toStrictEqual({
            kind: 'layer', elements: [{
                name: "group 1", kind: 'group', elements: [
                    {
                        kind: "node",
                        name: "node 1",
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
    let elements: Layer<Node & LayerPosition, unknown> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group', elements: [
                {kind: "node", name: "node 1", key: "0_0", index: 0, layerIndex: 1, relativePosition: 0}
            ]
        }]
    };
    expect(addCoordinatesToNode(elements, [], width(elements), 0))
        .toStrictEqual({
            kind: 'layer', elements: [{
                name: "group 1", kind: 'group', elements: [
                    {
                        kind: "node",
                        name: "node 1",
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
    let elements: Layer<Node & LayerPosition, unknown> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group', elements: [
                {kind: "node", name: "node 1", key: "0_0", index: 0, layerIndex: 0, relativePosition: 0},
                {kind: "node", name: "node 2", key: "0_1", index: 1, layerIndex: 0, relativePosition: 1}
            ]
        }]
    };
    expect(addCoordinatesToNode(elements, [], width(elements), 0))
        .toStrictEqual({
            kind: 'layer', elements: [{
                name: "group 1", kind: 'group', elements: [
                    {
                        kind: "node",
                        name: "node 1",
                        x: MARGIN_SIDE + GROUP_MARGIN_SIDE,
                        y: MARGIN_TOP + GROUP_MARGIN_TOP,
                        key: "0_0",
                        index: 0,
                        layerIndex: 0,
                        relativePosition: 0
                    },
                    {
                        kind: "node",
                        name: "node 2",
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
    let elements: Layer<Node & LayerPosition, unknown> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group', elements: [
                {kind: "node", name: "node 1", key: "0_0", index: 0, layerIndex: 0, relativePosition: 0}
            ]
        }, {
            name: "group 2", kind: 'group', elements: [
                {kind: "node", name: "node 2", key: "0_1", index: 1, layerIndex: 0, relativePosition: 0}
            ]
        }]
    };
    expect(addCoordinatesToNode(elements, [], width(elements), 0))
        .toStrictEqual({
            kind: 'layer', elements: [{
                name: "group 1", kind: 'group', elements: [
                    {
                        kind: "node",
                        name: "node 1",
                        x: MARGIN_SIDE + GROUP_MARGIN_SIDE,
                        y: MARGIN_TOP + GROUP_MARGIN_TOP,
                        key: "0_0",
                        index: 0,
                        layerIndex: 0,
                        relativePosition: 0
                    }
                ]
            }, {
                name: "group 2", kind: 'group', elements: [
                    {
                        kind: "node",
                        name: "node 2",
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
