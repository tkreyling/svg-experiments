import {addYToNode} from "./addYToNode";
import {ELEMENT_HEIGHT, GROUP_MARGIN_BOTTOM, GROUP_MARGIN_TOP, MARGIN_TOP, VERTICAL_SPACING} from "./styling";
import {Height, Layer, LayerDimensions, LayerIndex, Node, Stack, Y} from "./graphModel";

test('no element results in no layouted elements', () => {
    let layer: Layer<Node & LayerIndex, LayerIndex > = {kind: 'layer', elements: []};

    addYToNode(layer, {y: 0, nodeY: 0, groupHeight: 0, belowLayerY: 0}, []);

    expect(layer).toStrictEqual({kind: 'layer', elements: []});
});

test('one element is layouted to the origin', () => {
    let elements: Layer<Node & LayerIndex, LayerIndex> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group', layerIndex: 0, elements: [
                {kind: "node", name: "node 1", layerIndex: 0}
            ]
        }]
    };

    addYToNode(elements, {y: MARGIN_TOP, nodeY: 0, groupHeight: 0, belowLayerY: 0}, []);

    let expected: Layer<Node & LayerIndex & Y & LayerDimensions, LayerIndex & Y & Height> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group', layerIndex: 0,
            y: MARGIN_TOP,
            height: ELEMENT_HEIGHT + GROUP_MARGIN_TOP + GROUP_MARGIN_BOTTOM,
            elements: [
                {
                    kind: "node", name: "node 1", layerIndex: 0,
                    y: MARGIN_TOP + GROUP_MARGIN_TOP,
                    belowLayerY: MARGIN_TOP + GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING
                }
            ]
        }]
    };
    expect(elements).toStrictEqual(expected);
});

test('one element in the second layer keeps space for the two borders between the layers', () => {
    let elements: Stack<Node & LayerIndex, LayerIndex > = {
        kind: 'stack', elements: [{
            kind: 'layer', elements: [{
                kind: 'group', name: "group 1", layerIndex: 0, elements: [
                    {kind: "node", name: "node 1", layerIndex: 0}
                ]
            }]
        }, {
            kind: 'layer', elements: [{
                kind: 'group', name: "group 2", layerIndex: 1, elements: [
                    {kind: "node", name: "node 2", layerIndex: 1}
                ]
            }]
        }]
    };

    addYToNode(elements, {y: MARGIN_TOP, nodeY: 0, groupHeight: 0, belowLayerY: 0}, []);

    let expected: Stack<Node & LayerIndex & Y & LayerDimensions, LayerIndex & Y & Height> = {
        kind: 'stack', elements: [{
            kind: 'layer', elements: [{
                kind: 'group', name: "group 1", layerIndex: 0,
                y: MARGIN_TOP,
                height: ELEMENT_HEIGHT + GROUP_MARGIN_TOP + GROUP_MARGIN_BOTTOM,
                elements: [
                    {
                        kind: "node", name: "node 1", layerIndex: 0,
                        y: MARGIN_TOP + GROUP_MARGIN_TOP,
                        belowLayerY: MARGIN_TOP + GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING
                    }
                ]
            }]
        }, {
            kind: 'layer', elements: [{
                kind: 'group', name: "group 2", layerIndex: 1,
                y: MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING + GROUP_MARGIN_TOP,
                height: ELEMENT_HEIGHT + GROUP_MARGIN_TOP + GROUP_MARGIN_BOTTOM,
                elements: [
                    {
                        kind: "node", name: "node 2", layerIndex: 1,
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
    let elements: Layer<Node & LayerIndex, LayerIndex > = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group', layerIndex: 0, elements: [
                {kind: "node", name: "node 1", layerIndex: 0},
                {kind: "node", name: "node 2", layerIndex: 0}
            ]
        }]
    };

    addYToNode(elements, {y: MARGIN_TOP, nodeY: 0, groupHeight: 0, belowLayerY: 0}, []);

    let expected: Layer<Node & LayerIndex & Y & LayerDimensions, LayerIndex & Y & Height> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group', layerIndex: 0,
            y: MARGIN_TOP,
            height: ELEMENT_HEIGHT + GROUP_MARGIN_TOP + GROUP_MARGIN_BOTTOM,
            elements: [
                {
                    kind: "node", name: "node 1", layerIndex: 0,
                    y: MARGIN_TOP + GROUP_MARGIN_TOP,
                    belowLayerY: MARGIN_TOP + GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING
                },
                {
                    kind: "node", name: "node 2", layerIndex: 0,
                    y: MARGIN_TOP + GROUP_MARGIN_TOP,
                    belowLayerY: MARGIN_TOP + GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING
                }
            ]
        }]
    };
    expect(elements).toStrictEqual(expected);
});

