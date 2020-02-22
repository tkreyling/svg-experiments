import {IndexPair, indicesToReferences} from "./indicesToReferences";
import {Edge, Node, Stack} from "./graphModel";

test('no nodes, no indices result in no edges', () => {
    let elements: Stack<Node, unknown> = {kind: 'stack', elements: []};
    let edgeIndices: IndexPair[] = [];

    let edges = indicesToReferences(elements, edgeIndices);

    expect(edges).toStrictEqual([]);
});

test('no nodes, some indices result in an error', () => {
    let elements: Stack<Node, unknown> = {kind: 'stack', elements: []};
    let edgeIndices: IndexPair[] = [{from: [0, 0, 0], to: [0, 0, 1]}];

    try {
        indicesToReferences(elements, edgeIndices);
        fail("Exception must be thrown");
    } catch (e) {
        expect(e.message).toStrictEqual("Indices must refer to a node that does exist. Index 0 Array length 0");
    }
});

test('indices array with empty array element results in an error', () => {
    let elements: Stack<Node, unknown> = {kind: 'stack', elements:  [{
            kind: 'layer', elements: [
                {
                    kind: 'group', name: "group 1", elements: [
                        {kind: "node", name: "node 1"}, {kind: "node", name: "node 2"}]
                }]
        }]};
    // eslint-disable-next-line no-sparse-arrays
    let edgeIndices: IndexPair[] = [{from: [0,, 0] as any, to: [0, 0, 1]}];

    try {
        indicesToReferences(elements, edgeIndices);
        fail("Exception must be thrown");
    } catch (e) {
        expect(e.message).toStrictEqual("Empty array elements are not allowed.");
    }
});

test('two nodes and a matching index pair result in an edge', () => {
    let elements: Stack<Node, unknown> = {kind: 'stack', elements:  [{
        kind: 'layer', elements: [
            {
                kind: 'group', name: "group 1", elements: [
                    {kind: "node", name: "node 1"}, {kind: "node", name: "node 2"}]
            }]
    }]};
    let edgeIndices: IndexPair[] = [{from: [0, 0, 0], to: [0, 0, 1]}];

    let edges = indicesToReferences(elements, edgeIndices);

    let expectedEdges: Edge<Node>[] = [
        {
            from: {kind: "node", name: "node 1"},
            to: {kind: "node", name: "node 2"}
        }
    ];
    expect(edges).toStrictEqual(expectedEdges);
});