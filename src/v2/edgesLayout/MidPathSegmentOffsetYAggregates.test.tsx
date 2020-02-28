import {AddedNodeData, addMidPathSegmentOffsetYAggregates, EdgeData, NodeData} from "./MidPathSegmentOffsetYAggregates";
import {Graph, graph, node, Node} from "../newGraphModel";

type InputType = Graph<NodeData, EdgeData>
type ExpectedType = Graph<NodeData & AddedNodeData, EdgeData>

test('no edges need no additional space after a layer', () => {
    let node1 = inputNode({offsetElementsX: 0, offsetElementsY: 0});
    let state: InputType = graph(node1, []);

    addMidPathSegmentOffsetYAggregates(state);

    let expectedNode1 = expectedNode({offsetElementsX: 0, offsetElementsY: 0, midPathSegmentOffsetMaxPreviousY: 0});
    let expected: ExpectedType = graph(expectedNode1, []);
    expect(state).toStrictEqual(expected);
});

test('midPathSegmentOffsetMaxPreviousY is set for all layers', () => {
    let node1 = inputNode({offsetElementsX: 0, offsetElementsY: 0});
    let node2 = inputNode({offsetElementsX: 0, offsetElementsY: 1});
    let node3 = inputNode({offsetElementsX: 0, offsetElementsY: 2});
    let state: InputType = graph(
        {
            kind: "column", offsetElementsX: 0, offsetElementsY: 0,
            elements: [node1, node2, node3]
        },
        []);

    addMidPathSegmentOffsetYAggregates(state);

    let expectedNode1 = expectedNode({offsetElementsX: 0, offsetElementsY: 0, midPathSegmentOffsetMaxPreviousY: 0});
    let expectedNode2 = expectedNode({offsetElementsX: 0, offsetElementsY: 1, midPathSegmentOffsetMaxPreviousY: 0});
    let expectedNode3 = expectedNode({offsetElementsX: 0, offsetElementsY: 2, midPathSegmentOffsetMaxPreviousY: 0});
    let expected: ExpectedType = graph(
        {
            kind: "column", offsetElementsX: 0, offsetElementsY: 0, midPathSegmentOffsetMaxPreviousY: 0,
            elements: [expectedNode1, expectedNode2, expectedNode3]
        },
        []);
    expect(state).toStrictEqual(expected);
});

test('one edge between two consecutive layers requires no additional space', () => {
    let node1 = inputNode({offsetElementsX: 0, offsetElementsY: 0});
    let node2 = inputNode({offsetElementsX: 0, offsetElementsY: 1});
    let state: InputType = graph(
        {
            kind: "column", offsetElementsX: 0, offsetElementsY: 0,
            elements: [node1, node2]
        },
        [{
            from: node1, to: node2, midPathSegmentOffsetY: 0
        }]
    );

    addMidPathSegmentOffsetYAggregates(state);

    let expectedNode1 = expectedNode({offsetElementsX: 0, offsetElementsY: 0, midPathSegmentOffsetMaxPreviousY: 0});
    let expectedNode2 = expectedNode({offsetElementsX: 0, offsetElementsY: 1, midPathSegmentOffsetMaxPreviousY: 0});
    let expected: ExpectedType = graph(
        {
            kind: "column", offsetElementsX: 0, offsetElementsY: 0, midPathSegmentOffsetMaxPreviousY: 0,
            elements: [expectedNode1, expectedNode2]
        },
        [{
            from: expectedNode1, to: expectedNode2, midPathSegmentOffsetY: 0
        }]
    );
    expect(state).toStrictEqual(expected);
});

