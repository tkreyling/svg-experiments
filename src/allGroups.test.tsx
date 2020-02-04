import {allGroups, Group, Node, Stack} from "./App";

test('an empty stack has no groups', () => {
    let elements: Stack<Node, unknown> = {kind: 'stack', elements: []};

    let nodes = allGroups(elements);

    expect(nodes).toStrictEqual([]);
});

test('one groups in one layer', () => {
    let elements: Stack<Node, unknown> = {
        kind: 'stack', elements: [{
            kind: 'layer',
            elements: [{kind: 'group', name: "group 1", elements: [{kind: "node", name: "node 1"}]}]
        }]
    };

    let groups = allGroups(elements);

    let expected: Group<Node, unknown>[] = [
        {kind: 'group', name: "group 1", elements: [{kind: "node", name: "node 1"}]}
    ];
    expect(groups).toStrictEqual(expected);
});

test('two groups in one layer', () => {
    let elements: Stack<Node, unknown> = {kind: 'stack', elements: [{
            kind: 'layer',
            elements:
                [
                    {name: "group 1", kind: 'group', elements: [{kind: "node", name: "node 1"}]},
                    {name: "group 2", kind: 'group', elements: [{kind: "node", name: "node 2"}]}
                ]
        }]};

    let groups = allGroups(elements);

    let expected: Group<Node, unknown>[] = [
        {name: "group 1", kind: 'group', elements: [{kind: "node", name: "node 1"}]},
        {name: "group 2", kind: 'group', elements: [{kind: "node", name: "node 2"}]}
    ];
    expect(groups).toStrictEqual(expected);
});

test('nested groups', () => {
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

    let groups = allGroups(elements);

    let expected: Group<Node, unknown>[] = [
        {name: "group 1", kind: 'group', elements: [
                {kind: "node", name: "node 1"},
                {name: "group 2", kind: 'group', elements: [{kind: "node", name: "node 2"}]}
            ]
        },
        {name: "group 2", kind: 'group', elements: [{kind: "node", name: "node 2"}]}
    ];
    expect(groups).toStrictEqual(expected);
});