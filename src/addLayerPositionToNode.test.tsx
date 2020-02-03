import {addLayerPositionToNode, GroupPosition, LayerPosition, Node, Stack} from "./App";

test('no nodes need no layer positioning', () => {
    addLayerPositionToNode({kind: 'stack', elements: []});
});

test('one node in one layer ', () => {
    let elements: Stack<Node, unknown> = {kind: 'stack', elements: [{
        kind: 'layer',
        elements: [{kind: 'group', name: "group 1", elements: [{kind: "node", name: "node 1"}]}]
    }]};

    addLayerPositionToNode(elements);

    let expectedElements: Stack<Node & LayerPosition, GroupPosition> = {kind: 'stack', elements: [{
            kind: 'layer', elements: [{
                kind: 'group', name: "group 1", key: "G_0_0", index: 0, layerIndex: 0,
                elements: [
                    {kind: "node", name: "node 1", key: "0_0", index: 0, layerIndex: 0}
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

    addLayerPositionToNode(elements);

    let expectedElements: Stack<Node & LayerPosition, GroupPosition> = {
        kind: 'stack', elements: [{
            kind: 'layer', elements: [{
                name: "group 1", kind: 'group', key: "G_0_0", index: 0, layerIndex: 0,
                elements: [
                    {kind: "node", name: "node 1", key: "0_0", index: 0, layerIndex: 0},
                    {kind: "node", name: "node 2", key: "0_1", index: 1, layerIndex: 0}
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

    addLayerPositionToNode(elements);

    let expectedElements: Stack<Node & LayerPosition, GroupPosition> = {kind: 'stack', elements: [{
        kind: 'layer', elements: [
            {
                name: "group 1",
                kind: 'group',
                key: "G_0_0", index: 0, layerIndex: 0,
                elements: [{kind: "node", name: "node 1", key: "0_0", index: 0, layerIndex: 0}]
            },
            {
                name: "group 2",
                kind: 'group',
                key: "G_0_1", index: 1, layerIndex: 0,
                elements: [{kind: "node", name: "node 2", key: "0_1", index: 1, layerIndex: 0}]
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

    addLayerPositionToNode(elements);

    let expectedElements: Stack<Node & LayerPosition, GroupPosition> = {kind: 'stack', elements: [{
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group', key: "G_0_0", index: 0, layerIndex: 0,
                elements: [
                {kind: "node", name: "node 1", key: "0_0", index: 0, layerIndex: 0},
                {kind: "node", name: "node 2", key: "0_1", index: 1, layerIndex: 0},
                {kind: "node", name: "node 3", key: "0_2", index: 2, layerIndex: 0}
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

    addLayerPositionToNode(elements);

    let expectedElements: Stack<Node & LayerPosition, GroupPosition> = {
        kind: 'stack', elements: [{
            kind: 'layer', elements: [{
                name: "group 1", kind: 'group', key: "G_0_0", index: 0, layerIndex: 0,
                elements: [
                    {kind: "node", name: "node 1", key: "0_0", index: 0, layerIndex: 0},
                    {kind: "node", name: "node 2", key: "0_1", index: 1, layerIndex: 0}
                ]
            }]
        }, {
            kind: 'layer', elements: [{
                name: "group 2", kind: 'group', key: "G_1_0", index: 0, layerIndex: 1,
                elements: [
                    {kind: "node", name: "node 3", key: "1_0", index: 0, layerIndex: 1}
                ]
            }]
        }]
    };
    expect(elements).toStrictEqual(expectedElements);
});