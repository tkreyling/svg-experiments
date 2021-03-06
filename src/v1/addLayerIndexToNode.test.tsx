import {addLayerIndexToNode} from "./addLayerIndexToNode";
import {LayerIndex, Node, Stack} from "./graphModel";

test('no nodes need no layer indices', () => {
    addLayerIndexToNode({kind: 'stack', elements: []});
});

test('one node in one layer ', () => {
    let elements: Stack<Node, unknown> = {kind: 'stack', elements: [{
        kind: 'layer',
        elements: [{kind: 'group', name: "group 1", elements: [{kind: "node", name: "node 1"}]}]
    }]};

    addLayerIndexToNode(elements);

    let expectedElements: Stack<Node & LayerIndex, LayerIndex> = {kind: 'stack', elements: [{
            kind: 'layer', elements: [{
                kind: 'group', name: "group 1", layerIndex: 0,
                elements: [
                    {kind: "node", name: "node 1", layerIndex: 0}
                ]
            }]
        }]};
    expect(elements).toStrictEqual(expectedElements);
});

test('two nodes in one layer', () => {
    let elements: Stack<Node, unknown> = {kind: 'stack', elements:  [{
        kind: 'layer', elements: [
            {
                kind: 'group', name: "group 1", elements: [
                    {kind: "node", name: "node 1"}, {kind: "node", name: "node 2"}]
            }]
    }]};

    addLayerIndexToNode(elements);

    let expectedElements: Stack<Node & LayerIndex, LayerIndex> = {
        kind: 'stack', elements: [{
            kind: 'layer', elements: [{
                name: "group 1", kind: 'group', layerIndex: 0,
                elements: [
                    {kind: "node", name: "node 1", layerIndex: 0},
                    {kind: "node", name: "node 2", layerIndex: 0}
                ]
            }]
        }]
    };
    expect(elements).toStrictEqual(expectedElements);
});

test('two nodes in one layer in two groups', () => {
    let elements: Stack<Node, unknown> = {kind: 'stack', elements: [{
        kind: 'layer',
        elements:
            [
                {name: "group 1", kind: 'group', elements: [{kind: "node", name: "node 1"}]},
                {name: "group 2", kind: 'group', elements: [{kind: "node", name: "node 2"}]}
            ]
    }]};

    addLayerIndexToNode(elements);

    let expectedElements: Stack<Node & LayerIndex, LayerIndex> = {kind: 'stack', elements: [{
        kind: 'layer', elements: [
            {
                name: "group 1",
                kind: 'group',
                layerIndex: 0,
                elements: [{kind: "node", name: "node 1", layerIndex: 0}]
            },
            {
                name: "group 2",
                kind: 'group',
                layerIndex: 0,
                elements: [{kind: "node", name: "node 2", layerIndex: 0}]
            }
        ]
    }]};
    expect(elements).toStrictEqual(expectedElements);
});

test('three nodes in one layer ', () => {
    let elements: Stack<Node, unknown> = {kind: 'stack', elements: [{
        kind: 'layer',
        elements: [{
            name: "group 1",
            kind: 'group',
            elements: [{kind: "node", name: "node 1"}, {kind: "node", name: "node 2"}, {kind: "node", name: "node 3"}]
        }]
    }]};

    addLayerIndexToNode(elements);

    let expectedElements: Stack<Node & LayerIndex, LayerIndex> = {kind: 'stack', elements: [{
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group', layerIndex: 0,
                elements: [
                {kind: "node", name: "node 1", layerIndex: 0},
                {kind: "node", name: "node 2", layerIndex: 0},
                {kind: "node", name: "node 3", layerIndex: 0}
            ]
        }]
    }]};
    expect(elements).toStrictEqual(expectedElements);
});

test('two nodes and one node in two layers ', () => {
    let elements: Stack<Node, unknown> = {kind: 'stack', elements: [
        {kind: 'layer', elements: [{name: "group 1", kind: 'group', elements: [{kind: "node", name: "node 1"}, {kind: "node", name: "node 2"}]}]},
        {kind: 'layer', elements: [{name: "group 2", kind: 'group', elements: [{kind: "node", name: "node 3"}]}]}
    ]};

    addLayerIndexToNode(elements);

    let expectedElements: Stack<Node & LayerIndex, LayerIndex> = {
        kind: 'stack', elements: [{
            kind: 'layer', elements: [{
                name: "group 1", kind: 'group', layerIndex: 0,
                elements: [
                    {kind: "node", name: "node 1", layerIndex: 0},
                    {kind: "node", name: "node 2", layerIndex: 0}
                ]
            }]
        }, {
            kind: 'layer', elements: [{
                name: "group 2", kind: 'group', layerIndex: 1,
                elements: [
                    {kind: "node", name: "node 3", layerIndex: 1}
                ]
            }]
        }]
    };
    expect(elements).toStrictEqual(expectedElements);
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
        }]
    };

    addLayerIndexToNode(elements);

    let expectedElements: Stack<Node & LayerIndex, LayerIndex> = {
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
        }]
    };
    expect(elements).toStrictEqual(expectedElements);
});