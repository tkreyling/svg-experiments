import {Edge, edge, Element, Graph, graph, Node, node} from "../newGraphModel";
import {
    addSyntheticNodesAndEdgesG,
    IsLowerLayerEdge,
    LowerLayerEdge,
    NodeData,
    OriginalEdge
} from "./SyntheticNodesAndEdges";

type InputType = Graph<NodeData, unknown>;

test('no edges need no synthetic edges', () => {
    let state: InputType = graph(
        inputNode({elementKey: 0, offsetElementsX: 0, offsetElementsY: 0}),
        []
    );
    addSyntheticNodesAndEdgesG(state);

    let expected: InputType = graph(
        inputNode({elementKey: 0, offsetElementsX: 0, offsetElementsY: 0}),
        []
    );
    expect(state).toStrictEqual(expected);
});

test('for an edge across multiple layers there is an additional edge in the lower layer', () => {
    let node_1_1 = inputNode({elementKey: 0, offsetElementsX: 0, offsetElementsY: 0});
    let node_1_2 = inputNode({elementKey: 1, offsetElementsX: 1, offsetElementsY: 0});
    let node_2_1 = inputNode({elementKey: 2, offsetElementsX: 0, offsetElementsY: 1});
    let node_3_1 = inputNode({elementKey: 3, offsetElementsX: 0, offsetElementsY: 2});
    let node_3_2 = inputNode({elementKey: 4, offsetElementsX: 1, offsetElementsY: 2});
    let element: Element<NodeData> = {
        kind: "column",
        elementKey: 0, offsetElementsX: 0, offsetElementsY: 0,
        elements: [{
            kind: "row",
            elementKey: 0, offsetElementsX: 0, offsetElementsY: 0,
            elements: [node_1_1, node_1_2]
        }, {
            kind: "row",
            elementKey: 0, offsetElementsX: 0, offsetElementsY: 1,
            elements: [node_2_1]
        }, {
            kind: "row",
            elementKey: 0, offsetElementsX: 0, offsetElementsY: 2,
            elements: [node_3_1, node_3_2]
        }]
    };
    let state: InputType = graph(
        element,
        [edge(node_1_1, node_3_2)]
    );

    addSyntheticNodesAndEdgesG(state);

    let expectedNode_1_1 = inputNode({elementKey: 0, offsetElementsX: 0, offsetElementsY: 0});
    let expectedNode_1_2 = inputNode({elementKey: 1, offsetElementsX: 1, offsetElementsY: 0});
    let expectedNode_2_1 = inputNode({elementKey: 2, offsetElementsX: 0, offsetElementsY: 1});
    let expectedNode_3_1 = inputNode({elementKey: 3, offsetElementsX: 0, offsetElementsY: 2});
    let expectedNode_3_2 = inputNode({elementKey: 4, offsetElementsX: 1, offsetElementsY: 2});
    let syntheticNode = inputNode({elementKey: 5, offsetElementsX: 0, offsetElementsY: 1});
    let expectedEdge = edge(expectedNode_1_1, expectedNode_3_2);
    let syntheticEdge = Object.assign<Edge<Node & NodeData, unknown>, IsLowerLayerEdge & OriginalEdge<Node & NodeData, unknown>>(
        edge(syntheticNode, expectedNode_3_2), {isLowerLayerEdge: true, originalEdge: expectedEdge});
    let expectedEdgeWithLowerLayerEdge = Object.assign<Edge<NodeData, unknown>, LowerLayerEdge<NodeData, unknown>>(
        expectedEdge, {lowerLayerEdge: syntheticEdge});
    let expected: InputType = graph(
        {
            kind: "column",
            elementKey: 0, offsetElementsX: 0, offsetElementsY: 0,
            elements: [{
                kind: "row",
                elementKey: 0, offsetElementsX: 0, offsetElementsY: 0,
                elements: [expectedNode_1_1, expectedNode_1_2]
            }, {
                kind: "row",
                elementKey: 0, offsetElementsX: 0, offsetElementsY: 1,
                elements: [expectedNode_2_1]
            }, {
                kind: "row",
                elementKey: 0, offsetElementsX: 0, offsetElementsY: 2,
                elements: [expectedNode_3_1, expectedNode_3_2]
            }]
        },
        [expectedEdgeWithLowerLayerEdge],
        [syntheticNode],
        [syntheticEdge]
    );
    expect(state).toStrictEqual(expected);
});

function inputNode(nodeData: NodeData): Node & NodeData {
    return Object.assign(node(), nodeData);
}