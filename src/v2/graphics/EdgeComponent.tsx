import React from "react";
import {
    ARROW_HEIGHT,
    ARROW_WIDTH,
    BORDER_SPACING_BOTTOM,
    BORDER_SPACING_X,
    EDGE_SPACING,
    ELEMENT_HEIGHT,
    ELEMENT_WIDTH,
    STROKE_WIDTH, STROKE_WIDTH_SELECTED,
    VERTICAL_SPACING
} from "../styling";
import {BorderIndexMaxBottom} from "../elementsLayout/BorderIndexMaxBottom";
import {Edge} from "../newGraphModel";
import {getLeftUpperNode, getUpperLeftNode} from "../EdgeHelper";
import {MidPathSegmentOffsetY} from "../edgesLayout/MidPathSegmentOffsetY";
import {ConnectionIndex, NumberOfEdges} from "../edgesLayout/ConnectionIndexAndNumberOfEdges";
import {EdgeIndex} from "../edgesLayout/EdgeIndex";
import {IsLowerLayerEdge, LowerLayerEdge, OriginalEdge} from "../edgesLayout/SyntheticNodesAndEdges";
import {CrossLayerPathSegmentOffsetX} from "../edgesLayout/CrossLayerPathSegmentOffsetX";
import {getElementLeftX, RequiredNodeDataGetElementLeftX} from "./getElementLeftX";
import {getElementTopY, RequiredNodeDataGetElementTopY} from "./getElementTopY";

function edgeEndCoordinates<N extends RequiredNodeDataGetElementLeftX &
    RequiredNodeDataGetElementTopY & NumberOfEdges>(
    node: N, edgeIndex: number, otherNode: N
) {
    let onLowerSide = node.offsetElementsY <= otherNode.offsetElementsY;
    let nodeCenteringOffset = (ELEMENT_WIDTH - (((onLowerSide ? node.lowerSideEdges : node.upperSideEdges) || 0) - 1) * EDGE_SPACING) / 2;
    return {
        x: getElementLeftX(node) + nodeCenteringOffset + edgeIndex * EDGE_SPACING,
        y: getElementTopY(node) + (onLowerSide ? ELEMENT_HEIGHT : 0)
    };
}

export const EdgeComponent: React.FC<Edge<RequiredNodeDataGetElementLeftX &
    RequiredNodeDataGetElementTopY &
    BorderIndexMaxBottom &
    NumberOfEdges,
    LowerLayerEdge<any, unknown> & EdgeIndex & MidPathSegmentOffsetY & ConnectionIndex & CrossLayerPathSegmentOffsetX>> = edge => {
    let fromNode = edgeEndCoordinates(edge.from, edge.fromIndex, edge.to);
    let upperNodeEdgesY = getElementTopY(getUpperLeftNode(edge))
        + ELEMENT_HEIGHT
        + getUpperLeftNode(edge).borderIndexMaxBottom * BORDER_SPACING_BOTTOM
        + VERTICAL_SPACING / 2
        + edge.midPathSegmentOffsetY * EDGE_SPACING;
    let toNode = edgeEndCoordinates(edge.to, edge.toIndex, edge.from);

    let strokeWidth = edge.selected ? STROKE_WIDTH_SELECTED: STROKE_WIDTH;

    let onLowerSide = edge.to.offsetElementsY <= edge.from.offsetElementsY;
    let arrow = (
        <path d={
            "M " + (toNode.x + ARROW_WIDTH) + " " + (toNode.y + ARROW_HEIGHT * (onLowerSide ? 1 : -1)) + " " +
            "L " + toNode.x + " " + toNode.y + " " +
            "L " + (toNode.x - ARROW_WIDTH) + " " + (toNode.y + ARROW_HEIGHT * (onLowerSide ? 1 : -1))
        }
              stroke="black"
              strokeWidth={strokeWidth}
              fill="none"
        />
    );

    if (!edge.lowerLayerEdge) {
        return (
            <g key={edge.edgeIndex}>
                <path d={
                    "M " + fromNode.x + " " + fromNode.y + " " +
                    "V " + upperNodeEdgesY + " " +
                    "H " + toNode.x + " " +
                    "V " + toNode.y
                }
                      stroke="black"
                      strokeWidth={strokeWidth}
                      fill="none"
                />
                {arrow}
            </g>
        );
    } else {
        let lowerLayerEdge = edge.lowerLayerEdge as Edge<unknown, MidPathSegmentOffsetY> & IsLowerLayerEdge & OriginalEdge<unknown, unknown>;
        let lowerNodeEdgesY = getElementTopY(getUpperLeftNode(edge.lowerLayerEdge))
            + ELEMENT_HEIGHT
            + getUpperLeftNode(edge.lowerLayerEdge).borderIndexMaxBottom * BORDER_SPACING_BOTTOM
            + VERTICAL_SPACING / 2
            + lowerLayerEdge.midPathSegmentOffsetY * EDGE_SPACING;
        let besideTopNodeX = getElementLeftX(getLeftUpperNode(edge))
            + ELEMENT_WIDTH + getUpperLeftNode(edge).borderIndexMaxX * BORDER_SPACING_X
            + (edge.crossLayerPathSegmentOffsetX! + 1) * EDGE_SPACING;
        return (
            <g key={edge.edgeIndex}>
                <path d={
                    "M " + fromNode.x + " " + fromNode.y + " " +
                    "V " + upperNodeEdgesY + " " +
                    "H " + besideTopNodeX + " " +
                    "V " + lowerNodeEdgesY + " " +
                    "H " + toNode.x + " " +
                    "V " + toNode.y
                }
                      stroke="black"
                      strokeWidth={strokeWidth}
                      fill="none"
                />
                {arrow}
            </g>
        );
    }
};