import React from "react";
import {
    BORDER_SPACING_BOTTOM,
    BORDER_SPACING_TOP,
    BORDER_SPACING_X,
    EDGE_SPACING,
    ELEMENT_HEIGHT,
    ELEMENT_WIDTH,
    HORIZONTAL_SPACING,
    STROKE_WIDTH,
    VERTICAL_SPACING
} from "./styling";
import {OffsetElementsY} from "./elementsLayout/OffsetElementsY";
import {OffsetElementsX} from "./elementsLayout/OffsetElementsX";
import {BorderIndexMaxX} from "./elementsLayout/BorderIndexMaxX";
import {BorderIndexMaxPreviousTop, BorderIndexMaxTop} from "./elementsLayout/BorderIndexMaxTop";
import {BorderIndexMaxBottom, BorderIndexMaxPreviousBottom} from "./elementsLayout/BorderIndexMaxBottom";
import {BorderIndexTop} from "./elementsLayout/BorderIndexTop";
import {Edge} from "./newGraphModel";
import {getUpperLeftNode} from "./EdgeHelper";
import {MidPathSegmentOffsetY} from "./edgesLayout/MidPathSegmentOffsetY";
import {MidPathSegmentOffsetMaxPreviousY} from "./edgesLayout/MidPathSegmentOffsetYAggregates";
import {ConnectionIndex, NumberOfEdges} from "./edgesLayout/ConnectionIndexAndNumberOfEdges";
import {EdgeIndex} from "./edgesLayout/EdgeIndex";

function getY<N extends OffsetElementsY &
    BorderIndexTop & BorderIndexMaxTop & BorderIndexMaxPreviousTop & BorderIndexMaxPreviousBottom &
    MidPathSegmentOffsetMaxPreviousY>(node: N) {
    return node.offsetElementsY * (ELEMENT_HEIGHT + VERTICAL_SPACING)
        + (node.borderIndexMaxPreviousTop + node.borderIndexMaxTop - node.borderIndexTop) * BORDER_SPACING_TOP
        + node.borderIndexMaxPreviousBottom * BORDER_SPACING_BOTTOM
        + node.midPathSegmentOffsetMaxPreviousY * EDGE_SPACING;
}

function edgeEndCoordinates<N extends OffsetElementsX & OffsetElementsY &
    BorderIndexMaxX & BorderIndexTop & BorderIndexMaxTop & BorderIndexMaxPreviousTop & BorderIndexMaxPreviousBottom &
    MidPathSegmentOffsetMaxPreviousY & NumberOfEdges>(
    node: N, edgeIndex: number, otherNode: N
) {
    let onLowerSide = node.offsetElementsY <= otherNode.offsetElementsY;
    let nodeCenteringOffset = (ELEMENT_WIDTH - (((onLowerSide ? node.lowerSideEdges : node.upperSideEdges) || 0) - 1) * EDGE_SPACING) / 2;
    return {
        x: node.offsetElementsX * (ELEMENT_WIDTH + HORIZONTAL_SPACING)
            + node.borderIndexMaxX * (node.offsetElementsX * 2 + 1) * BORDER_SPACING_X
            + nodeCenteringOffset + edgeIndex * EDGE_SPACING,
        y: getY(node) + (onLowerSide ? ELEMENT_HEIGHT : 0)
    };
}

export const EdgeShape: React.FC<Edge<OffsetElementsX & OffsetElementsY &
    BorderIndexMaxX & BorderIndexTop & BorderIndexMaxTop & BorderIndexMaxPreviousTop & BorderIndexMaxPreviousBottom & BorderIndexMaxBottom &
    MidPathSegmentOffsetMaxPreviousY & NumberOfEdges,
    EdgeIndex & MidPathSegmentOffsetY & ConnectionIndex>> = edge => {
    let fromNode = edgeEndCoordinates(edge.from, edge.fromIndex, edge.to);
    let upperNodeEdgesY = getY(getUpperLeftNode(edge))
        + ELEMENT_HEIGHT
        + getUpperLeftNode(edge).borderIndexMaxBottom * BORDER_SPACING_BOTTOM
        + VERTICAL_SPACING / 2
        + edge.midPathSegmentOffsetY * EDGE_SPACING;
    let toNode = edgeEndCoordinates(edge.to, edge.toIndex, edge.from);
    return (
        <path key={edge.edgeIndex} d={
            "M " + fromNode.x + " " + fromNode.y + " " +
            "L " + fromNode.x + " " + upperNodeEdgesY + " " +
            "L " + toNode.x + " " + upperNodeEdgesY + " " +
            "L " + toNode.x + " " + toNode.y
        }
              stroke="black"
              strokeWidth={STROKE_WIDTH}
              fill="none"
        />
    );
};