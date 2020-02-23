import React from "react";
import {Container, Element, Node} from "./newGraphModel";
import {NodeShape} from "./NodeShape";
import {assertNever} from "./assertNever";
import {addOffsetYElementsG} from "./addOffsetYElements";
import {addOffsetXElementsG} from "./addOffsetXElements";
import {addEmbeddedXBordersG} from "./addEmbeddedXBorders";
import {addEmbeddedXElementsG} from "./addEmbeddedXElements";
import {ContainerShape} from "./ContainerShape";
import {addMaxEmbeddedXBordersG} from "./addMaxEmbeddedXBorders";
import {addLeftBorderIndexG} from "./addLeftBorderIndex";

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
        .map(addOffsetXElementsG)
        .map(addOffsetYElementsG)
        .map(addLeftBorderIndexG)
        .map(addEmbeddedXBordersG)
        .map(addMaxEmbeddedXBordersG)
        .map(addEmbeddedXElementsG)
        .map(element => (
            <svg viewBox={"0 0 1000 300"}>
                {allContainers(element).filter(c => c.border).map(ContainerShape)}
                {allNodes(element).map(NodeShape)}
            </svg>
        ))[0];
};