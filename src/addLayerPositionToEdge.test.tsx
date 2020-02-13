import {addLayerPositionToEdge} from "./addLayerPositionToEdge";
import {Edge, EdgeIndex, Key, LayerIndex, LayerPosition, X} from "./graphModel";

test('no edges need no layer positioning', () => {
    addLayerPositionToEdge([]);
});

test('one edge between first and second layer is positioned on index 0_0 ', () => {
    let edges: Edge<LayerIndex & X & Key>[] = [
        {
            from: {key: "0_0", x: 0, layerIndex: 0},
            to: {key: "1_0", x: 0, layerIndex: 1}
        }
    ];

    addLayerPositionToEdge(edges);

    let expected: (Edge<LayerIndex & X & Key> & LayerPosition & EdgeIndex)[] = [
        {
            edgeIndex: 0,
            key: "0_0_B_0", index: 0, layerIndex: 0,
            from: {key: "0_0", x: 0, layerIndex: 0},
            to: {key: "1_0", x: 0, layerIndex: 1}
        }
    ];
    expect(edges).toStrictEqual(expected);
});

test('the second edge between two layers will get an increased index', () => {
    let edges: Edge<LayerIndex & X & Key>[] = [
        {
            from: {key: "0_0", x: 0, layerIndex: 0},
            to: {key: "1_0", x: 0, layerIndex: 1}
        },
        {
            from: {key: "0_1", x: 1, layerIndex: 0},
            to: {key: "1_1", x: 1, layerIndex: 1}
        }
    ];

    addLayerPositionToEdge(edges);

    let expected: (Edge<LayerIndex & X & Key> & LayerPosition & EdgeIndex)[] = [
        {
            edgeIndex: 0,
            key: "0_0_B_0", index: 0, layerIndex: 0,
            from: {key: "0_0", x: 0, layerIndex: 0},
            to: {key: "1_0", x: 0, layerIndex: 1}
        },
        {
            edgeIndex: 1,
            key: "0_1_B_1", index: 1, layerIndex: 0,
            from: {key: "0_1", x: 1, layerIndex: 0},
            to: {key: "1_1", x: 1, layerIndex: 1}
        }
    ];
    expect(edges).toStrictEqual(expected);
});

test('an edge from a lower layer to an upper layer will be placed below the upper layer', () => {
    let edges: Edge<LayerIndex & X & Key>[] = [
        {
            from: {key: "1_0", x: 0, layerIndex: 1},
            to: {key: "0_0", x: 0, layerIndex: 0}
        },
        {
            from: {key: "1_1", x: 1, layerIndex: 1},
            to: {key: "0_1", x: 1, layerIndex: 0}
        }
    ];

    addLayerPositionToEdge(edges);

    let expected: (Edge<LayerIndex & X & Key> & LayerPosition & EdgeIndex)[] = [
        {
            edgeIndex: 0,
            key: "0_0_B_0", index: 0, layerIndex: 0,
            from: {key: "1_0", x: 0, layerIndex: 1},
            to: {key: "0_0", x: 0, layerIndex: 0}
        },
        {
            edgeIndex: 1,
            key: "0_1_B_1", index: 1, layerIndex: 0,
            from: {key: "1_1", x: 1, layerIndex: 1},
            to: {key: "0_1", x: 1, layerIndex: 0}
        }
    ];
    expect(edges).toStrictEqual(expected);
});

test('edges from the bottom layer to the bottom layer will be placed below the bottom layer', () => {
    let edges: Edge<LayerIndex & X & Key>[] = [
        {
            from: {key: "0_0", x: 0, layerIndex: 0},
            to: {key: "0_1", x: 1, layerIndex: 0}
        },
        {
            from: {key: "0_2", x: 2, layerIndex: 0},
            to: {key: "0_3", x: 3, layerIndex: 0}
        }
    ];

    addLayerPositionToEdge(edges);

    let expected: (Edge<LayerIndex & X & Key> & LayerPosition & EdgeIndex)[] = [
        {
            edgeIndex: 0,
            key: "0_0_A_0", index: 0, layerIndex: 0,
            from: {key: "0_0", x: 0, layerIndex: 0},
            to: {key: "0_1", x: 1, layerIndex: 0}
        },
        {
            edgeIndex: 1,
            key: "0_2_A_1", index: 1, layerIndex: 0,
            from: {key: "0_2", x: 2, layerIndex: 0},
            to: {key: "0_3", x: 3, layerIndex: 0}
        }
    ];
    expect(edges).toStrictEqual(expected);
});