test('two elements in two groups have an additional spacing for the two group borders', () => {
    let elements: Layer<Node & LayerIndex, LayerIndex > = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group', layerIndex: 0, elements: [
                {kind: "node", name: "node 1", layerIndex: 0}
            ]
        }, {
            name: "group 2", kind: 'group', layerIndex: 0, elements: [
                {kind: "node", name: "node 2", layerIndex: 0}
            ]
        }]
    };

    addYToNode(elements, {y: MARGIN_TOP, nodeY: 0, groupHeight: 0, belowLayerY: 0}, []);

    let expected: Layer<Node & LayerIndex & Y & LayerDimensions, LayerIndex & Y & Height> = {
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group', layerIndex: 0,
            y: MARGIN_TOP,
            height: ELEMENT_HEIGHT + GROUP_MARGIN_TOP + GROUP_MARGIN_BOTTOM,
            elements: [
                {
                    kind: "node", name: "node 1", layerIndex: 0,
                    y: MARGIN_TOP + GROUP_MARGIN_TOP,
                    belowLayerY: MARGIN_TOP + GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING
                }
            ]
        }, {
            name: "group 2", kind: 'group', layerIndex: 0,
            y: MARGIN_TOP,
            height: ELEMENT_HEIGHT + GROUP_MARGIN_TOP + GROUP_MARGIN_BOTTOM,
            elements: [
                {
                    kind: "node", name: "node 2", layerIndex: 0,
                    y: MARGIN_TOP + GROUP_MARGIN_TOP,
                    belowLayerY: MARGIN_TOP + GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING
                }
            ]
        }]
    };
    expect(elements).toStrictEqual(expected);
});

