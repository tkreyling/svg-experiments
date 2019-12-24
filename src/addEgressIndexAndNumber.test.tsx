import {addEgressIndexAndNumber} from "./App";

test('no edges need no egress positioning', () => {
    addEgressIndexAndNumber([]);
});

test('one edge has egressIndex 0 and the node has egressNumber 1', () => {
    let edges = [
        {
            from: {key: "0_0", index: 0, layerIndex: 0},
            to: {key: "1_0", index: 0, layerIndex: 1}
        }
    ];

    addEgressIndexAndNumber(edges);

    expect(edges)
        .toStrictEqual([
            {
                egressIndex: 0,
                from: {key: "0_0", index: 0, layerIndex: 0, egressNumber: 1},
                to: {key: "1_0", index: 0, layerIndex: 1}
            }
        ]);
});

test('the second edge from one node will get an increased index', () => {
    let node = {key: "0_0", index: 0, layerIndex: 0};
    let edges = [
        {
            from: node,
            to: {key: "1_0", index: 0, layerIndex: 1}
        },
        {
            from: node,
            to: {key: "1_1", index: 1, layerIndex: 1}
        }
    ];

    addEgressIndexAndNumber(edges);

    expect(edges)
        .toStrictEqual([
            {
                egressIndex: 0,
                from: {key: "0_0", index: 0, layerIndex: 0, egressNumber: 2},
                to: {key: "1_0", index: 0, layerIndex: 1}
            },
            {
                egressIndex: 1,
                from: {key: "0_0", index: 0, layerIndex: 0, egressNumber: 2},
                to: {key: "1_1", index: 1, layerIndex: 1}
            }
        ]);
});