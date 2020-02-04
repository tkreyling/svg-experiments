import React from "react";
import {
    ConnectionIndex,
    Edge,
    EDGE_SPACING,
    ELEMENT_HEIGHT,
    getUpperNode,
    LayerDimensions,
    LayerPosition,
    Node,
    NumberOfEdges,
    STROKE_WIDTH,
    VERTICAL_SPACING,
    X,
    Y
} from "./App";
import {width} from "./width";

function edgeEndCoordinates<N extends Node & LayerPosition & X & Y & NumberOfEdges>(
    node: N, edgeIndex: number, otherNode: N
) {
    let onLowerSide = node.layerIndex <= otherNode.layerIndex;
    let nodeCenteringOffset = (width(node) - ((onLowerSide ? node.lowerSideEdges : node.upperSideEdges) - 1) * EDGE_SPACING) / 2;
    return {
        x: node.x + nodeCenteringOffset + edgeIndex * EDGE_SPACING,
        y: node.y + (onLowerSide ? ELEMENT_HEIGHT : 0)
    };
}

export const EdgeShape: React.FC<Edge<Node & LayerPosition & X & Y & LayerDimensions & NumberOfEdges> & LayerPosition & ConnectionIndex> = edge => {
    let fromNode = edgeEndCoordinates(edge.from, edge.fromIndex, edge.to);
    let upperNodeEdgesY = getUpperNode(edge).belowLayerY - VERTICAL_SPACING / 2 + edge.index * EDGE_SPACING;
    let toNode = edgeEndCoordinates(edge.to, edge.toIndex, edge.from);
    return (
        <path key={edge.key} d={
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