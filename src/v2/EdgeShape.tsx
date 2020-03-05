import React from "react";
import {
    BORDER_SPACING_BOTTOM,
    BORDER_SPACING_TOP,
    BORDER_SPACING_X,
    EDGE_SPACING,
    ELEMENT_HEIGHT,
    ELEMENT_WIDTH,
    MARGIN_Y,
    STROKE_WIDTH,
    VERTICAL_SPACING
} from "./styling";
import {OffsetElementsY} from "./elementsLayout/OffsetElementsY";
import {OffsetElementsX} from "./elementsLayout/OffsetElementsX";
import {BorderIndexMaxX} from "./elementsLayout/BorderIndexMaxX";
import {BorderIndexMaxPreviousTop, BorderIndexMaxTop} from "./elementsLayout/BorderIndexMaxTop";
import {BorderIndexMaxBottom, BorderIndexMaxPreviousBottom} from "./elementsLayout/BorderIndexMaxBottom";
import {Edge} from "./newGraphModel";
import {getLeftUpperNode, getUpperLeftNode} from "./EdgeHelper";
import {MidPathSegmentOffsetY} from "./edgesLayout/MidPathSegmentOffsetY";
import {MidPathSegmentOffsetMaxPreviousY} from "./edgesLayout/MidPathSegmentOffsetYAggregates";
import {ConnectionIndex, NumberOfEdges} from "./edgesLayout/ConnectionIndexAndNumberOfEdges";
import {EdgeIndex} from "./edgesLayout/EdgeIndex";
import {IsLowerLayerEdge, LowerLayerEdge, OriginalEdge} from "./edgesLayout/SyntheticNodesAndEdges";
import {CrossLayerPathSegmentOffsetX} from "./edgesLayout/CrossLayerPathSegmentOffsetX";
import {CrossLayerPathSegmentOffsetMaxX} from "./edgesLayout/CrossLayerPathSegmentOffsetMaxX";
import {getElementLeftX} from "./getElementLeftX";
import {BorderIndexLeft} from "./elementsLayout/BorderIndexLeft";

function getY<N extends OffsetElementsY &
    BorderIndexMaxTop & BorderIndexMaxPreviousTop & BorderIndexMaxPreviousBottom &
    MidPathSegmentOffsetMaxPreviousY>(node: N) {
    return MARGIN_Y
        + node.offsetElementsY * (ELEMENT_HEIGHT + VERTICAL_SPACING)
        + (node.borderIndexMaxPreviousTop + node.borderIndexMaxTop) * BORDER_SPACING_TOP
        + node.borderIndexMaxPreviousBottom * BORDER_SPACING_BOTTOM
        + node.midPathSegmentOffsetMaxPreviousY * EDGE_SPACING;
}

function edgeEndCoordinates<N extends OffsetElementsX & OffsetElementsY &
    CrossLayerPathSegmentOffsetMaxX &
    BorderIndexLeft & BorderIndexMaxX &
    BorderIndexMaxTop & BorderIndexMaxPreviousTop & BorderIndexMaxPreviousBottom &
    MidPathSegmentOffsetMaxPreviousY & NumberOfEdges>(
    node: N, edgeIndex: number, otherNode: N
) {
    let onLowerSide = node.offsetElementsY <= otherNode.offsetElementsY;
    let nodeCenteringOffset = (ELEMENT_WIDTH - (((onLowerSide ? node.lowerSideEdges : node.upperSideEdges) || 0) - 1) * EDGE_SPACING) / 2;
    return {
        x: getElementLeftX(node) + nodeCenteringOffset + edgeIndex * EDGE_SPACING,
        y: getY(node) + (onLowerSide ? ELEMENT_HEIGHT : 0)
    };
}

export const EdgeShape: React.FC<Edge<OffsetElementsX & OffsetElementsY &
    CrossLayerPathSegmentOffsetMaxX &
    BorderIndexLeft & BorderIndexMaxX &
    BorderIndexMaxTop & BorderIndexMaxPreviousTop & BorderIndexMaxBottom & BorderIndexMaxPreviousBottom &
    MidPathSegmentOffsetMaxPreviousY & NumberOfEdges,
    LowerLayerEdge<any, unknown> & EdgeIndex & MidPathSegmentOffsetY & ConnectionIndex & CrossLayerPathSegmentOffsetX>> = edge => {
    let fromNode = edgeEndCoordinates(edge.from, edge.fromIndex, edge.to);
    let upperNodeEdgesY = getY(getUpperLeftNode(edge))
        + ELEMENT_HEIGHT
        + getUpperLeftNode(edge).borderIndexMaxBottom * BORDER_SPACING_BOTTOM
        + VERTICAL_SPACING / 2
        + edge.midPathSegmentOffsetY * EDGE_SPACING;
    let toNode = edgeEndCoordinates(edge.to, edge.toIndex, edge.from);
    if (!edge.lowerLayerEdge) {
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
    } else {
        let lowerLayerEdge = edge.lowerLayerEdge as Edge<unknown, MidPathSegmentOffsetY> & IsLowerLayerEdge & OriginalEdge<unknown, unknown>;
        let lowerNodeEdgesY = getY(getUpperLeftNode(edge.lowerLayerEdge))
            + ELEMENT_HEIGHT
            + getUpperLeftNode(edge.lowerLayerEdge).borderIndexMaxBottom * BORDER_SPACING_BOTTOM
            + VERTICAL_SPACING / 2
            + lowerLayerEdge.midPathSegmentOffsetY * EDGE_SPACING;
        let besideTopNodeX = getElementLeftX(getLeftUpperNode(edge))
            + ELEMENT_WIDTH + getUpperLeftNode(edge).borderIndexMaxX * BORDER_SPACING_X
            + (edge.crossLayerPathSegmentOffsetX! + 1) * EDGE_SPACING;
        return (
            <path key={edge.edgeIndex} d={
                "M " + fromNode.x + " " + fromNode.y + " " +
                "L " + fromNode.x + " " + upperNodeEdgesY + " " +
                "L " + besideTopNodeX + " " + upperNodeEdgesY + " " +
                "L " + besideTopNodeX + " " + lowerNodeEdgesY + " " +
                "L " + toNode.x + " " + lowerNodeEdgesY + " " +
                "L " + toNode.x + " " + toNode.y
            }
                  stroke="black"
                  strokeWidth={STROKE_WIDTH}
                  fill="none"
            />
        );
    }
};