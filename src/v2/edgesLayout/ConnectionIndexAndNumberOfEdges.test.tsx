import {addConnectionIndexAndNumberOfEdges, ConnectionIndex, NumberOfEdges} from "./ConnectionIndexAndNumberOfEdges";
import {Edge} from "../newGraphModel";
import {OffsetElementsX} from "../elementsLayout/OffsetElementsX";
import {OffsetElementsY} from "../elementsLayout/OffsetElementsY";
import {ElementKey} from "../elementsLayout/ElementKey";
import {EdgeIndex} from "./EdgeIndex";

type InputType = Edge<OffsetElementsY & OffsetElementsX & ElementKey, EdgeIndex>[];
type OutputType = Edge<OffsetElementsY & OffsetElementsX & ElementKey & NumberOfEdges, EdgeIndex & ConnectionIndex>[];

test('no edges need no connection index', () => {
    addConnectionIndexAndNumberOfEdges([]);
});

test('one edge has connectionIndex 0 and the node has numberOfEdges 1', () => {
    let edges: InputType = [
        {
            edgeIndex: 0,
            from: {elementKey: 0, offsetElementsX: 0, offsetElementsY: 0},
            to: {elementKey: 1, offsetElementsX: 0, offsetElementsY: 1}
        }
    ];

    addConnectionIndexAndNumberOfEdges(edges);

    let expected: OutputType = [
        {
            edgeIndex: 0,
            from: {elementKey: 0, offsetElementsX: 0, offsetElementsY: 0, lowerSideEdges: 1},
            fromIndex: 0,
            to: {elementKey: 1, offsetElementsX: 0, offsetElementsY: 1, upperSideEdges: 1},
            toIndex: 0
        }
    ];
    expect(edges).toStrictEqual(expected);
});

test('an edge from a lower to an upper layer has connectionIndex 0 and the node has numberOfEdges 1', () => {
    let edges: InputType = [
        {
            edgeIndex: 0,
            from: {elementKey: 1, offsetElementsX: 0, offsetElementsY: 1},
            to: {elementKey: 0, offsetElementsX: 0, offsetElementsY: 0}
        }
    ];

    addConnectionIndexAndNumberOfEdges(edges);

    let expected: OutputType = [
        {
            edgeIndex: 0,
            from: {elementKey: 1, offsetElementsX: 0, offsetElementsY: 1, upperSideEdges: 1},
            fromIndex: 0,
            to: {elementKey: 0, offsetElementsX: 0, offsetElementsY: 0, lowerSideEdges: 1},
            toIndex: 0
        }
    ];
    expect(edges).toStrictEqual(expected);
});

test('an edge on the same layer has two times lowerSideEdges = 1', () => {
    let edges: InputType = [
        {
            edgeIndex: 0,
            from: {elementKey: 0, offsetElementsX: 0, offsetElementsY: 0},
            to: {elementKey: 1, offsetElementsX: 1, offsetElementsY: 0}
        }
    ];

    addConnectionIndexAndNumberOfEdges(edges);

    let expected = [
        {
            edgeIndex: 0,
            from: {elementKey: 0, offsetElementsX: 0, offsetElementsY: 0, lowerSideEdges: 1},
            fromIndex: 0,
            to: {elementKey: 1, offsetElementsX: 1, offsetElementsY: 0, lowerSideEdges: 1},
            toIndex: 0
        }
    ];
    expect(edges).toStrictEqual(expected);
});

test('the second edge from one node will get an increased index and ' +
    'edges are sorted by the index of the other node in the layer', () => {
    let node = {elementKey: 0, offsetElementsX: 0, offsetElementsY: 0};
    let edges: InputType = [
        {
            edgeIndex: 0,
            from: node,
            to: {elementKey: 1, offsetElementsX: 0, offsetElementsY: 1}
        },
        {
            edgeIndex: 1,
            from: node,
            to: {elementKey: 2, offsetElementsX: 1, offsetElementsY: 1}
        }
    ];

    addConnectionIndexAndNumberOfEdges(edges);

    let expected: OutputType = [
        {
            edgeIndex: 0,
            from: {elementKey: 0, offsetElementsX: 0, offsetElementsY: 0, lowerSideEdges: 2},
            fromIndex: 0,
            to: {elementKey: 1, offsetElementsX: 0, offsetElementsY: 1, upperSideEdges: 1},
            toIndex: 0
        },
        {
            edgeIndex: 1,
            from: {elementKey: 0, offsetElementsX: 0, offsetElementsY: 0, lowerSideEdges: 2},
            fromIndex: 1,
            to: {elementKey: 2, offsetElementsX: 1, offsetElementsY: 1, upperSideEdges: 1},
            toIndex: 0
        }
    ];
    expect(edges).toStrictEqual(expected);
});

