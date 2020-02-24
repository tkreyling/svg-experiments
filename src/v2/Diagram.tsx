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
import {addBorderIndexTopG} from "./BorderIndexTop";
import {addBorderIndexBottomG} from "./BorderIndexBottom";
import {addBorderIndexMaxBottomG} from "./BorderIndexMaxBottom";
import {addBorderIndexMaxTopG} from "./BorderIndexMaxTop";

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
        .map(addBorderIndexTopG)
        .map(addBorderIndexBottomG)
        .map(addBorderIndexMaxXG)
        .map(addBorderIndexMaxTopG)
        .map(addBorderIndexMaxBottomG)
        .map(addEmbeddedBordersXG)
        .map(addEmbeddedElementsXG)
        .map(element => (
            <svg viewBox={"0 0 1000 500"}>
                {allContainers(element).filter(c => c.border).map(ContainerShape)}
                {allNodes(element).map(NodeShape)}
            </svg>
        ))[0];
};