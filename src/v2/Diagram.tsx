import React, {useState} from "react";
import {allContainers, allNodes, Element, graph, Graph, Node} from "./newGraphModel";
import {NodeShape} from "./shapes/NodeShape";
import {assertNever} from "./assertNever";
import {addOffsetElementsYG, OffsetElementsY} from "./elementsLayout/OffsetElementsY";
import {addOffsetElementsXG, OffsetElementsX} from "./elementsLayout/OffsetElementsX";
import {addEmbeddedElementsXG} from "./elementsLayout/EmbeddedElementsX";
import {ContainerShape} from "./shapes/ContainerShape";
import {addBorderIndexMaxXG, BorderIndexMaxX} from "./elementsLayout/BorderIndexMaxX";
import {addBorderIndexLeftG} from "./elementsLayout/BorderIndexLeft";
import {addBorderIndexRightG} from "./elementsLayout/BorderIndexRight";
import {addBorderIndexTopG} from "./elementsLayout/BorderIndexTop";
import {addBorderIndexBottomG} from "./elementsLayout/BorderIndexBottom";
import {
    addBorderIndexMaxBottomG,
    BorderIndexMaxBottom,
    BorderIndexMaxPreviousBottom
} from "./elementsLayout/BorderIndexMaxBottom";
import {addBorderIndexMaxTopG, BorderIndexMaxPreviousTop, BorderIndexMaxTop} from "./elementsLayout/BorderIndexMaxTop";
import {addEmbeddedElementsYG} from "./elementsLayout/EmbeddedElementsY";
import {EdgeShape} from "./shapes/EdgeShape";
import {addMidPathSegmentOffsetYG} from "./edgesLayout/MidPathSegmentOffsetY";
import {addElementKeyG} from "./elementsLayout/ElementKey";
import {
    addMidPathSegmentOffsetYAggregatesG,
    MidPathSegmentOffsetMaxPreviousY,
    MidPathSegmentOffsetMaxY
} from "./edgesLayout/MidPathSegmentOffsetYAggregates";
import {addConnectionIndexAndNumberOfEdgesG} from "./edgesLayout/ConnectionIndexAndNumberOfEdges";
import {addEdgeIndexG} from "./edgesLayout/EdgeIndex";
import {addSyntheticNodesAndEdgesG} from "./edgesLayout/SyntheticNodesAndEdges";
import {addCrossLayerPathSegmentOffsetXG} from "./edgesLayout/CrossLayerPathSegmentOffsetX";
import {
    addCrossLayerPathSegmentOffsetMaxXG,
    CrossLayerPathSegmentOffsetMaxX
} from "./edgesLayout/CrossLayerPathSegmentOffsetMaxX";
import {
    BORDER_SPACING_BOTTOM,
    BORDER_SPACING_TOP,
    BORDER_SPACING_X,
    EDGE_SPACING,
    ELEMENT_HEIGHT,
    ELEMENT_WIDTH,
    HORIZONTAL_SPACING,
    MARGIN_X,
    MARGIN_Y,
    VERTICAL_SPACING
} from "./styling";

function width(element: Element<OffsetElementsX & BorderIndexMaxX & CrossLayerPathSegmentOffsetMaxX>): number {
    switch (element.kind) {
        case "node": return MARGIN_X * 2
            + element.offsetElementsX * HORIZONTAL_SPACING
            + (element.offsetElementsX + 1) * ELEMENT_WIDTH
            + element.borderIndexMaxX * (element.offsetElementsX + 1) * 2 * BORDER_SPACING_X
            + element.crossLayerPathSegmentOffsetMaxX * (element.offsetElementsX + 1) * EDGE_SPACING;
        case "row":
        case "column": return Math.max(...element.elements.map(width), 0);
        default: {
            assertNever(element);
        }
    }
}

function height(element: Element<OffsetElementsY &
    BorderIndexMaxTop & BorderIndexMaxPreviousTop &
    BorderIndexMaxBottom & BorderIndexMaxPreviousBottom &
    MidPathSegmentOffsetMaxY & MidPathSegmentOffsetMaxPreviousY>): number {
    switch (element.kind) {
        case "node": return MARGIN_Y * 2
            + (element.offsetElementsY + 1) * VERTICAL_SPACING
            + (element.offsetElementsY + 1) * ELEMENT_HEIGHT
            + (element.borderIndexMaxPreviousTop + element.borderIndexMaxTop) * BORDER_SPACING_TOP
            + (element.borderIndexMaxPreviousBottom + element.borderIndexMaxBottom) * BORDER_SPACING_BOTTOM
            + (element.midPathSegmentOffsetMaxPreviousY + element.midPathSegmentOffsetMaxY) * EDGE_SPACING;
        case "row":
        case "column": return Math.max(...element.elements.map(height), 0);
        default: {
            assertNever(element);
        }
    }
}

type DiagramProps = {
    initialGraph: Graph<unknown, unknown>
}

export const Diagram: React.FC<DiagramProps> = props => {

    const [graphState, setGraph] = useState(props.initialGraph);

    function onNodeClick(node: Node) {
        node.selected = !node.selected;
        setGraph(oldGraph => {
            oldGraph.edges
                .filter(edge => edge.from === node || edge.to === node)
                .forEach(edge => edge.selected = !edge.selected);

            return graph(oldGraph.element, oldGraph.edges, oldGraph.syntheticNodes, oldGraph.syntheticEdges)
        });
    }

    return [graphState]
        .map(addElementKeyG)
        .map(addOffsetElementsXG)
        .map(addOffsetElementsYG)
        .map(addSyntheticNodesAndEdgesG)
        .map(addBorderIndexLeftG)
        .map(addBorderIndexRightG)
        .map(addBorderIndexTopG)
        .map(addBorderIndexBottomG)
        .map(addBorderIndexMaxXG)
        .map(addBorderIndexMaxTopG)
        .map(addBorderIndexMaxBottomG)
        .map(addEmbeddedElementsXG)
        .map(addEmbeddedElementsYG)
        .map(addEdgeIndexG)
        .map(addConnectionIndexAndNumberOfEdgesG)
        .map(addMidPathSegmentOffsetYG)
        .map(addMidPathSegmentOffsetYAggregatesG)
        .map(addCrossLayerPathSegmentOffsetXG)
        .map(addCrossLayerPathSegmentOffsetMaxXG)
        .map(graph => {
            return (
                <svg viewBox={"0 0 " + width(graph.element) + " " + height(graph.element)}>
                    {allContainers(graph.element).filter(c => c.border).map(ContainerShape)}
                    {allNodes(graph.element).map(node => (<NodeShape key={node.elementKey+"O"} node={node} onNodeClick={onNodeClick}/>))}
                    {graph.edges.map(EdgeShape)}
                </svg>
            );
        })[0];
};