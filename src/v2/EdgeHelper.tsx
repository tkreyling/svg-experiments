import {OffsetElementsX} from "./elementsLayout/OffsetElementsX";
import {OffsetElementsY} from "./elementsLayout/OffsetElementsY";
import {Edge} from "./newGraphModel";

export function fromIsUpperLeft<N extends OffsetElementsX & OffsetElementsY, E>(edge: Edge<N, E>) {
    if (edge.from.offsetElementsY === edge.to.offsetElementsY) {
        return edge.from.offsetElementsX <= edge.to.offsetElementsX;
    }
    return edge.from.offsetElementsY < edge.to.offsetElementsY;
}

export function getUpperLeftNode<N extends OffsetElementsX & OffsetElementsY>(edge: Edge<N, unknown>): N {
    return fromIsUpperLeft(edge) ? edge.from : edge.to;
}

export function getLowerRightNode<N extends OffsetElementsX & OffsetElementsY>(edge: Edge<N, unknown>): N {
    return fromIsUpperLeft(edge) ? edge.to : edge.from;
}