import {addLayerPositionToEdge} from "./App";

test('no edges need no layer positioning', () => {
    addLayerPositionToEdge([]);
});

test('one edge between first and second layer is positioned on index 0_0 ', () => {
    let edges = [
        {
            from: {key: "0_0", index: 0, relativePosition: 0, layerIndex: 0},
            to: {key: "1_0", index: 0, relativePosition: 0, layerIndex: 1}
        }
    ];

    addLayerPositionToEdge(edges);

    expect(edges)
        .toStrictEqual([
            {
                key: "0_0_B_0", index: 0, layerIndex: 0,
                from: {key: "0_0", index: 0, relativePosition: 0, layerIndex: 0},
                to: {key: "1_0", index: 0, relativePosition: 0, layerIndex: 1}
            }
        ]);
});

test('the second edge between two layers will get an increased index', () => {
    let edges = [
        {
            from: {key: "0_0", index: 0, relativePosition: 0, layerIndex: 0},
            to: {key: "1_0", index: 0, relativePosition: 0, layerIndex: 1}
        },
        {
            from: {key: "0_1", index: 1, relativePosition: 1, layerIndex: 0},
            to: {key: "1_1", index: 1, relativePosition: 1, layerIndex: 1}
        }
    ];

    addLayerPositionToEdge(edges);

    expect(edges)
        .toStrictEqual([
            {
                key: "0_0_B_0", index: 0, layerIndex: 0,
                from: {key: "0_0", index: 0, relativePosition: 0, layerIndex: 0},
                to: {key: "1_0", index: 0, relativePosition: 0, layerIndex: 1}
            },
            {
                key: "0_1_B_1", index: 1, layerIndex: 0,
                from: {key: "0_1", index: 1, relativePosition: 1, layerIndex: 0},
                to: {key: "1_1", index: 1, relativePosition: 1, layerIndex: 1}
            }
        ]);
});

test('an edge from a lower layer to an upper layer will be placed below the upper layer', () => {
    let edges = [
        {
            from: {key: "1_0", index: 0, relativePosition: 0, layerIndex: 1},
            to: {key: "0_0", index: 0, relativePosition: 0, layerIndex: 0}
        },
        {
            from: {key: "1_1", index: 1, relativePosition: 1, layerIndex: 1},
            to: {key: "0_1", index: 1, relativePosition: 1, layerIndex: 0}
        }
    ];

    addLayerPositionToEdge(edges);

    expect(edges)
        .toStrictEqual([
            {
                key: "0_0_B_0", index: 0, layerIndex: 0,
                from: {key: "1_0", index: 0, relativePosition: 0, layerIndex: 1},
                to: {key: "0_0", index: 0, relativePosition: 0, layerIndex: 0}
            },
            {
                key: "0_1_B_1", index: 1, layerIndex: 0,
                from: {key: "1_1", index: 1, relativePosition: 1, layerIndex: 1},
                to: {key: "0_1", index: 1, relativePosition: 1, layerIndex: 0}
            }
        ]);
});

test('edges from the bottom layer to the bottom layer will be placed below the bottom layer', () => {
    let edges = [
        {
            from: {key: "0_0", index: 0, relativePosition: 0, layerIndex: 0},
            to: {key: "0_1", index: 1, relativePosition: 1, layerIndex: 0}
        },
        {
            from: {key: "0_2", index: 2, relativePosition: 2, layerIndex: 0},
            to: {key: "0_3", index: 3, relativePosition: 3, layerIndex: 0}
        }
    ];

    addLayerPositionToEdge(edges);

    expect(edges)
        .toStrictEqual([
            {
                key: "0_0_A_0", index: 0, layerIndex: 0,
                from: {key: "0_0", index: 0, relativePosition: 0, layerIndex: 0},
                to: {key: "0_1", index: 1, relativePosition: 1, layerIndex: 0}
            },
            {
                key: "0_2_A_1", index: 1, layerIndex: 0,
                from: {key: "0_2", index: 2, relativePosition: 2, layerIndex: 0},
                to: {key: "0_3", index: 3, relativePosition: 3, layerIndex: 0}
            }
        ]);
});