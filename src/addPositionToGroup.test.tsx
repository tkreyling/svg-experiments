import {addPositionToGroup, GroupPosition, Stack} from "./App";

test('no groups need no positioning', () => {
    addPositionToGroup({kind: 'rows', elements: []});
});

test('one node in one layer ', () => {
    let elements: Stack<unknown, unknown> = {kind: 'rows', elements: [{
        kind: 'columns',
        elements: [{name: "group 1", kind: 'columns', elements: [{name: "node 1"}]}]
    }]};

    let result = addPositionToGroup(elements);

    let expectedElements: Stack<unknown, GroupPosition> = {kind: 'rows', elements: [{
        kind: 'columns', elements: [{
            name: "group 1",
            kind: 'columns',
            key: "G_0_0",
            index: 0,
            layerIndex: 0,
            elements: [{name: "node 1"}]
        }]
    }]};
    expect(result).toStrictEqual(expectedElements);
});

test('two nodes in one layer in two groups', () => {
    let elements: Stack<unknown, unknown> = {kind: 'rows', elements: [
        {
            kind: 'columns', elements: [
                {name: "group 1", kind: 'columns', elements: [{name: "node 1"}]},
                {name: "group 2", kind: 'columns', elements: [{name: "node 2"}]}
            ]
        }
    ]};

    let result = addPositionToGroup(elements);

    let expectedElements: Stack<unknown, GroupPosition> = {kind: 'rows', elements: [{
        kind: 'columns', elements: [
            {
                name: "group 1",
                kind: 'columns',
                key: "G_0_0",
                index: 0,
                layerIndex: 0,
                elements: [{name: "node 1"}]
            }, {
                name: "group 2",
                kind: 'columns',
                key: "G_0_1",
                index: 1,
                layerIndex: 0,
                elements: [{name: "node 2"}]
            }
        ]
    }]};
    expect(result).toStrictEqual(expectedElements);
});

test('two nodes and one node in two layers ', () => {
    let elements: Stack<unknown, unknown> = {kind: 'rows', elements: [
        {kind: 'columns', elements: [{name: "group 1", kind: 'columns', elements: [{name: "node 1"}, {name: "node 2"}]}]},
        {kind: 'columns', elements: [{name: "group 2", kind: 'columns', elements: [{name: "node 3"}]}]}
    ]};

    let result = addPositionToGroup(elements);

    let expectedElements: Stack<unknown, GroupPosition> = {kind: 'rows', elements: [{
        kind: 'columns',
        elements: [
            {
                name: "group 1",
                kind: 'columns',
                key: "G_0_0",
                index: 0,
                layerIndex: 0,
                elements: [{name: "node 1"}, {name: "node 2"}]
            }
        ]
    }, {
        kind: 'columns',
        elements: [
            {
                name: "group 2",
                kind: 'columns',
                key: "G_1_0",
                index: 0,
                layerIndex: 1,
                elements: [{name: "node 3"}]
            }
        ]
    }]};
    expect(result).toStrictEqual(expectedElements);
});