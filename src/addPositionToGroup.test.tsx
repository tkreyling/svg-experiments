import {addPositionToGroup} from "./App";

test('no groups need no positioning', () => {
    addPositionToGroup([]);
});

test('one node in one layer ', () => {
    let nodes = [{elements: [{name: "group 1", nodes: [{name: "node 1"}]}]}];

    let result = addPositionToGroup(nodes);

    expect(result)
        .toStrictEqual([{elements: [{
            name: "group 1",
            key: "G_0_0",
            index: 0,
            layerIndex: 0,
            nodes: [{name: "node 1"}]
        }]}]);
});

test('two nodes in one layer in two groups', () => {
    let nodes = [
        {elements: [
            {name: "group 1", nodes: [{name: "node 1"}]},
            {name: "group 2", nodes: [{name: "node 2"}]}
        ]}
    ];

    let result = addPositionToGroup(nodes);

    expect(result)
        .toStrictEqual([{elements: [
            {
                name: "group 1",
                key: "G_0_0",
                index: 0,
                layerIndex: 0,
                nodes: [{name: "node 1"}]
            }, {
                name: "group 2",
                key: "G_0_1",
                index: 1,
                layerIndex: 0,
                nodes: [{name: "node 2"}]
            }
        ]}]);
});

test('two nodes and one node in two layers ', () => {
    let nodes = [
        {elements: [{name: "group 1", nodes: [{name: "node 1"}, {name: "node 2"}]}]},
        {elements: [{name: "group 2", nodes: [{name: "node 3"}]}]}
    ];

    let result = addPositionToGroup(nodes);

    expect(result)
        .toStrictEqual([{
            elements: [
                {
                    name: "group 1",
                    key: "G_0_0",
                    index: 0,
                    layerIndex: 0,
                    nodes: [{name: "node 1"}, {name: "node 2"}]
                }
            ]
        }, {
            elements: [
                {
                    name: "group 2",
                    key: "G_1_0",
                    index: 0,
                    layerIndex: 1,
                    nodes: [{name: "node 3"}]
                }
            ]
        }]);
});