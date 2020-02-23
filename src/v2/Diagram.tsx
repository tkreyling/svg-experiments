import React from "react";
import {Container, Element, Node} from "./newGraphModel";
import {NodeShape} from "./NodeShape";
import {assertNever} from "./assertNever";
import {addOffsetElementsYG} from "./OffsetElementsY";
import {addOffsetElementsXG} from "./OffsetElementsX";
import {addEmbeddedBordersXG} from "./EmbeddedBordersX";
import {addEmbeddedElementsXG} from "./EmbeddedElementsX";
import {ContainerShape} from "./ContainerShape";
import {addBorderIndexMaxXG} from "./BorderIndexMaxX";
import {addBorderIndexLeftG} from "./BorderIndexLeft";
import {addBorderIndexRightG} from "./BorderIndexRight";

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

export const Diagram: React.FC<{element: Element<unknown>}> = props => {
    return [props.element]
        .map(addOffsetElementsXG)
        .map(addOffsetElementsYG)
        .map(addBorderIndexLeftG)
        .map(addBorderIndexRightG)
        .map(addEmbeddedBordersXG)
        .map(addBorderIndexMaxXG)
        .map(addEmbeddedElementsXG)
        .map(element => (
            <svg viewBox={"0 0 1000 300"}>
                {allContainers(element).filter(c => c.border).map(ContainerShape)}
                {allNodes(element).map(NodeShape)}
            </svg>
        ))[0];
};