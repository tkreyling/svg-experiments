import {addYToNode} from "./addYToNode";
import {ELEMENT_HEIGHT, GROUP_MARGIN_BOTTOM, GROUP_MARGIN_TOP, MARGIN_TOP, VERTICAL_SPACING} from "./styling";
import {Height, Layer, LayerDimensions, Node, Stack, Y} from "./graphModel";

test('no element results in no layouted elements', () => {
    let layer: Layer<Node, unknown> = {kind: 'layer', elements: []};

    addYToNode(layer, {y: 0, nodeY: 0, groupHeight: 0, belowLayerY: 0}, [], 0);

    expect(layer).toStrictEqual({kind: 'layer', elements: []});
});

test('one element is layouted to the origin', () => {
    let elements: Layer<Node, unknown> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group', elements: [
                {kind: "node", name: "node 1"}
            ]
        }]
    };

    addYToNode(elements, {y: MARGIN_TOP, nodeY: 0, groupHeight: 0, belowLayerY: 0}, [], 0);

    let expected: Layer<Node & Y & LayerDimensions, Y & Height> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group',
            y: MARGIN_TOP,
            height: ELEMENT_HEIGHT + GROUP_MARGIN_TOP + GROUP_MARGIN_BOTTOM,
            elements: [
                {
                    kind: "node",
                    name: "node 1",
                    y: MARGIN_TOP + GROUP_MARGIN_TOP,
                    belowLayerY: MARGIN_TOP + GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING
                }
            ]
        }]
    };
    expect(elements).toStrictEqual(expected);
});

test('one element in the second layer keeps space for the two borders between the layers', () => {
    let elements: Stack<Node, unknown> = {
        kind: 'stack', elements: [{
            kind: 'layer', elements: [{
                kind: 'group', name: "group 1", elements: [
                    {kind: "node", name: "node 1"}
                ]
            }]
        }, {
            kind: 'layer', elements: [{
                kind: 'group', name: "group 2", elements: [
                    {kind: "node", name: "node 2"}
                ]
            }]
        }]
    };

    addYToNode(elements, {y: 0, nodeY: 0, groupHeight: 0, belowLayerY: 0}, [], 0);

    let expected: Stack<Node & Y & LayerDimensions, Y & Height> = {
        kind: 'stack', elements: [{
            kind: 'layer', elements: [{
                kind: 'group', name: "group 1",
                y: MARGIN_TOP,
                height: ELEMENT_HEIGHT + GROUP_MARGIN_TOP + GROUP_MARGIN_BOTTOM,
                elements: [
                    {
                        kind: "node",
                        name: "node 1",
                        y: MARGIN_TOP + GROUP_MARGIN_TOP,
                        belowLayerY: MARGIN_TOP + GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING
                    }
                ]
            }]
        }, {
            kind: 'layer', elements: [{
                kind: 'group', name: "group 2",
                y: MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING + GROUP_MARGIN_TOP,
                height: ELEMENT_HEIGHT + GROUP_MARGIN_TOP + GROUP_MARGIN_BOTTOM,
                elements: [
                    {
                        kind: "node",
                        name: "node 2",
                        y: MARGIN_TOP + GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING + GROUP_MARGIN_TOP,
                        belowLayerY: MARGIN_TOP + (GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING) * 2
                    }
                ]
            }]
        }]
    };
    expect(elements).toStrictEqual(expected);
});

test('two elements are layouted right beside each other', () => {
    let elements: Layer<Node, unknown> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group', elements: [
                {kind: "node", name: "node 1"},
                {kind: "node", name: "node 2"}
            ]
        }]
    };

    addYToNode(elements, {y: MARGIN_TOP, nodeY: 0, groupHeight: 0, belowLayerY: 0}, [], 0);

    let expected: Layer<Node & Y & LayerDimensions, Y & Height> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group',
            y: MARGIN_TOP,
            height: ELEMENT_HEIGHT + GROUP_MARGIN_TOP + GROUP_MARGIN_BOTTOM,
            elements: [
                {
                    kind: "node",
                    name: "node 1",
                    y: MARGIN_TOP + GROUP_MARGIN_TOP,
                    belowLayerY: MARGIN_TOP + GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING
                },
                {
                    kind: "node",
                    name: "node 2",
                    y: MARGIN_TOP + GROUP_MARGIN_TOP,
                    belowLayerY: MARGIN_TOP + GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING
                }
            ]
        }]
    };
    expect(elements).toStrictEqual(expected);
});

test('two elements in two groups have an additional spacing for the two group borders', () => {
    let elements: Layer<Node, unknown> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group', elements: [
                {kind: "node", name: "node 1"}
            ]
        }, {
            name: "group 2", kind: 'group', elements: [
                {kind: "node", name: "node 2"}
            ]
        }]
    };

    addYToNode(elements, {y: MARGIN_TOP, nodeY: 0, groupHeight: 0, belowLayerY: 0}, [], 0);

    let expected: Layer<Node & Y & LayerDimensions, Y & Height> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group',
            y: MARGIN_TOP,
            height: ELEMENT_HEIGHT + GROUP_MARGIN_TOP + GROUP_MARGIN_BOTTOM,
            elements: [
                {
                    kind: "node",
                    name: "node 1",
                    y: MARGIN_TOP + GROUP_MARGIN_TOP,
                    belowLayerY: MARGIN_TOP + GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING
                }
            ]
        }, {
            name: "group 2", kind: 'group',
            y: MARGIN_TOP,
            height: ELEMENT_HEIGHT + GROUP_MARGIN_TOP + GROUP_MARGIN_BOTTOM,
            elements: [
                {
                    kind: "node",
                    name: "node 2",
                    y: MARGIN_TOP + GROUP_MARGIN_TOP,
                    belowLayerY: MARGIN_TOP + GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING
                }
            ]
        }]
    };
    expect(elements).toStrictEqual(expected);
});
