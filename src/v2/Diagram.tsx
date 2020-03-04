import React from "react";
import {Container, Element, Graph, Node} from "./newGraphModel";
import {NodeShape} from "./NodeShape";
import {assertNever} from "./assertNever";
import {addOffsetElementsYG} from "./elementsLayout/OffsetElementsY";
import {addOffsetElementsXG} from "./elementsLayout/OffsetElementsX";
import {addEmbeddedElementsXG} from "./elementsLayout/EmbeddedElementsX";
import {ContainerShape} from "./ContainerShape";
import {addBorderIndexMaxXG} from "./elementsLayout/BorderIndexMaxX";
import {addBorderIndexLeftG} from "./elementsLayout/BorderIndexLeft";
import {addBorderIndexRightG} from "./elementsLayout/BorderIndexRight";
import {addBorderIndexTopG} from "./elementsLayout/BorderIndexTop";
import {addBorderIndexBottomG} from "./elementsLayout/BorderIndexBottom";
import {addBorderIndexMaxBottomG} from "./elementsLayout/BorderIndexMaxBottom";
import {addBorderIndexMaxTopG} from "./elementsLayout/BorderIndexMaxTop";
import {addEmbeddedElementsYG} from "./elementsLayout/EmbeddedElementsY";
import {EdgeShape} from "./EdgeShape";
import {addMidPathSegmentOffsetYG} from "./edgesLayout/MidPathSegmentOffsetY";
import {addElementKeyG} from "./elementsLayout/ElementKey";
import {addMidPathSegmentOffsetYAggregatesG} from "./edgesLayout/MidPathSegmentOffsetYAggregates";
import {addConnectionIndexAndNumberOfEdgesG} from "./edgesLayout/ConnectionIndexAndNumberOfEdges";
import {addEdgeIndexG} from "./edgesLayout/EdgeIndex";
import {addSyntheticNodesAndEdgesG} from "./edgesLayout/SyntheticNodesAndEdges";
import {addCrossLayerPathSegmentOffsetXG} from "./edgesLayout/CrossLayerPathSegmentOffsetX";

function allNodes<N>(element: Element<N>): (Node & N)[] {
    switch (element.kind) {
        case "node": return [element];
        case "row": return element.elements.flatMap(allNodes);
        case "column": return element.elements.flatMap(allNodes);
        default: {
            assertNever(element);
        }
    }
}

function allContainers<N>(element: Element<N>): Container<N>[] {
    switch (element.kind) {
        case "node": return [];
        case "row": return element.elements.flatMap(allContainers).concat(element);
        case "column": return element.elements.flatMap(allContainers).concat(element);
        default: {
            assertNever(element);
        }
    }
}

type DiagramProps = { graph: Graph<unknown, unknown> }

export const Diagram: React.FC<DiagramProps> = props => {
    return [props.graph]
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
        .map(graph => {
            console.log(graph.edges);
            console.log(graph.syntheticEdges);
            return (
                <svg viewBox={"0 0 1600 800"}>
                    {allNodes(graph.element).map(NodeShape)}
                    {allContainers(graph.element).filter(c => c.border).map(ContainerShape)}
                    {graph.edges.map(EdgeShape)}
                </svg>
            );
        })[0];
};