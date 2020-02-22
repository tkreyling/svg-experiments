import React from "react";
import {Element, Node} from "./newGraphModel";
import {NodeShape} from "./NodeShape";
import {assertNever} from "./assertNever";
import {addOffsetYElementsG} from "./addOffsetYElements";
import {addOffsetXElementsG} from "./addOffsetXElements";
import {addOffsetXBordersG} from "./addOffsetXBorders";
import {addEmbeddedXBordersG} from "./addEmbeddedXBorders";
import {addEmbeddedXElementsG} from "./addEmbeddedXElements";

function allNodes<T>(element: Element<T>): (Node & T)[] {
    switch (element.kind) {
        case "node": return [element];
        case "row": return element.elements.flatMap(allNodes);
        case "column": return element.elements.flatMap(allNodes);
        default: {
            assertNever(element);
        }
    }
}

export const Diagram: React.FC<{element: Element<unknown>}> = props => {
    return [props.element]
        .map(addOffsetXElementsG)
        .map(addOffsetYElementsG)
        .map(addOffsetXBordersG)
        .map(addEmbeddedXBordersG)
        .map(addEmbeddedXElementsG)
        .map(element => (
            <svg viewBox={"0 0 1000 300"}>
                {allNodes(element).map(NodeShape)}
            </svg>
        ))[0];
};