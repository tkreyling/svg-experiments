import {
    addCoordinatesToNode,
    Coordinates,
    ELEMENT_HEIGHT,
    ELEMENT_WIDTH,
    GROUP_MARGIN_BOTTOM,
    GROUP_MARGIN_SIDE,
    GROUP_MARGIN_TOP,
    GroupPosition,
    HORIZONTAL_SPACING,
    Layer,
    LayerPosition,
    MARGIN_SIDE,
    MARGIN_TOP,
    Node,
    VERTICAL_SPACING,
    width
} from "./App";

test('no element results in no layouted elements', () => {
    let layer: Layer<Node & LayerPosition, GroupPosition> = {kind: 'layer', elements: []};

    addCoordinatesToNode(layer, {x: 0, y: 0}, [], width(layer), 0);

    expect(layer).toStrictEqual({kind: 'layer', elements: []});
});

test('one element is layouted to the origin', () => {
    let elements: Layer<Node & LayerPosition, GroupPosition> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group', key: "0_0", index: 0, layerIndex: 0, elements: [
                {kind: "node", name: "node 1", key: "0_0", index: 0, layerIndex: 0, relativePosition: 0}
            ]
        }]
    };

    addCoordinatesToNode(elements, {x: 0, y: 0}, [], width(elements), 0);

    let expected: Layer<Node & LayerPosition & Coordinates, GroupPosition & Coordinates> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group',
            key: "0_0", index: 0, layerIndex: 0,
            x: MARGIN_SIDE,
            y: MARGIN_TOP,
            elements: [
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
    };
    expect(elements).toStrictEqual(expected);
});

test('one element in the second layer keeps space for the two borders between the layers', () => {
    let elements: Layer<Node & LayerPosition, GroupPosition> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group', key: "0_0", index: 0, layerIndex: 0, elements: [
                {kind: "node", name: "node 1", key: "0_0", index: 0, layerIndex: 1, relativePosition: 0}
            ]
        }]
    };

    addCoordinatesToNode(elements, {x: 0, y: 0}, [], width(elements), 0);

    let expected: Layer<Node & LayerPosition & Coordinates, GroupPosition & Coordinates> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group',
            key: "0_0", index: 0, layerIndex: 0,
            x: MARGIN_SIDE,
            y: MARGIN_TOP,
            elements: [
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
    };
    expect(elements).toStrictEqual(expected);
});

test('two elements are layouted right beside each other', () => {
    let elements: Layer<Node & LayerPosition, GroupPosition> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group', key: "0_0", index: 0, layerIndex: 0, elements: [
                {kind: "node", name: "node 1", key: "0_0", index: 0, layerIndex: 0, relativePosition: 0},
                {kind: "node", name: "node 2", key: "0_1", index: 1, layerIndex: 0, relativePosition: 1}
            ]
        }]
    };

    addCoordinatesToNode(elements, {x: 0, y: 0}, [], width(elements), 0);

    let expected: Layer<Node & LayerPosition & Coordinates, GroupPosition & Coordinates> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group',
            key: "0_0", index: 0, layerIndex: 0,
            x: MARGIN_SIDE,
            y: MARGIN_TOP,
            elements: [
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
    };
    expect(elements).toStrictEqual(expected);
});

test('width of node is adjusted by size property', () => {
    let elements: Layer<Node & LayerPosition, GroupPosition> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group', key: "0_0", index: 0, layerIndex: 0, elements: [
                {kind: "node", name: "node 1", key: "0_0", index: 0, layerIndex: 0, relativePosition: 0, size: 1.2},
                {kind: "node", name: "node 2", key: "0_1", index: 1, layerIndex: 0, relativePosition: 1}
            ]
        }]
    };

    addCoordinatesToNode(elements, {x: 0, y: 0}, [], width(elements), 0);

    let expected: Layer<Node & LayerPosition & Coordinates, GroupPosition & Coordinates> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group',
            key: "0_0", index: 0, layerIndex: 0,
            x: MARGIN_SIDE,
            y: MARGIN_TOP,
            elements: [
                {
                    kind: "node",
                    name: "node 1",
                    x: MARGIN_SIDE + GROUP_MARGIN_SIDE,
                    y: MARGIN_TOP + GROUP_MARGIN_TOP,
                    key: "0_0",
                    index: 0,
                    layerIndex: 0,
                    relativePosition: 0,
                    size: 1.2
                },
                {
                    kind: "node",
                    name: "node 2",
                    x: MARGIN_SIDE + GROUP_MARGIN_SIDE + ELEMENT_WIDTH * 1.2 + HORIZONTAL_SPACING,
                    y: MARGIN_TOP + GROUP_MARGIN_TOP,
                    key: "0_1",
                    index: 1,
                    layerIndex: 0,
                    relativePosition: 1
                }
            ]
        }]
    };
    expect(elements).toStrictEqual(expected);
});

test('two elements in two groups have an additional spacing for the two group borders', () => {
    let elements: Layer<Node & LayerPosition, GroupPosition> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group', key: "0_0", index: 0, layerIndex: 0, elements: [
                {kind: "node", name: "node 1", key: "0_0", index: 0, layerIndex: 0, relativePosition: 0}
            ]
        }, {
            name: "group 2", kind: 'group', key: "0_1", index: 1, layerIndex: 0, elements: [
                {kind: "node", name: "node 2", key: "0_1", index: 1, layerIndex: 0, relativePosition: 0}
            ]
        }]
    };

    addCoordinatesToNode(elements, {x: 0, y: 0}, [], width(elements), 0);

    let expected: Layer<Node & LayerPosition & Coordinates, GroupPosition & Coordinates> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group',
            key: "0_0", index: 0, layerIndex: 0,
            x: MARGIN_SIDE,
            y: MARGIN_TOP,
            elements: [
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
            name: "group 2", kind: 'group',
            key: "0_1", index: 1, layerIndex: 0,
            x: MARGIN_SIDE + ELEMENT_WIDTH + HORIZONTAL_SPACING + 2 * GROUP_MARGIN_SIDE,
            y: MARGIN_TOP,
            elements: [
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
    };
    expect(elements).toStrictEqual(expected);
});
