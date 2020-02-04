import React from "react";
import {addLayerPositionToNodeG} from "./addLayerPositionToNode";
import {addXToNodeG} from "./addXToNode";
import {addLayerPositionToEdgeG} from "./addLayerPositionToEdge";
import {addYToNodeG, heightOfNodes} from "./addYToNode";
import {addConnectionIndexAndNumberOfEdgesG} from "./addConnectionIndexAndNumberOfEdges";
import {allNodes} from "./allNodes";
import {allGroups} from "./allGroups";
import {Graph, GroupShape, MARGIN_SIDE, MARGIN_TOP, Node, Path, NodeShape, width} from "./App";
import {heightOfEdges} from "./heightOfEdges";

export const Diagram: React.FC<Graph<Node, unknown, unknown>> = graph => {
    return [graph]
        .map(addLayerPositionToNodeG)
        .map(addXToNodeG)
        .map(addLayerPositionToEdgeG)
        .map(addYToNodeG)
        .map(addConnectionIndexAndNumberOfEdgesG)
        .map(graph => {
            let heightOfAllEdges = heightOfEdges(graph.edges, graph.stack.elements.length);
            let overallWidth = width(graph.stack) + 2 * MARGIN_SIDE;
            let height = heightOfNodes(graph.stack) + heightOfAllEdges.reduce((sum, add) => sum + add) + 2 * MARGIN_TOP;

            return (
                <svg viewBox={"0 0 " + overallWidth + " " + height}>
                    {allNodes(graph.stack).map(NodeShape)}
                    {allGroups(graph.stack).map(GroupShape)}
                    {graph.edges.map(Path)}
                </svg>
            );
        })[0];
};