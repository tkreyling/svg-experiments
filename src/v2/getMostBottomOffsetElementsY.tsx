import {Element} from "./newGraphModel";
import {OffsetElementsY} from "./OffsetElementsY";

export function getMostBottomOffsetElementsY(element: Element<OffsetElementsY>): number {
    switch (element.kind) {
        case "node":
            return element.offsetElementsY;
        case "row":
        case "column":
            return Math.max(...element.elements.map(getMostBottomOffsetElementsY), element.offsetElementsY);
    }
}