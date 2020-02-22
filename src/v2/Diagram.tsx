import React from "react";
import {Element, Node} from "./newGraphModel";
import {NodeShape} from "./NodeShape";
import {assertNever} from "./assertNever";
import {addOffsetYElements, OffsetYElements} from "./addOffsetYElements";
import {addOffsetXElements, OffsetXElements} from "./addOffsetXElements";

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
    let element = props.element;
    addOffsetXElements(element);
    addOffsetYElements(element);
    return (
        <svg viewBox={"0 0 500 200"}>
            {allNodes(element as Element<OffsetXElements & OffsetYElements>).map(NodeShape)}
        </svg>
    )
};