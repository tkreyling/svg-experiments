import {
    ELEMENT_WIDTH,
    GROUP_MARGIN_SIDE,
    GroupPosition,
    HORIZONTAL_SPACING,
    Layer,
    LayerPosition,
    MARGIN_SIDE,
    Node,
    Stack,
    width,
    X
} from "./App";
import {addXToNode} from "./addXToNode";

test('no element results in no layouted elements', () => {
    let layer: Layer<Node & LayerPosition, GroupPosition> = {kind: 'layer', elements: []};

    addXToNode(layer, {x: 0}, width(layer));

    expect(layer).toStrictEqual({kind: 'layer', elements: []});
});

test('one element is layouted to the origin', () => {
    let elements: Layer<Node & LayerPosition, GroupPosition> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group', key: "0_0", index: 0, layerIndex: 0, elements: [
                {kind: "node", name: "node 1", key: "0_0", index: 0, layerIndex: 0}
            ]
        }]
    };

    addXToNode(elements, {x: 0}, width(elements));

    let expected: Layer<Node & LayerPosition & X, GroupPosition & X> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group',
            key: "0_0", index: 0, layerIndex: 0,
            x: MARGIN_SIDE,
            elements: [
                {
                    kind: "node",
                    name: "node 1",
                    x: MARGIN_SIDE + GROUP_MARGIN_SIDE,
                    key: "0_0",
                    index: 0,
                    layerIndex: 0
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
                    {kind: "node", name: "node 1", key: "0_0", index: 0, layerIndex: 0}
                ]
            }]
        }, {
            kind: 'layer', elements: [{
                kind: 'group', name: "group 2", key: "1_0", index: 0, layerIndex: 1, elements: [
                    {kind: "node", name: "node 2", key: "1_0", index: 0, layerIndex: 1}
                ]
            }]
        }]
    };

    addXToNode(elements, {x: 0}, width(elements));

    let expected: Stack<Node & LayerPosition & X, GroupPosition & X> = {
        kind: 'stack', elements: [{
            kind: 'layer', elements: [{
                kind: 'group', name: "group 1",
                key: "0_0", index: 0, layerIndex: 0,
                x: MARGIN_SIDE,
                elements: [
                    {
                        kind: "node",
                        name: "node 1",
                        x: MARGIN_SIDE + GROUP_MARGIN_SIDE,
                        key: "0_0",
                        index: 0,
                        layerIndex: 0
                    }
                ]
            }]
        }, {
            kind: 'layer', elements: [{
                kind: 'group', name: "group 2",
                key: "1_0", index: 0, layerIndex: 1,
                x: MARGIN_SIDE,
                elements: [
                    {
                        kind: "node",
                        name: "node 2",
                        x: MARGIN_SIDE + GROUP_MARGIN_SIDE,
                        key: "1_0",
                        index: 0,
                        layerIndex: 1
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
                {kind: "node", name: "node 1", key: "0_0", index: 0, layerIndex: 0},
                {kind: "node", name: "node 2", key: "0_1", index: 1, layerIndex: 0}
            ]
        }]
    };

    addXToNode(elements, {x: 0}, width(elements));

    let expected: Layer<Node & LayerPosition & X, GroupPosition & X> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group',
            key: "0_0", index: 0, layerIndex: 0,
            x: MARGIN_SIDE,
            elements: [
                {
                    kind: "node",
                    name: "node 1",
                    x: MARGIN_SIDE + GROUP_MARGIN_SIDE,
                    key: "0_0",
                    index: 0,
                    layerIndex: 0
                },
                {
                    kind: "node",
                    name: "node 2",
                    x: MARGIN_SIDE + GROUP_MARGIN_SIDE + ELEMENT_WIDTH + HORIZONTAL_SPACING,
                    key: "0_1",
                    index: 1,
                    layerIndex: 0
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
                {kind: "node", name: "node 1", key: "0_0", index: 0, layerIndex: 0, size: 1.2},
                {kind: "node", name: "node 2", key: "0_1", index: 1, layerIndex: 0}
            ]
        }]
    };

    addXToNode(elements, {x: 0}, width(elements));

    let expected: Layer<Node & LayerPosition & X, GroupPosition & X> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group',
            key: "0_0", index: 0, layerIndex: 0,
            x: MARGIN_SIDE,
            elements: [
                {
                    kind: "node",
                    name: "node 1",
                    x: MARGIN_SIDE + GROUP_MARGIN_SIDE,
                    key: "0_0",
                    index: 0,
                    layerIndex: 0,
                    size: 1.2
                },
                {
                    kind: "node",
                    name: "node 2",
                    x: MARGIN_SIDE + GROUP_MARGIN_SIDE + ELEMENT_WIDTH * 1.2 + HORIZONTAL_SPACING,
                    key: "0_1",
                    index: 1,
                    layerIndex: 0
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
                {kind: "node", name: "node 1", key: "0_0", index: 0, layerIndex: 0}
            ]
        }, {
            name: "group 2", kind: 'group', key: "0_1", index: 1, layerIndex: 0, elements: [
                {kind: "node", name: "node 2", key: "0_1", index: 1, layerIndex: 0}
            ]
        }]
    };

    addXToNode(elements, {x: 0}, width(elements));

    let expected: Layer<Node & LayerPosition & X, GroupPosition & X> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group',
            key: "0_0", index: 0, layerIndex: 0,
            x: MARGIN_SIDE,
            elements: [
                {
                    kind: "node",
                    name: "node 1",
                    x: MARGIN_SIDE + GROUP_MARGIN_SIDE,
                    key: "0_0",
                    index: 0,
                    layerIndex: 0
                }
            ]
        }, {
            name: "group 2", kind: 'group',
            key: "0_1", index: 1, layerIndex: 0,
            x: MARGIN_SIDE + ELEMENT_WIDTH + HORIZONTAL_SPACING + 2 * GROUP_MARGIN_SIDE,
            elements: [
                {
                    kind: "node",
                    name: "node 2",
                    x: MARGIN_SIDE + GROUP_MARGIN_SIDE + ELEMENT_WIDTH + HORIZONTAL_SPACING + 2 * GROUP_MARGIN_SIDE,
                    key: "0_1",
                    index: 1,
                    layerIndex: 0
                }
            ]
        }]
    };
    expect(elements).toStrictEqual(expected);
});