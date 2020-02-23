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

    addXToNode(elements, {x: MARGIN_SIDE}, width(elements));

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

    addXToNode(elements, {x: MARGIN_SIDE}, width(elements));

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

    addXToNode(elements, {x: MARGIN_SIDE}, width(elements));

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

    addXToNode(elements, {x: MARGIN_SIDE}, width(elements));

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

    addXToNode(elements, {x: MARGIN_SIDE}, width(elements));

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

test('stack embedded in a layer', () => {
    let elements: Stack<Node, unknown> = {
        kind: 'stack', elements: [{
            kind: 'layer', elements: [{
                kind: 'group', name: "group  1", elements: [{kind: "node", name: "node 1"}]
            }],
        }, {
            kind: 'layer', elements: [{
                kind: 'group', name: "group 2", elements: [{kind: "node", name: "node 2"}]
            }, {
                kind: 'stack', elements: [{
                    kind: 'layer', elements: [{
                        kind: 'group', name: "group 3", elements: [{kind: "node", name: "node 3"}]
                    }],
                }, {
                    kind: 'layer', elements: [{
                        kind: 'group', name: "group 4", elements: [{kind: "node", name: "node 4"}]
                    }],
                }]
            }, {
                kind: 'group', name: "group 5", elements: [{kind: "node", name: "node 5"}]
            }],
        }, {
            kind: 'layer', elements: [{
                kind: 'group', name: "group 6", elements: [{kind: "node", name: "node 6"}]
            }],
        }
        ]
    };

    addXToNode(elements, {x: MARGIN_SIDE});

    let widthMidLayer = 3 * ELEMENT_WIDTH + 6 * GROUP_MARGIN_SIDE + 2 * HORIZONTAL_SPACING;
    let widthSmallLayers = ELEMENT_WIDTH + 2 * GROUP_MARGIN_SIDE;
    let centering = (widthMidLayer - widthSmallLayers) / 2;
    let expected: Stack<Node & X, X> = {
        kind: 'stack', elements: [{
            kind: 'layer', elements: [{
                kind: 'group', name: "group  1",
                x: MARGIN_SIDE + centering,
                elements: [{
                    kind: "node", name: "node 1",
                    x: MARGIN_SIDE + GROUP_MARGIN_SIDE + centering
                }]
            }],
        }, {
            kind: 'layer', elements: [{
                kind: 'group', name: "group 2",
                x: MARGIN_SIDE,
                elements: [{
                    kind: "node", name: "node 2",
                    x: MARGIN_SIDE + GROUP_MARGIN_SIDE
                }]
            }, {
                kind: 'stack', elements: [{
                    kind: 'layer', elements: [{
                        kind: 'group', name: "group 3",
                        x: MARGIN_SIDE + GROUP_MARGIN_SIDE + ELEMENT_WIDTH + GROUP_MARGIN_SIDE +
                            HORIZONTAL_SPACING,
                        elements: [{
                            kind: "node", name: "node 3",
                            x: MARGIN_SIDE + GROUP_MARGIN_SIDE + ELEMENT_WIDTH + GROUP_MARGIN_SIDE +
                                HORIZONTAL_SPACING +
                                GROUP_MARGIN_SIDE
                        }]
                    }],
                }, {
                    kind: 'layer', elements: [{
                        kind: 'group', name: "group 4",
                        x: MARGIN_SIDE + GROUP_MARGIN_SIDE + ELEMENT_WIDTH + GROUP_MARGIN_SIDE +
                            HORIZONTAL_SPACING,
                        elements: [{
                            kind: "node", name: "node 4",
                            x: MARGIN_SIDE + GROUP_MARGIN_SIDE + ELEMENT_WIDTH + GROUP_MARGIN_SIDE +
                                HORIZONTAL_SPACING +
                                GROUP_MARGIN_SIDE
                        }]
                    }],
                }]
            }, {
                kind: 'group', name: "group 5",
                x: MARGIN_SIDE + GROUP_MARGIN_SIDE + ELEMENT_WIDTH + GROUP_MARGIN_SIDE +
                    HORIZONTAL_SPACING +
                    GROUP_MARGIN_SIDE + ELEMENT_WIDTH + GROUP_MARGIN_SIDE +
                    HORIZONTAL_SPACING,
                elements: [{
                    kind: "node", name: "node 5",
                    x: MARGIN_SIDE + GROUP_MARGIN_SIDE + ELEMENT_WIDTH + GROUP_MARGIN_SIDE +
                        HORIZONTAL_SPACING +
                        GROUP_MARGIN_SIDE + ELEMENT_WIDTH + GROUP_MARGIN_SIDE +
                        HORIZONTAL_SPACING +
                        GROUP_MARGIN_SIDE
                }]
            }],
        }, {
            kind: 'layer', elements: [{
                kind: 'group', name: "group 6",
                x: MARGIN_SIDE + centering,
                elements: [{
                    kind: "node", name: "node 6",
                    x: MARGIN_SIDE + GROUP_MARGIN_SIDE + centering
                }]
            }],
        }
        ]
    };
    expect(elements).toStrictEqual(expected);
});