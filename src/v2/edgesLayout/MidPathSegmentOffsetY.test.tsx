import {addMidPathSegmentOffsetY, MidPathSegmentOffsetY} from "./MidPathSegmentOffsetY";
import {OffsetElementsX} from "../elementsLayout/OffsetElementsX";
import {OffsetElementsY} from "../elementsLayout/OffsetElementsY";
import {Edge} from "../newGraphModel";
import {ConnectionIndex, NumberOfEdges} from "./ConnectionIndexAndNumberOfEdges";
import {EdgeIndex} from "./EdgeIndex";

type InputType = Edge<OffsetElementsX & OffsetElementsY & NumberOfEdges, ConnectionIndex & EdgeIndex>[];
type OutputType = Edge<OffsetElementsX & OffsetElementsY & NumberOfEdges, ConnectionIndex & EdgeIndex & MidPathSegmentOffsetY>[];

test('no edges need no MidPathSegmentOffsetY', () => {
    addMidPathSegmentOffsetY([]);
});

test('one edge between first and second layer is positioned on index 0_0 ', () => {
    let edges: InputType = [
        {
            edgeIndex: 0,
            fromIndex: 0, from: {offsetElementsX: 0, offsetElementsY: 0},
            toIndex: 0, to: {offsetElementsX: 0, offsetElementsY: 1},
        }
    ];

    addMidPathSegmentOffsetY(edges);

    let expected: OutputType = [
        {
            edgeIndex: 0, midPathSegmentOffsetY: 0,
            fromIndex: 0, from: {offsetElementsX: 0, offsetElementsY: 0},
            toIndex: 0, to: {offsetElementsX: 0, offsetElementsY: 1}
        }
    ];
    expect(edges).toStrictEqual(expected);
});

test('the second edge between two layers will get an increased index', () => {
    let edges: InputType = [
        {
            edgeIndex: 0,
            fromIndex: 0, from: {offsetElementsX: 0, offsetElementsY: 0},
            toIndex: 0, to: {offsetElementsX: 0, offsetElementsY: 1}
        },
        {
            edgeIndex: 1,
            fromIndex: 0, from: {offsetElementsX: 1, offsetElementsY: 0},
            toIndex: 0, to: {offsetElementsX: 1, offsetElementsY: 1}
        }
    ];

    addMidPathSegmentOffsetY(edges);

    let expected: OutputType = [
        {
            edgeIndex: 0, midPathSegmentOffsetY: 0,
            fromIndex: 0, from: {offsetElementsX: 0, offsetElementsY: 0},
            toIndex: 0, to: {offsetElementsX: 0, offsetElementsY: 1}
        },
        {
            edgeIndex: 1, midPathSegmentOffsetY: 1,
            fromIndex: 0, from: {offsetElementsX: 1, offsetElementsY: 0},
            toIndex: 0, to: {offsetElementsX: 1, offsetElementsY: 1}
        }
    ];
    expect(edges).toStrictEqual(expected);
});

test('edge end with same offsetElementsX receives a right side midPathSegmentOffsetY, if it connects more to the right', () => {
    let edges: InputType = [
        {
            edgeIndex: 0,
            fromIndex: 0, from: {offsetElementsX: 0, offsetElementsY: 0, lowerSideEdges: 2},
            toIndex: 0, to: {offsetElementsX: 0, offsetElementsY: 1, upperSideEdges: 1}
        },
        {
            edgeIndex: 1,
            fromIndex: 1, from: {offsetElementsX: 0, offsetElementsY: 0, lowerSideEdges: 2},
            toIndex: 0, to: {offsetElementsX: 1, offsetElementsY: 1, upperSideEdges: 1}
        }
    ];

    addMidPathSegmentOffsetY(edges);

    let expected: OutputType = [
        {
            edgeIndex: 0, midPathSegmentOffsetY: 1,
            fromIndex: 0, from: {offsetElementsX: 0, offsetElementsY: 0, lowerSideEdges: 2},
            toIndex: 0, to: {offsetElementsX: 0, offsetElementsY: 1, upperSideEdges: 1}
        },
        {
            edgeIndex: 1, midPathSegmentOffsetY: 0,
            fromIndex: 1, from: {offsetElementsX: 0, offsetElementsY: 0, lowerSideEdges: 2},
            toIndex: 0, to: {offsetElementsX: 1, offsetElementsY: 1, upperSideEdges: 1}
        }
    ];
    expect(edges).toStrictEqual(expected);
});

test('an edge from a lower layer to an upper layer will be placed below the upper layer', () => {
    let edges: InputType = [
        {
            edgeIndex: 0,
            fromIndex: 0, from: {offsetElementsX: 0, offsetElementsY: 1},
            toIndex: 0, to: {offsetElementsX: 0, offsetElementsY: 0}
        },
        {
            edgeIndex: 1,
            fromIndex: 0, from: {offsetElementsX: 1, offsetElementsY: 1},
            toIndex: 0, to: {offsetElementsX: 1, offsetElementsY: 0}
        }
    ];

    addMidPathSegmentOffsetY(edges);

    let expected: OutputType = [
        {
            edgeIndex: 0, midPathSegmentOffsetY: 0,
            fromIndex: 0, from: {offsetElementsX: 0, offsetElementsY: 1},
            toIndex: 0, to: {offsetElementsX: 0, offsetElementsY: 0}
        },
        {
            edgeIndex: 1, midPathSegmentOffsetY: 1,
            fromIndex: 0, from: {offsetElementsX: 1, offsetElementsY: 1},
            toIndex: 0, to: {offsetElementsX: 1, offsetElementsY: 0}
        }
    ];
    expect(edges).toStrictEqual(expected);
});

test('edges from the bottom layer to the bottom layer will be placed below the bottom layer', () => {
    let edges: InputType = [
        {
            edgeIndex: 0,
            fromIndex: 0, from: {offsetElementsX: 0, offsetElementsY: 0},
            toIndex: 0, to: {offsetElementsX: 1, offsetElementsY: 0}
        },
        {
            edgeIndex: 1,
            fromIndex: 0, from: {offsetElementsX: 2, offsetElementsY: 0},
            toIndex: 0, to: {offsetElementsX: 3, offsetElementsY: 0}
        }
    ];

    addMidPathSegmentOffsetY(edges);

    let expected: OutputType = [
        {
            edgeIndex: 0, midPathSegmentOffsetY: 0,
            fromIndex: 0, from: {offsetElementsX: 0, offsetElementsY: 0},
            toIndex: 0, to: {offsetElementsX: 1, offsetElementsY: 0}
        },
        {
            edgeIndex: 1, midPathSegmentOffsetY: 1,
            fromIndex: 0, from: {offsetElementsX: 2, offsetElementsY: 0},
            toIndex: 0, to: {offsetElementsX: 3, offsetElementsY: 0}
        }
    ];
    expect(edges).toStrictEqual(expected);
});