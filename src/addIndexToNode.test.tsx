import {addIndexToNode} from "./addIndexToNode";
import {Index, Node, Stack} from "./graphModel";

test('no nodes need no layer positioning', () => {
    addIndexToNode({kind: 'stack', elements: []});
});

test('one node in one layer ', () => {
    let elements: Stack<Node, unknown> = {kind: 'stack', elements: [{
        kind: 'layer',
        elements: [{kind: 'group', name: "group 1", elements: [{kind: "node", name: "node 1"}]}]
    }]};

    addIndexToNode(elements);

    let expectedElements: Stack<Node & Index, Index> = {kind: 'stack', elements: [{
            kind: 'layer', elements: [{
                kind: 'group', name: "group 1", index: 0,
                elements: [
                    {kind: "node", name: "node 1", index: 0}
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

    addIndexToNode(elements);

    let expectedElements: Stack<Node & Index, Index> = {
        kind: 'stack', elements: [{
            kind: 'layer', elements: [{
                name: "group 1", kind: 'group', index: 0,
                elements: [
                    {kind: "node", name: "node 1", index: 0},
                    {kind: "node", name: "node 2", index: 1}
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

    addIndexToNode(elements);

    let expectedElements: Stack<Node & Index, Index> = {kind: 'stack', elements: [{
        kind: 'layer', elements: [
            {
                name: "group 1",
                kind: 'group',
                index: 0,
                elements: [{kind: "node", name: "node 1", index: 0}]
            },
            {
                name: "group 2",
                kind: 'group',
                index: 1,
                elements: [{kind: "node", name: "node 2", index: 1}]
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

    addIndexToNode(elements);

    let expectedElements: Stack<Node & Index, Index> = {kind: 'stack', elements: [{
        kind: 'layer', elements: [{
            name: "group 1", kind: 'group', index: 0,
                elements: [
                {kind: "node", name: "node 1", index: 0},
                {kind: "node", name: "node 2", index: 1},
                {kind: "node", name: "node 3", index: 2}
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

    addIndexToNode(elements);

    let expectedElements: Stack<Node & Index, Index> = {
        kind: 'stack', elements: [{
            kind: 'layer', elements: [{
                name: "group 1", kind: 'group', index: 0,
                elements: [
                    {kind: "node", name: "node 1", index: 0},
                    {kind: "node", name: "node 2", index: 1}
                ]
            }]
        }, {
            kind: 'layer', elements: [{
                name: "group 2", kind: 'group', index: 0,
                elements: [
                    {kind: "node", name: "node 3", index: 0}
                ]
            }]
        }]
    };
    expect(elements).toStrictEqual(expectedElements);
});