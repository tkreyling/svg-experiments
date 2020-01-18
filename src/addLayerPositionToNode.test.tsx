import {addLayerPositionToNode} from "./App";

test('no nodes need no layer positioning', () => {
    addLayerPositionToNode([]);
});

test('one node in one layer ', () => {
    let nodes = [[{name: "group 1", nodes: [{name: "node 1"}]}]];

    addLayerPositionToNode(nodes);

    expect(nodes)
        .toStrictEqual([[{
            name: "group 1", nodes: [
                {name: "node 1", key: "0_0", index: 0, relativePosition: 0, layerIndex: 0}
            ]
        }]]);
});

test('two nodes in one layer', () => {
    let nodes = [[{name: "group 1", nodes: [{name: "node 1"}, {name: "node 2"}]}]];

    addLayerPositionToNode(nodes);

    expect(nodes)
        .toStrictEqual([[{name: "group 1", nodes: [
            {name: "node 1", key: "0_0", index: 0, relativePosition: 0, layerIndex: 0},
            {name: "node 2", key: "0_1", index: 1, relativePosition: 1, layerIndex: 0}
        ]}]]);
});

test('two nodes in one layer in two groups', () => {
    let nodes = [
        [
            {name: "group 1", nodes: [{name: "node 1"}]},
            {name: "group 2", nodes: [{name: "node 2"}]}
        ]
    ];

    addLayerPositionToNode(nodes);

    expect(nodes)
        .toStrictEqual([[
            {name: "group 1", nodes: [{name: "node 1", key: "0_0", index: 0, relativePosition: 0, layerIndex: 0}]},
            {name: "group 2", nodes: [{name: "node 2", key: "0_1", index: 1, relativePosition: 1, layerIndex: 0}]}
        ]]);
});

test('three nodes in one layer ', () => {
    let nodes = [[{name: "group 1", nodes: [{name: "node 1"}, {name: "node 2"}, {name: "node 3"}]}]];

    addLayerPositionToNode(nodes);

    expect(nodes)
        .toStrictEqual([[{
            name: "group 1", nodes: [
                {name: "node 1", key: "0_0", index: 0, relativePosition: 0, layerIndex: 0},
                {name: "node 2", key: "0_1", index: 1, relativePosition: 1, layerIndex: 0},
                {name: "node 3", key: "0_2", index: 2, relativePosition: 2, layerIndex: 0}
            ]
        }]]);
});

test('two nodes and one node in two layers ', () => {
    let nodes = [
        [{name: "group 1", nodes: [{name: "node 1"}, {name: "node 2"}]}],
        [{name: "group 2", nodes: [{name: "node 3"}]}]
    ];

    addLayerPositionToNode(nodes);

    expect(nodes)
        .toStrictEqual([[{
            name: "group 1", nodes: [
                {name: "node 1", key: "0_0", index: 0, relativePosition: 0, layerIndex: 0},
                {name: "node 2", key: "0_1", index: 1, relativePosition: 1, layerIndex: 0}
            ]
        }], [{
            name: "group 2", nodes: [
                {name: "node 3", key: "1_0", index: 0, relativePosition: 0.5, layerIndex: 1}
            ]
        }]]);
});