test('two edges between two consecutive layers require additional spacing', () => {
    let node1 = inputNode({offsetElementsX: 0, offsetElementsY: 0});
    let node2 = inputNode({offsetElementsX: 0, offsetElementsY: 1});
    let state: InputType = graph(
        {
            kind: "column", offsetElementsX: 0, offsetElementsY: 0,
            elements: [node1, node2]
        },
        [
            {from: node1, to: node2, midPathSegmentOffsetY: 0},
            {from: node1, to: node2, midPathSegmentOffsetY: 1}
        ]
    );

    addMidPathSegmentOffsetYAggregates(state);

    let expectedNode1 = expectedNode({offsetElementsX: 0, offsetElementsY: 0, midPathSegmentOffsetMaxPreviousY: 0});
    let expectedNode2 = expectedNode({offsetElementsX: 0, offsetElementsY: 1, midPathSegmentOffsetMaxPreviousY: 1});
    let expected: ExpectedType = graph(
        {
            kind: "column", offsetElementsX: 0, offsetElementsY: 0, midPathSegmentOffsetMaxPreviousY: 0,
            elements: [expectedNode1, expectedNode2]
        },
        [
            {from: expectedNode1, to: expectedNode2, midPathSegmentOffsetY: 0},
            {from: expectedNode1, to: expectedNode2, midPathSegmentOffsetY: 1}
        ]
    );
    expect(state).toStrictEqual(expected);
});

test('an edge from a lower layer to an upper layer requires space below the upper layer', () => {
    let node1 = inputNode({offsetElementsX: 0, offsetElementsY: 0});
    let node2 = inputNode({offsetElementsX: 0, offsetElementsY: 1});
    let state: InputType = graph(
        {
            kind: "column", offsetElementsX: 0, offsetElementsY: 0,
            elements: [node1, node2]
        },
        [
            {from: node2, to: node1, midPathSegmentOffsetY: 0},
            {from: node2, to: node1, midPathSegmentOffsetY: 1}
        ]
    );

    addMidPathSegmentOffsetYAggregates(state);

    let expectedNode1 = expectedNode({offsetElementsX: 0, offsetElementsY: 0, midPathSegmentOffsetMaxPreviousY: 0});
    let expectedNode2 = expectedNode({offsetElementsX: 0, offsetElementsY: 1, midPathSegmentOffsetMaxPreviousY: 1});
    let expected: ExpectedType = graph(
        {
            kind: "column", offsetElementsX: 0, offsetElementsY: 0, midPathSegmentOffsetMaxPreviousY: 0,
            elements: [expectedNode1, expectedNode2]
        },
        [
            {from: expectedNode2, to: expectedNode1, midPathSegmentOffsetY: 0},
            {from: expectedNode2, to: expectedNode1, midPathSegmentOffsetY: 1}
        ]
    );
    expect(state).toStrictEqual(expected);
});

test('edges in layer above are considered for layer below with no edges', () => {
    let node1 = inputNode({offsetElementsX: 0, offsetElementsY: 0});
    let node2 = inputNode({offsetElementsX: 0, offsetElementsY: 1});
    let node3 = inputNode({offsetElementsX: 0, offsetElementsY: 2});
    let state: InputType = graph(
        {
            kind: "column", offsetElementsX: 0, offsetElementsY: 0,
            elements: [node1, node2, node3]
        },
        [
            {from: node1, to: node2, midPathSegmentOffsetY: 0},
            {from: node1, to: node2, midPathSegmentOffsetY: 1}
        ]
    );

    addMidPathSegmentOffsetYAggregates(state);

    let expectedNode1 = expectedNode({offsetElementsX: 0, offsetElementsY: 0, midPathSegmentOffsetMaxPreviousY: 0});
    let expectedNode2 = expectedNode({offsetElementsX: 0, offsetElementsY: 1, midPathSegmentOffsetMaxPreviousY: 1});
    let expectedNode3 = expectedNode({offsetElementsX: 0, offsetElementsY: 2, midPathSegmentOffsetMaxPreviousY: 1});
    let expected: ExpectedType = graph(
        {
            kind: "column", offsetElementsX: 0, offsetElementsY: 0, midPathSegmentOffsetMaxPreviousY: 0,
            elements: [expectedNode1, expectedNode2, expectedNode3]
        },
        [
            {from: expectedNode1, to: expectedNode2, midPathSegmentOffsetY: 0},
            {from: expectedNode1, to: expectedNode2, midPathSegmentOffsetY: 1}
        ]
    );
    expect(state).toStrictEqual(expected);
});

function inputNode(nodeData: NodeData): Node & NodeData {
    return Object.assign(node(), nodeData);
}

function expectedNode(nodeData: NodeData & AddedNodeData): Node & NodeData & AddedNodeData {
    return Object.assign(node(), nodeData);
}