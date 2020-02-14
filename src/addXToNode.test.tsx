import {addXToNode} from "./addXToNode";
import {width} from "./width";
import {ELEMENT_WIDTH, GROUP_MARGIN_SIDE, HORIZONTAL_SPACING, MARGIN_SIDE} from "./styling";
import {Layer, Node, Stack, X} from "./graphModel";

test('no element results in no layouted elements', () => {
    let layer: Layer<Node, unknown> = {kind: 'layer', elements: []};

    addXToNode(layer, {x: 0}, width(layer));

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

    addXToNode(elements, {x: 0}, width(elements));

    let expected: Layer<Node & X, X> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group',
            x: MARGIN_SIDE,
            elements: [
                {
                    kind: "node",
                    name: "node 1",
                    x: MARGIN_SIDE + GROUP_MARGIN_SIDE,
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

    addXToNode(elements, {x: 0}, width(elements));

    let expected: Stack<Node & X, X> = {
        kind: 'stack', elements: [{
            kind: 'layer', elements: [{
                kind: 'group', name: "group 1",
                
                x: MARGIN_SIDE,
                elements: [
                    {
                        kind: "node",
                        name: "node 1",
                        x: MARGIN_SIDE + GROUP_MARGIN_SIDE
                    }
                ]
            }]
        }, {
            kind: 'layer', elements: [{
                kind: 'group', name: "group 2",
                x: MARGIN_SIDE,
                elements: [
                    {
                        kind: "node",
                        name: "node 2",
                        x: MARGIN_SIDE + GROUP_MARGIN_SIDE
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

    addXToNode(elements, {x: 0}, width(elements));

    let expected: Layer<Node & X, X> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group',
            x: MARGIN_SIDE,
            elements: [
                {
                    kind: "node",
                    name: "node 1",
                    x: MARGIN_SIDE + GROUP_MARGIN_SIDE
                },
                {
                    kind: "node",
                    name: "node 2",
                    x: MARGIN_SIDE + GROUP_MARGIN_SIDE + ELEMENT_WIDTH + HORIZONTAL_SPACING
                }
            ]
        }]
    };
    expect(elements).toStrictEqual(expected);
});

test('width of node is adjusted by size property', () => {
    let elements: Layer<Node, unknown> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group', elements: [
                {kind: "node", name: "node 1", size: 1.2},
                {kind: "node", name: "node 2"}
            ]
        }]
    };

    addXToNode(elements, {x: 0}, width(elements));

    let expected: Layer<Node & X, X> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group',
            
            x: MARGIN_SIDE,
            elements: [
                {
                    kind: "node",
                    name: "node 1",
                    x: MARGIN_SIDE + GROUP_MARGIN_SIDE,
                    size: 1.2
                },
                {
                    kind: "node",
                    name: "node 2",
                    x: MARGIN_SIDE + GROUP_MARGIN_SIDE + ELEMENT_WIDTH * 1.2 + HORIZONTAL_SPACING
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

    addXToNode(elements, {x: 0}, width(elements));

    let expected: Layer<Node & X, X> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group',
            
            x: MARGIN_SIDE,
            elements: [
                {
                    kind: "node",
                    name: "node 1",
                    x: MARGIN_SIDE + GROUP_MARGIN_SIDE
                }
            ]
        }, {
            name: "group 2", kind: 'group',
            x: MARGIN_SIDE + ELEMENT_WIDTH + HORIZONTAL_SPACING + 2 * GROUP_MARGIN_SIDE,
            elements: [
                {
                    kind: "node",
                    name: "node 2",
                    x: MARGIN_SIDE + GROUP_MARGIN_SIDE + ELEMENT_WIDTH + HORIZONTAL_SPACING + 2 * GROUP_MARGIN_SIDE
                }
            ]
        }]
    };
    expect(elements).toStrictEqual(expected);
});
