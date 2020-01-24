import {addPositionToGroup, Layer} from "./App";

test('no groups need no positioning', () => {
    addPositionToGroup([]);
});

test('one node in one layer ', () => {
    let elements: Layer<unknown, unknown>[] = [{
        orientation: 'columns',
        elements: [{name: "group 1", elements: [{name: "node 1"}]}]
    }];

    let result = addPositionToGroup(elements);

    expect(result)
        .toStrictEqual([{
            orientation: 'columns', elements: [{
                name: "group 1",
                key: "G_0_0",
                index: 0,
                layerIndex: 0,
                elements: [{name: "node 1"}]
            }]
        }]);
});

test('two nodes in one layer in two groups', () => {
    let elements: Layer<unknown, unknown>[] = [
        {
            orientation: 'columns', elements: [
                {name: "group 1", elements: [{name: "node 1"}]},
                {name: "group 2", elements: [{name: "node 2"}]}
            ]
        }
    ];

    let result = addPositionToGroup(elements);

    expect(result)
        .toStrictEqual([{
            orientation: 'columns', elements: [
                {
                    name: "group 1",
                    key: "G_0_0",
                    index: 0,
                    layerIndex: 0,
                    elements: [{name: "node 1"}]
                }, {
                    name: "group 2",
                    key: "G_0_1",
                    index: 1,
                    layerIndex: 0,
                    elements: [{name: "node 2"}]
                }
            ]
        }]);
});

test('two nodes and one node in two layers ', () => {
    let elements: Layer<unknown, unknown>[] = [
        {orientation: 'columns', elements: [{name: "group 1", elements: [{name: "node 1"}, {name: "node 2"}]}]},
        {orientation: 'columns', elements: [{name: "group 2", elements: [{name: "node 3"}]}]}
    ];

    let result = addPositionToGroup(elements);

    expect(result)
        .toStrictEqual([{
            orientation: 'columns',
            elements: [
                {
                    name: "group 1",
                    key: "G_0_0",
                    index: 0,
                    layerIndex: 0,
                    elements: [{name: "node 1"}, {name: "node 2"}]
                }
            ]
        }, {
            orientation: 'columns',
            elements: [
                {
                    name: "group 2",
                    key: "G_1_0",
                    index: 0,
                    layerIndex: 1,
                    elements: [{name: "node 3"}]
                }
            ]
        }]);
});