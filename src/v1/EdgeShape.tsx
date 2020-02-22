import React from "react";
import {width} from "./width";
import {EDGE_SPACING, STROKE_WIDTH, VERTICAL_SPACING} from "../styling";
import {
    ConnectionIndex,
    Edge,
    getUpperLeftNode,
    LayerDimensions, LayerIndex,
    LayerPosition,
    Node,
    NumberOfEdges, X,
    Y
} from "./graphModel";
import {heightOfNodes} from "./addYToNode";

function edgeEndCoordinates<N extends Node & LayerIndex & X & Y & NumberOfEdges>(
    node: N, edgeIndex: number, otherNode: N
) {
    let onLowerSide = node.layerIndex <= otherNode.layerIndex;
    let nodeCenteringOffset = (width(node) - ((onLowerSide ? node.lowerSideEdges : node.upperSideEdges) - 1) * EDGE_SPACING) / 2;
    return {
        x: node.x + nodeCenteringOffset + edgeIndex * EDGE_SPACING,
        y: node.y + (onLowerSide ? heightOfNodes(node) : 0)
    };
}

export const EdgeShape: React.FC<Edge<Node & LayerIndex & X & Y & LayerDimensions & NumberOfEdges> & LayerPosition & ConnectionIndex> = edge => {
    let fromNode = edgeEndCoordinates(edge.from, edge.fromIndex, edge.to);
    let upperNodeEdgesY = getUpperLeftNode(edge).belowLayerY - VERTICAL_SPACING / 2 + edge.index * EDGE_SPACING;
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