import React from "react";
import {addXToNodeG} from "./addXToNode";
import {addLayerPositionToEdgeG} from "./addLayerPositionToEdge";
import {addYToNodeG, heightOfNodes} from "./addYToNode";
import {addConnectionIndexAndNumberOfEdgesG} from "./addConnectionIndexAndNumberOfEdges";
import {allNodes} from "./allNodes";
import {allGroups} from "./allGroups";
import {heightOfEdges} from "./heightOfEdges";
import {NodeShape} from "./NodeShape";
import {GroupShape} from "./GroupShape";
import {EdgeShape} from "./EdgeShape";
import {width} from "./width";
import {MARGIN_SIDE, MARGIN_TOP, VERTICAL_SPACING} from "./styling";
import {Graph, Node} from "./graphModel";
import {addLayerIndexToNodeG} from "./addLayerIndexToNode";
import {insertPlaceholdersInMultilayerEdges} from "./insertPlaceholdersInMultilayerEdges";
import {addKeyToNodeG} from "./addKeyToNode";

export const Diagram: React.FC<Graph<Node, unknown, unknown>> = graph => {
    return [graph]
        .map(addLayerIndexToNodeG)
        .map(insertPlaceholdersInMultilayerEdges)
        .map(addKeyToNodeG)
        .map(addXToNodeG)
        .map(addLayerPositionToEdgeG)
        .map(addYToNodeG)
        .map(addConnectionIndexAndNumberOfEdgesG)
        .map(graph => {
            let heightOfAllEdges = heightOfEdges(graph.edges, graph.stack.elements.length);
            let overallWidth = width(graph.stack) + 2 * MARGIN_SIDE;
            let height = heightOfNodes(graph.stack) + VERTICAL_SPACING +
                heightOfAllEdges.reduce((sum, add) => sum + add) +
                2 * MARGIN_TOP;

            return (
                <svg viewBox={"0 0 " + overallWidth + " " + height}>
                    {allNodes(graph.stack).map(NodeShape)}
                    {allGroups(graph.stack).map(GroupShape)}
                    {graph.edges.map(EdgeShape)}
                </svg>
            );
        })[0];
};