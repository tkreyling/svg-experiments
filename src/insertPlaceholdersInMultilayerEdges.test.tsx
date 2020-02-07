import {Graph, Layer, LayerIndex, Node, Stack} from "./graphModel";
import {insertPlaceholdersInMultilayerEdges} from "./insertPlaceholdersInMultilayerEdges";
import {indicesToReferences} from "./indicesToReferences";

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
    let stack: Stack<Node & LayerIndex, LayerIndex> = {kind: "stack", elements: [
            layerWithOneNode(0),
            layerWithOneNode(1),
            layerWithOneNode(2)
        ]};
    let graph: Graph<Node & LayerIndex, unknown, LayerIndex> = {
        stack: stack,
        edges: indicesToReferences(stack, [{from: [0, 0, 0], to: [2, 0, 0]}])
    };

    let actual = insertPlaceholdersInMultilayerEdges(graph);

    let expectedStack: Stack<Node & LayerIndex, LayerIndex> = {
        kind: "stack", elements: [
            layerWithOneNode(0),
            {
                kind: "layer",
                elements: [{
                    kind: "node",
                    name: "",
                    isPlaceholder: true,
                    layerIndex: 1,
                    size: 0.01
                }, {
                    kind: "group",
                    name: "some group",
                    layerIndex: 1,
                    elements: [{
                        kind: "node",
                        name: "some node",
                        layerIndex: 1
                    }]
                }]
            },
            layerWithOneNode(2)
        ]
    };
    let expected: Graph<Node & LayerIndex, unknown, LayerIndex> = {
        stack: expectedStack,
        edges: indicesToReferences(expectedStack, [
            {from: [0, 0, 0], to: [1, 0]},
            {from: [1, 0], to: [2, 0, 0]}
        ])
    };
    expect(actual).toStrictEqual(expected);
});

test('for an edge across two layers two additional placeholders are inserted', () => {
    let stack: Stack<Node & LayerIndex, LayerIndex> = {kind: "stack", elements: [
            layerWithOneNode(0),
            layerWithOneNode(1),
            layerWithOneNode(2),
            layerWithOneNode(3)
        ]};
    let graph: Graph<Node & LayerIndex, unknown, LayerIndex> = {
        stack: stack,
        edges: indicesToReferences(stack, [{from: [0, 0, 0], to: [3, 0, 0]}])
    };

    let actual = insertPlaceholdersInMultilayerEdges(graph);

    let expectedStack: Stack<Node & LayerIndex, LayerIndex> = {
        kind: "stack", elements: [
        layerWithOneNode(0),
        {
            kind: "layer",
            elements: [{
                kind: "node",
                name: "",
                isPlaceholder: true,
                layerIndex: 1,
                size: 0.01
            }, {
                kind: "group",
                name: "some group",
                layerIndex: 1,
                elements: [{
                    kind: "node",
                    name: "some node",
                    layerIndex: 1
                }]
            }]
        },
        {
            kind: "layer",
            elements: [{
                kind: "node",
                name: "",
                isPlaceholder: true,
                layerIndex: 2,
                size: 0.01
            }, {
                kind: "group",
                name: "some group",
                layerIndex: 2,
                elements: [{
                    kind: "node",
                    name: "some node",
                    layerIndex: 2
                }]
            }]
        },
        layerWithOneNode(3)
    ]};
    let expected: Graph<Node & LayerIndex, unknown, LayerIndex> = {
        stack: expectedStack,
        edges: indicesToReferences(expectedStack, [
            {from: [0, 0, 0], to: [1, 0]},
            {from: [1, 0], to: [2, 0]},
            {from: [2, 0], to: [3, 0, 0]}
        ])
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