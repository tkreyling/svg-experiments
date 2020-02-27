import {addMidPathSegmentOffsetY, EdgeIndex, MidPathSegmentOffsetY} from "./MidPathSegmentOffsetY";
import {OffsetElementsX} from "../elementsLayout/OffsetElementsX";
import {OffsetElementsY} from "../elementsLayout/OffsetElementsY";
import {Edge} from "../newGraphModel";

type InputType = Edge<OffsetElementsX & OffsetElementsY, unknown>[];
type OutputType = Edge<OffsetElementsX & OffsetElementsY, MidPathSegmentOffsetY & EdgeIndex>[];

test('no edges need no MidPathSegmentOffsetY', () => {
    addMidPathSegmentOffsetY([]);
});

test('one edge between first and second layer is positioned on index 0_0 ', () => {
    let edges: InputType = [
        {
            from: {offsetElementsX: 0, offsetElementsY: 0},
            to: {offsetElementsX: 0, offsetElementsY: 1}
        }
    ];

    addMidPathSegmentOffsetY(edges);

    let expected: OutputType = [
        {
            edgeIndex: 0, midPathSegmentOffsetY: 0,
            from: {offsetElementsX: 0, offsetElementsY: 0},
            to: {offsetElementsX: 0, offsetElementsY: 1}
        }
    ];
    expect(edges).toStrictEqual(expected);
});

test('the second edge between two layers will get an increased index', () => {
    let edges: InputType = [
        {
            from: {offsetElementsX: 0, offsetElementsY: 0},
            to: {offsetElementsX: 0, offsetElementsY: 1}
        },
        {
            from: {offsetElementsX: 1, offsetElementsY: 0},
            to: {offsetElementsX: 1, offsetElementsY: 1}
        }
    ];

    addMidPathSegmentOffsetY(edges);

    let expected: OutputType = [
        {
            edgeIndex: 0, midPathSegmentOffsetY: 0,
            from: {offsetElementsX: 0, offsetElementsY: 0},
            to: {offsetElementsX: 0, offsetElementsY: 1}
        },
        {
            edgeIndex: 1, midPathSegmentOffsetY: 1,
            from: {offsetElementsX: 1, offsetElementsY: 0},
            to: {offsetElementsX: 1, offsetElementsY: 1}
        }
    ];
    expect(edges).toStrictEqual(expected);
});

test('an edge from a lower layer to an upper layer will be placed below the upper layer', () => {
    let edges: InputType = [
        {
            from: {offsetElementsX: 0, offsetElementsY: 1},
            to: {offsetElementsX: 0, offsetElementsY: 0}
        },
        {
            from: {offsetElementsX: 1, offsetElementsY: 1},
            to: {offsetElementsX: 1, offsetElementsY: 0}
        }
    ];

    addMidPathSegmentOffsetY(edges);

    let expected: OutputType = [
        {
            edgeIndex: 0, midPathSegmentOffsetY: 0,
            from: {offsetElementsX: 0, offsetElementsY: 1},
            to: {offsetElementsX: 0, offsetElementsY: 0}
        },
        {
            edgeIndex: 1, midPathSegmentOffsetY: 1,
            from: {offsetElementsX: 1, offsetElementsY: 1},
            to: {offsetElementsX: 1, offsetElementsY: 0}
        }
    ];
    expect(edges).toStrictEqual(expected);
});

test('edges from the bottom layer to the bottom layer will be placed below the bottom layer', () => {
    let edges: InputType = [
        {
            from: {offsetElementsX: 0, offsetElementsY: 0},
            to: {offsetElementsX: 1, offsetElementsY: 0}
        },
        {
            from: {offsetElementsX: 2, offsetElementsY: 0},
            to: {offsetElementsX: 3, offsetElementsY: 0}
        }
    ];

    addMidPathSegmentOffsetY(edges);

    let expected: OutputType = [
        {
            edgeIndex: 0, midPathSegmentOffsetY: 0,
            from: {offsetElementsX: 0, offsetElementsY: 0},
            to: {offsetElementsX: 1, offsetElementsY: 0}
        },
        {
            edgeIndex: 1, midPathSegmentOffsetY: 1,
            from: {offsetElementsX: 2, offsetElementsY: 0},
            to: {offsetElementsX: 3, offsetElementsY: 0}
        }
    ];
    expect(edges).toStrictEqual(expected);
});