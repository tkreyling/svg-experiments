import {
    addYToNode,
    ELEMENT_HEIGHT,
    GROUP_MARGIN_BOTTOM,
    GROUP_MARGIN_TOP,
    GroupPosition,
    Height,
    Layer,
    LayerDimensions,
    LayerPosition,
    MARGIN_TOP,
    Node,
    Stack,
    VERTICAL_SPACING,
    Y
} from "./App";

test('no element results in no layouted elements', () => {
    let layer: Layer<Node & LayerPosition, GroupPosition> = {kind: 'layer', elements: []};

    addYToNode(layer, {y: 0, nodeY: 0, groupHeight: 0, belowLayerY: 0}, [], 0);

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

    addYToNode(elements, {y: MARGIN_TOP, nodeY: 0, groupHeight: 0, belowLayerY: 0}, [], 0);

    let expected: Layer<Node & LayerPosition & Y & LayerDimensions, GroupPosition & Y & Height> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group',
            key: "0_0", index: 0, layerIndex: 0,
            y: MARGIN_TOP,
            height: ELEMENT_HEIGHT + GROUP_MARGIN_TOP + GROUP_MARGIN_BOTTOM,
            elements: [
                {
                    kind: "node",
                    name: "node 1",
                    y: MARGIN_TOP + GROUP_MARGIN_TOP,
                    belowLayerY: MARGIN_TOP + GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING,
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
    let elements: Stack<Node & LayerPosition, GroupPosition> = {
        kind: 'stack', elements: [{
            kind: 'layer', elements: [{
                kind: 'group', name: "group 1", key: "0_0", index: 0, layerIndex: 0, elements: [
                    {kind: "node", name: "node 1", key: "0_0", index: 0, layerIndex: 0, relativePosition: 0}
                ]
            }]
        }, {
            kind: 'layer', elements: [{
                kind: 'group', name: "group 2", key: "1_0", index: 0, layerIndex: 1, elements: [
                    {kind: "node", name: "node 2", key: "1_0", index: 0, layerIndex: 1, relativePosition: 0}
                ]
            }]
        }]
    };

    addYToNode(elements, {y: 0, nodeY: 0, groupHeight: 0, belowLayerY: 0}, [], 0);

    let expected: Stack<Node & LayerPosition & Y & LayerDimensions, GroupPosition & Y & Height> = {
        kind: 'stack', elements: [{
            kind: 'layer', elements: [{
                kind: 'group', name: "group 1",
                key: "0_0", index: 0, layerIndex: 0,
                y: MARGIN_TOP,
                height: ELEMENT_HEIGHT + GROUP_MARGIN_TOP + GROUP_MARGIN_BOTTOM,
                elements: [
                    {
                        kind: "node",
                        name: "node 1",
                        y: MARGIN_TOP + GROUP_MARGIN_TOP,
                        belowLayerY: MARGIN_TOP + GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING,
                        key: "0_0",
                        index: 0,
                        layerIndex: 0,
                        relativePosition: 0
                    }
                ]
            }]
        }, {
            kind: 'layer', elements: [{
                kind: 'group', name: "group 2",
                key: "1_0", index: 0, layerIndex: 1,
                y: MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING + GROUP_MARGIN_TOP,
                height: ELEMENT_HEIGHT + GROUP_MARGIN_TOP + GROUP_MARGIN_BOTTOM,
                elements: [
                    {
                        kind: "node",
                        name: "node 2",
                        y: MARGIN_TOP + GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING + GROUP_MARGIN_TOP,
                        belowLayerY: MARGIN_TOP + (GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING) * 2,
                        key: "1_0",
                        index: 0,
                        layerIndex: 1,
                        relativePosition: 0
                    }
                ]
            }]
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

    addYToNode(elements, {y: MARGIN_TOP, nodeY: 0, groupHeight: 0, belowLayerY: 0}, [], 0);

    let expected: Layer<Node & LayerPosition & Y & LayerDimensions, GroupPosition & Y & Height> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group',
            key: "0_0", index: 0, layerIndex: 0,
            y: MARGIN_TOP,
            height: ELEMENT_HEIGHT + GROUP_MARGIN_TOP + GROUP_MARGIN_BOTTOM,
            elements: [
                {
                    kind: "node",
                    name: "node 1",
                    y: MARGIN_TOP + GROUP_MARGIN_TOP,
                    belowLayerY: MARGIN_TOP + GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING,
                    key: "0_0",
                    index: 0,
                    layerIndex: 0,
                    relativePosition: 0
                },
                {
                    kind: "node",
                    name: "node 2",
                    y: MARGIN_TOP + GROUP_MARGIN_TOP,
                    belowLayerY: MARGIN_TOP + GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING,
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

    addYToNode(elements, {y: MARGIN_TOP, nodeY: 0, groupHeight: 0, belowLayerY: 0}, [], 0);

    let expected: Layer<Node & LayerPosition & Y & LayerDimensions, GroupPosition & Y & Height> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group',
            key: "0_0", index: 0, layerIndex: 0,
            y: MARGIN_TOP,
            height: ELEMENT_HEIGHT + GROUP_MARGIN_TOP + GROUP_MARGIN_BOTTOM,
            elements: [
                {
                    kind: "node",
                    name: "node 1",
                    y: MARGIN_TOP + GROUP_MARGIN_TOP,
                    belowLayerY: MARGIN_TOP + GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING,
                    key: "0_0",
                    index: 0,
                    layerIndex: 0,
                    relativePosition: 0
                }
            ]
        }, {
            name: "group 2", kind: 'group',
            key: "0_1", index: 1, layerIndex: 0,
            y: MARGIN_TOP,
            height: ELEMENT_HEIGHT + GROUP_MARGIN_TOP + GROUP_MARGIN_BOTTOM,
            elements: [
                {
                    kind: "node",
                    name: "node 2",
                    y: MARGIN_TOP + GROUP_MARGIN_TOP,
                    belowLayerY: MARGIN_TOP + GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING,
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
