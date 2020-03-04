import {Edge, edge, node, Node} from "../newGraphModel";
import {
    addCrossLayerPathSegmentOffsetX,
    CrossLayerPathSegmentOffsetX,
    RequiredEdgeDataTypes,
    RequiredEdgeType,
    RequiredNodeDataTypes
} from "./CrossLayerPathSegmentOffsetX";
import {EdgeIndex} from "./EdgeIndex";

export type ResultEdgeType = Edge<RequiredNodeDataTypes, RequiredEdgeDataTypes & CrossLayerPathSegmentOffsetX>

test('no edges need no CrossLayerPathSegmentOffsetX', () => {
    let edges: RequiredEdgeType[] = [];

    addCrossLayerPathSegmentOffsetX(edges);

    expect(edges).toStrictEqual([]);
});

test('edges without LowerLayerEdge are skipped', () => {
    let edges: RequiredEdgeType[] = [
        edgeWithoutLowerLayerEdge({offsetElementsX: 0, offsetElementsY: 0}, {offsetElementsX: 1, offsetElementsY: 1},
            {edgeIndex: 0})
    ];

    addCrossLayerPathSegmentOffsetX(edges);

    let expected: ResultEdgeType[] = [
        edgeWithoutLowerLayerEdge({offsetElementsX: 0, offsetElementsY: 0}, {offsetElementsX: 1, offsetElementsY: 1},
            {edgeIndex: 0})
    ];
    expect(edges).toStrictEqual(expected);
});

test('one edge with LowerLayerEdge receives CrossLayerPathSegmentOffsetX 0', () => {
    let edges: RequiredEdgeType[] = [
        edgeWithLowerLayerEdge({offsetElementsX: 0, offsetElementsY: 0}, {offsetElementsX: 1, offsetElementsY: 2},
            {edgeIndex: 0})
    ];

    addCrossLayerPathSegmentOffsetX(edges);

    let expected: ResultEdgeType[] = [
        expectedEdge({offsetElementsX: 0, offsetElementsY: 0}, {offsetElementsX: 1, offsetElementsY: 2},
            {edgeIndex: 0, crossLayerPathSegmentOffsetX: 0})
    ];
    expect(edges).toStrictEqual(expected);
});

test('the second edge with higher offsetElementsX receives CrossLayerPathSegmentOffsetX 1', () => {
    let edges: RequiredEdgeType[] = [
        edgeWithLowerLayerEdge({offsetElementsX: 0, offsetElementsY: 0}, {offsetElementsX: 1, offsetElementsY: 2},
            {edgeIndex: 0}),
        edgeWithLowerLayerEdge({offsetElementsX: 0, offsetElementsY: 0}, {offsetElementsX: 2, offsetElementsY: 2},
            {edgeIndex: 0})
    ];

    addCrossLayerPathSegmentOffsetX(edges);

    let expected: ResultEdgeType[] = [
        expectedEdge({offsetElementsX: 0, offsetElementsY: 0}, {offsetElementsX: 1, offsetElementsY: 2},
            {edgeIndex: 0, crossLayerPathSegmentOffsetX: 0}),
        expectedEdge({offsetElementsX: 0, offsetElementsY: 0}, {offsetElementsX: 2, offsetElementsY: 2},
            {edgeIndex: 0, crossLayerPathSegmentOffsetX: 1})
    ];
    expect(edges).toStrictEqual(expected);
});

function inputNode(nodeData: RequiredNodeDataTypes): Node & RequiredNodeDataTypes {
    return Object.assign(node(), nodeData);
}

function edgeWithoutLowerLayerEdge(
    from: RequiredNodeDataTypes, to: RequiredNodeDataTypes,
    edgeData: EdgeIndex
): RequiredEdgeType {
    return Object.assign<Edge<RequiredNodeDataTypes, unknown>, RequiredEdgeDataTypes>(
        edge(inputNode(from), inputNode(to)), {edgeIndex: edgeData.edgeIndex});
}

function edgeWithLowerLayerEdge(
    from: RequiredNodeDataTypes, to: RequiredNodeDataTypes,
    edgeData: EdgeIndex
): RequiredEdgeType {
    return Object.assign<Edge<RequiredNodeDataTypes, unknown>, RequiredEdgeDataTypes>(
        edge(inputNode(from), inputNode(to)), {lowerLayerEdge: someEdge(), edgeIndex: edgeData.edgeIndex});
}

function expectedEdge(
    from: RequiredNodeDataTypes, to: RequiredNodeDataTypes,
    edgeData: EdgeIndex & CrossLayerPathSegmentOffsetX
): ResultEdgeType {
    return Object.assign<RequiredEdgeType, CrossLayerPathSegmentOffsetX>(
        edgeWithLowerLayerEdge(from, to, edgeData), {crossLayerPathSegmentOffsetX: edgeData.crossLayerPathSegmentOffsetX});
}

function someEdge() {
    return edge(node(), node());
}