import React from "react";
import {
    BORDER_SPACING_BOTTOM,
    BORDER_SPACING_TOP,
    BORDER_SPACING_X, EDGE_SPACING,
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
import {BorderIndexMaxPreviousBottom} from "./elementsLayout/BorderIndexMaxBottom";
import {BorderIndexTop} from "./elementsLayout/BorderIndexTop";
import {Edge} from "./newGraphModel";
import {getUpperLeftNode} from "./EdgeHelper";
import {EdgeIndex, MidPathSegmentOffsetY} from "./edgesLayout/MidPathSegmentOffsetY";

function getY<N extends OffsetElementsY &
    BorderIndexTop & BorderIndexMaxTop & BorderIndexMaxPreviousTop & BorderIndexMaxPreviousBottom>(node: N) {
    return node.offsetElementsY * (ELEMENT_HEIGHT + VERTICAL_SPACING)
        + (node.borderIndexMaxPreviousTop + node.borderIndexMaxTop - node.borderIndexTop) * BORDER_SPACING_TOP
        + node.borderIndexMaxPreviousBottom * BORDER_SPACING_BOTTOM;
}

function edgeEndCoordinates<N extends OffsetElementsX & OffsetElementsY &
    BorderIndexMaxX & BorderIndexTop & BorderIndexMaxTop & BorderIndexMaxPreviousTop & BorderIndexMaxPreviousBottom>(
    node: N, otherNode: N
) {
    let onLowerSide = node.offsetElementsY <= otherNode.offsetElementsY;
    return {
        x: node.offsetElementsX * (ELEMENT_WIDTH + HORIZONTAL_SPACING) +
            node.borderIndexMaxX * (node.offsetElementsX * 2 + 1) * BORDER_SPACING_X +
        ELEMENT_WIDTH / 2,
        y: getY(node) + (onLowerSide ? ELEMENT_HEIGHT : 0)
    };
}

export const EdgeShape: React.FC<Edge<OffsetElementsX & OffsetElementsY &
    BorderIndexMaxX & BorderIndexTop & BorderIndexMaxTop & BorderIndexMaxPreviousTop & BorderIndexMaxPreviousBottom,
    EdgeIndex & MidPathSegmentOffsetY>> = edge => {
    let fromNode = edgeEndCoordinates(edge.from, edge.to);
    let upperNodeEdgesY = getY(getUpperLeftNode(edge)) + ELEMENT_HEIGHT + VERTICAL_SPACING / 2 + edge.midPathSegmentOffsetY * EDGE_SPACING;
    let toNode = edgeEndCoordinates(edge.to, edge.from);
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