test('edges to the same layer are sorted reversely', () => {
    let node = {elementKey: 0, offsetElementsX: 0, offsetElementsY: 0};
    let edges: InputType = [
        {
            edgeIndex: 0,
            from: node,
            to: {elementKey: 1, offsetElementsX: 1, offsetElementsY: 0}
        },
        {
            edgeIndex: 1,
            from: node,
            to: {elementKey: 2, offsetElementsX: 2, offsetElementsY: 0}
        }
    ];

    addConnectionIndexAndNumberOfEdges(edges);

    let expected: OutputType = [
        {
            edgeIndex: 0,
            from: {elementKey: 0, offsetElementsX: 0, offsetElementsY: 0, lowerSideEdges: 2},
            fromIndex: 1,
            to: {elementKey: 1, offsetElementsX: 1, offsetElementsY: 0, lowerSideEdges: 1},
            toIndex: 0
        },
        {
            edgeIndex: 1,
            from: {elementKey: 0, offsetElementsX: 0, offsetElementsY: 0, lowerSideEdges: 2},
            fromIndex: 0,
            to: {elementKey: 2, offsetElementsX: 2, offsetElementsY: 0, lowerSideEdges: 1},
            toIndex: 0
        }
    ];
    expect(edges).toStrictEqual(expected);
});

test('two edges to the same node in the same layer have reversed indices on the node', () => {
    let from = {elementKey: 0, offsetElementsX: 0, offsetElementsY: 0};
    let to = {elementKey: 1, offsetElementsX: 1, offsetElementsY: 0};
    let edges: InputType = [
        {
            edgeIndex: 0,
            from: from,
            to: to
        },
        {
            edgeIndex: 1,
            from: from,
            to: to
        }
    ];

    addConnectionIndexAndNumberOfEdges(edges);

    let expectedFrom = {elementKey: 0, offsetElementsX: 0, offsetElementsY: 0, lowerSideEdges: 2};
    let expectedTo = {elementKey: 1, offsetElementsX: 1, offsetElementsY: 0, lowerSideEdges: 2};
    let expected: OutputType = [
        {
            edgeIndex: 0,
            from: expectedFrom,
            fromIndex: 0,
            to: expectedTo,
            toIndex: 1
        },
        {
            edgeIndex: 1,
            from: expectedFrom,
            fromIndex: 1,
            to: expectedTo,
            toIndex: 0
        }
    ];
    expect(edges).toStrictEqual(expected);
});

test('edges to the same layer are sorted after edges to another layer, if they are after the origin node', () => {
    let node = {elementKey: 0, offsetElementsX: 0, offsetElementsY: 0};
    let edges: InputType = [
        {
            edgeIndex: 0,
            from: node,
            to: {elementKey: 1, offsetElementsX: 1, offsetElementsY: 0}
        },
        {
            edgeIndex: 1,
            from: node,
            to: {elementKey: 1, offsetElementsX: 0, offsetElementsY: 1}
        }
    ];

    addConnectionIndexAndNumberOfEdges(edges);

    let expected: OutputType = [
        {
            edgeIndex: 0,
            from: {elementKey: 0, offsetElementsX: 0, offsetElementsY: 0, lowerSideEdges: 2},
            fromIndex: 1,
            to: {elementKey: 1, offsetElementsX: 1, offsetElementsY: 0, lowerSideEdges: 1},
            toIndex: 0
        },
        {
            edgeIndex: 1,
            from: {elementKey: 0, offsetElementsX: 0, offsetElementsY: 0, lowerSideEdges: 2},
            fromIndex: 0,
            to: {elementKey: 1, offsetElementsX: 0, offsetElementsY: 1, upperSideEdges: 1},
            toIndex: 0
        }
    ];
    expect(edges).toStrictEqual(expected);
});

test('edges to the same layer are sorted before edges to another layer, if they are before the origin node', () => {
    let node = {elementKey: 1, offsetElementsX: 1, offsetElementsY: 0};
    let edges: InputType = [
        {
            edgeIndex: 0,
            from: node,
            to: {elementKey: 0, offsetElementsX: 0, offsetElementsY: 0}
        },
        {
            edgeIndex: 1,
            from: node,
            to: {elementKey: 1, offsetElementsX: 0, offsetElementsY: 1}
        }
    ];

    addConnectionIndexAndNumberOfEdges(edges);

    let expected: OutputType = [
        {
            edgeIndex: 0,
            from: {elementKey: 1, offsetElementsX: 1, offsetElementsY: 0, lowerSideEdges: 2},
            fromIndex: 0,
            to: {elementKey: 0, offsetElementsX: 0, offsetElementsY: 0, lowerSideEdges: 1},
            toIndex: 0
        },
        {
            edgeIndex: 1,
            from: {elementKey: 1, offsetElementsX: 1, offsetElementsY: 0, lowerSideEdges: 2},
            fromIndex: 1,
            to: {elementKey: 1, offsetElementsX: 0, offsetElementsY: 1, upperSideEdges: 1},
            toIndex: 0
        }
    ];
    expect(edges).toStrictEqual(expected);
});