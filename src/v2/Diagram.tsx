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

export const Diagram: React.FC<Graph<unknown>> = graph => {
    return [graph]
        .map(addOffsetElementsXG)
        .map(addOffsetElementsYG)
        .map(addBorderIndexLeftG)
        .map(addBorderIndexRightG)
        .map(addBorderIndexTopG)
        .map(addBorderIndexBottomG)
        .map(addBorderIndexMaxXG)
        .map(addBorderIndexMaxTopG)
        .map(addBorderIndexMaxBottomG)
        .map(addEmbeddedElementsXG)
        .map(addEmbeddedElementsYG)
        .map(graph => (
            <svg viewBox={"0 0 1200 600"}>
                {allNodes(graph.element).map(NodeShape)}
                {allContainers(graph.element).filter(c => c.border).map(ContainerShape)}
            </svg>
        ))[0];
};