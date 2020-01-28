import {allNodes, Node, Stack} from "./App";

test('an empty stack has no nodes', () => {
    let elements: Stack<Node, unknown> = {kind: 'stack', elements: []};

    let nodes = allNodes(elements);

    expect(nodes).toStrictEqual([]);
});

test('one node in one layer ', () => {
    let elements: Stack<Node, unknown> = {
        kind: 'stack', elements: [{
            kind: 'layer',
            elements: [{kind: 'group', name: "group 1", elements: [{kind: "node", name: "node 1"}]}]
        }]
    };

    let nodes = allNodes(elements);

    let expectedNodes: Node[] = [
        {kind: "node", name: "node 1"}
    ];
    expect(nodes).toStrictEqual(expectedNodes);
});

test('two nodes in one layer', () => {
    let elements: Stack<Node, unknown> = {kind: 'stack', elements:  [{
        kind: 'layer', elements: [
            {
                kind: 'group', name: "group 1", elements: [
                    {kind: "node", name: "node 1"}, {kind: "node", name: "node 2"}]
            }]
    }]};

    let nodes = allNodes(elements);

    let expectedNodes: Node[] = [
        {kind: "node", name: "node 1"},
        {kind: "node", name: "node 2"}
    ];
    expect(nodes).toStrictEqual(expectedNodes);
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

    let nodes = allNodes(elements);

    let expectedNodes: Node[] = [
        {kind: "node", name: "node 1"},
        {kind: "node", name: "node 2"}
    ];
    expect(nodes).toStrictEqual(expectedNodes);
});

test('two nodes in one layer in nested groups', () => {
    let elements: Stack<Node, unknown> = {kind: 'stack', elements: [{
            kind: 'layer',
            elements:
                [
                    {name: "group 1", kind: 'group', elements: [
                            {kind: "node", name: "node 1"},
                            {name: "group 2", kind: 'group', elements: [{kind: "node", name: "node 2"}]}
                        ]
                    },
                ]
        }]};

    let nodes = allNodes(elements);

    let expectedNodes: Node[] = [
        {kind: "node", name: "node 1"},
        {kind: "node", name: "node 2"}
    ];
    expect(nodes).toStrictEqual(expectedNodes);
});