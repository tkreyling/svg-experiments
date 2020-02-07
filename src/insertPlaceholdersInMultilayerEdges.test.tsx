import {Graph, Layer, LayerIndex, Node} from "./graphModel";
import {insertPlaceholdersInMultilayerEdges} from "./insertPlaceholdersInMultilayerEdges";

test('no edges no changes', () => {
    let graph: Graph<Node & LayerIndex, unknown, LayerIndex> = {
        stack: {
            kind: "stack", elements: []
        },
        edges: []
    };

    let actual = insertPlaceholdersInMultilayerEdges(graph);

    expect(actual).toStrictEqual(graph);
});

test('for an edge across one layer one additional placeholder is inserted', () => {
    let layers = [
        layerWithOneNode(0),
        layerWithOneNode(1),
        layerWithOneNode(2)
    ];
    let graph: Graph<Node & LayerIndex, unknown, LayerIndex> = {
        stack: {kind: "stack", elements: layers},
        edges: [{ from: layers[0].elements[0].elements[0] as Node & LayerIndex, to: layers[2].elements[0].elements[0] as Node & LayerIndex}]
    };

    let actual = insertPlaceholdersInMultilayerEdges(graph);

    let expectedLayers: Layer<Node & LayerIndex, LayerIndex>[] = [
        layerWithOneNode(0),
        {
            kind: "layer",
            elements: [{
                kind: "group",
                name: "some group",
                layerIndex: 1,
                elements: [{
                    kind: "node",
                    name: "",
                    isPlaceholder: true,
                    layerIndex: 1,
                    size: 0.01
                }, {
                    kind: "node",
                    name: "some node",
                    layerIndex: 1
                }]
            }]
        },
        layerWithOneNode(2)
    ];
    let expected: Graph<Node & LayerIndex, unknown, LayerIndex> = {
        stack: {kind: "stack", elements: expectedLayers},
        edges: [
            {from: expectedLayers[0].elements[0].elements[0] as Node & LayerIndex, to: expectedLayers[1].elements[0].elements[0] as Node & LayerIndex},
            {from: expectedLayers[1].elements[0].elements[0] as Node & LayerIndex, to: expectedLayers[2].elements[0].elements[0] as Node & LayerIndex}
        ]
    };
    expect(actual).toStrictEqual(expected);
});

test('for an edge across two layers two additional placeholders are inserted', () => {
    let layers = [
        layerWithOneNode(0),
        layerWithOneNode(1),
        layerWithOneNode(2),
        layerWithOneNode(3)
    ];
    let graph: Graph<Node & LayerIndex, unknown, LayerIndex> = {
        stack: {kind: "stack", elements: layers},
        edges: [{ from: layers[0].elements[0].elements[0] as Node & LayerIndex, to: layers[3].elements[0].elements[0] as Node & LayerIndex}]
    };

    let actual = insertPlaceholdersInMultilayerEdges(graph);

    let expectedLayers: Layer<Node & LayerIndex, LayerIndex>[] = [
        layerWithOneNode(0),
        {
            kind: "layer",
            elements: [{
                kind: "group",
                name: "some group",
                layerIndex: 1,
                elements: [{
                    kind: "node",
                    name: "",
                    isPlaceholder: true,
                    layerIndex: 1,
                    size: 0.01
                }, {
                    kind: "node",
                    name: "some node",
                    layerIndex: 1
                }]
            }]
        },
        {
            kind: "layer",
            elements: [{
                kind: "group",
                name: "some group",
                layerIndex: 2,
                elements: [{
                    kind: "node",
                    name: "",
                    isPlaceholder: true,
                    layerIndex: 2,
                    size: 0.01
                }, {
                    kind: "node",
                    name: "some node",
                    layerIndex: 2
                }]
            }]
        },
        layerWithOneNode(3)
    ];
    let expected: Graph<Node & LayerIndex, unknown, LayerIndex> = {
        stack: {kind: "stack", elements: expectedLayers},
        edges: [
            {from: expectedLayers[0].elements[0].elements[0] as Node & LayerIndex, to: expectedLayers[1].elements[0].elements[0] as Node & LayerIndex},
            {from: expectedLayers[1].elements[0].elements[0] as Node & LayerIndex, to: expectedLayers[2].elements[0].elements[0] as Node & LayerIndex},
            {from: expectedLayers[2].elements[0].elements[0] as Node & LayerIndex, to: expectedLayers[3].elements[0].elements[0] as Node & LayerIndex}
        ]
    };
    expect(actual).toStrictEqual(expected);
});

function layerWithOneNode(layerIndex: number): Layer<Node & LayerIndex, LayerIndex> {
    return {
        kind: "layer",
        elements: [{
            kind: "group",
            name: "some group",
            layerIndex: layerIndex,
            elements: [{
                kind: "node",
                name: "some node",
                layerIndex: layerIndex
            }]
        }]
    };
}