test('stack embedded in a layer', () => {
    let elements: Stack<Node & LayerIndex, LayerIndex > = {
        kind: 'stack', elements: [{
            kind: 'layer', elements: [{
                kind: 'group', name: "group  1", layerIndex: 0, elements: [{
                    kind: "node", name: "node 1", layerIndex: 0
                }]
            }],
        }, {
            kind: 'layer', elements: [{
                kind: 'group', name: "group 2", layerIndex: 1, elements: [{
                    kind: "node", name: "node 2", layerIndex: 1
                }]
            }, {
                kind: 'stack', elements: [{
                    kind: 'layer', elements: [{
                        kind: 'group', name: "group 3", layerIndex: 1, elements: [{
                            kind: "node", name: "node 3", layerIndex: 1
                        }]
                    }],
                }, {
                    kind: 'layer', elements: [{
                        kind: 'group', name: "group 4", layerIndex: 2, elements: [{
                            kind: "node", name: "node 4", layerIndex: 2
                        }]
                    }],
                }]
            }, {
                kind: 'group', name: "group 5", layerIndex: 1, elements: [{
                    kind: "node", name: "node 5", layerIndex: 1
                }]
            }],
        }, {
            kind: 'layer', elements: [{
                kind: 'group', name: "group 6", layerIndex: 3, elements: [{
                    kind: "node", name: "node 6", layerIndex: 3
                }]
            }],
        }
        ]
    };

    let belowNode1 = 7;
    let belowNode3 = 11;
    let belowNode4 = 13;
    let belowNode6 = 17;
    let heightOfEdges = [belowNode1, belowNode3, belowNode4, belowNode6];

    addYToNode(elements, {y: MARGIN_TOP, nodeY: 0, groupHeight: 0, belowLayerY: 0}, heightOfEdges);

    let expected: Stack<Node & LayerIndex & Y & LayerDimensions, LayerIndex & Y & Height> = {
        kind: 'stack', elements: [{
            kind: 'layer', elements: [{
                kind: 'group', name: "group  1", layerIndex: 0,
                y: MARGIN_TOP,
                height: GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM,
                elements: [{
                    kind: "node", name: "node 1", layerIndex: 0,
                    y: MARGIN_TOP +
                        GROUP_MARGIN_TOP,
                    belowLayerY: MARGIN_TOP +
                        GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING
                }]
            }],
        }, {
            kind: 'layer', elements: [{
                kind: 'group', name: "group 2", layerIndex: 1,
                y: MARGIN_TOP +
                    GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING + belowNode1,
                height: GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM,
                elements: [{
                    kind: "node", name: "node 2", layerIndex: 1,
                    y: MARGIN_TOP +
                        GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING + belowNode1 +
                        GROUP_MARGIN_TOP,
                    belowLayerY: MARGIN_TOP +
                        GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING + belowNode1 +
                        GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING
                }]
            }, {
                kind: 'stack', elements: [{
                    kind: 'layer', elements: [{
                        kind: 'group', name: "group 3", layerIndex: 1,
                        y: MARGIN_TOP +
                            GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_TOP + belowNode1,
                        height: GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM,
                        elements: [{
                            kind: "node", name: "node 3", layerIndex: 1,
                            y: MARGIN_TOP +
                                GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING + belowNode1 +
                                GROUP_MARGIN_TOP,
                            belowLayerY: MARGIN_TOP +
                                GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING + belowNode1 +
                                GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING
                        }]
                    }],
                }, {
                    kind: 'layer', elements: [{
                        kind: 'group', name: "group 4", layerIndex: 2,
                        y: MARGIN_TOP +
                            GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING + belowNode1 +
                            GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING + belowNode3,
                        height: GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM,
                        elements: [{
                            kind: "node", name: "node 4", layerIndex: 2,
                            y: MARGIN_TOP +
                                GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING + belowNode1 +
                                GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING + belowNode3 +
                                GROUP_MARGIN_TOP,
                            belowLayerY: MARGIN_TOP +
                                GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING + belowNode1 +
                                GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING + belowNode3 +
                                GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING
                        }]
                    }],
                }]
            }, {
                kind: 'group', name: "group 5", layerIndex: 1,
                y: MARGIN_TOP +
                    GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_TOP + belowNode1,
                height: GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM,
                elements: [{
                    kind: "node", name: "node 5", layerIndex: 1,
                    y: MARGIN_TOP +
                        GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING + belowNode1 +
                        GROUP_MARGIN_TOP,
                    belowLayerY: MARGIN_TOP +
                        GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING + belowNode1 +
                        GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING
                }]
            }],
        }, {
            kind: 'layer', elements: [{
                kind: 'group', name: "group 6", layerIndex: 3,
                y: MARGIN_TOP +
                    GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING + belowNode1 +
                    GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING + belowNode3 +
                    GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING + belowNode4,
                height: GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM,
                elements: [{
                    kind: "node", name: "node 6", layerIndex: 3,
                    y: MARGIN_TOP +
                        GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING + belowNode1 +
                        GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING + belowNode3 +
                        GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING + belowNode4 +
                        GROUP_MARGIN_TOP,
                    belowLayerY: MARGIN_TOP +
                        GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING + belowNode1 +
                        GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING + belowNode3 +
                        GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING + belowNode4 +
                        GROUP_MARGIN_TOP + ELEMENT_HEIGHT + GROUP_MARGIN_BOTTOM + VERTICAL_SPACING
                }]
            }],
        }
        ]
    };
    expect(elements).toStrictEqual(expected);
});
