import {addConnectionIndexAndNumberOfEdges} from "./App";

test('no edges need no connection index', () => {
    addConnectionIndexAndNumberOfEdges([]);
});

test('one edge has connectionIndex 0 and the node has numberOfEdges 1', () => {
    let edges = [
        {
            from: {key: "0_0", index: 0, layerIndex: 0},
            to: {key: "1_0", index: 0, layerIndex: 1}
        }
    ];

    addConnectionIndexAndNumberOfEdges(edges);

    expect(edges)
        .toStrictEqual([
            {
                from: {key: "0_0", index: 0, layerIndex: 0, lowerSideEdges: 1},
                fromIndex: 0,
                to: {key: "1_0", index: 0, layerIndex: 1, upperSideEdges: 1},
                toIndex: 0
            }
        ]);
});

test('an edge from a lower to an upper layer has connectionIndex 0 and the node has numberOfEdges 1', () => {
    let edges = [
        {
            from: {key: "1_0", index: 0, layerIndex: 1},
            to: {key: "0_0", index: 0, layerIndex: 0}
        }
    ];

    addConnectionIndexAndNumberOfEdges(edges);

    expect(edges)
        .toStrictEqual([
            {
                from: {key: "1_0", index: 0, layerIndex: 1, upperSideEdges: 1},
                fromIndex: 0,
                to: {key: "0_0", index: 0, layerIndex: 0, lowerSideEdges: 1},
                toIndex: 0
            }
        ]);
});

test('an edge on the same layer has two times lowerSideEdges = 1', () => {
    let edges = [
        {
            from: {key: "0_0", index: 0, layerIndex: 0},
            to: {key: "0_1", index: 1, layerIndex: 0}
        }
    ];

    addConnectionIndexAndNumberOfEdges(edges);

    expect(edges)
        .toStrictEqual([
            {
                from: {key: "0_0", index: 0, layerIndex: 0, lowerSideEdges: 1},
                fromIndex: 0,
                to: {key: "0_1", index: 1, layerIndex: 0, lowerSideEdges: 1},
                toIndex: 0
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

    addConnectionIndexAndNumberOfEdges(edges);

    expect(edges)
        .toStrictEqual([
            {
                fromIndex: 0,
                from: {key: "0_0", index: 0, layerIndex: 0, lowerSideEdges: 2},
                to: {key: "1_0", index: 0, layerIndex: 1, upperSideEdges: 1},
                toIndex: 0
            },
            {
                fromIndex: 1,
                from: {key: "0_0", index: 0, layerIndex: 0, lowerSideEdges: 2},
                to: {key: "1_1", index: 1, layerIndex: 1, upperSideEdges: 1},
                toIndex: 0
            }
        ]);
});