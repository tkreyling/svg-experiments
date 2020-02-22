import {Element, Node} from "./newGraphModel";

export type OffsetYElements = { offsetYElements: number };


export function addOffsetYElements(element: Element<unknown>, accumulator = {offsetYElements: 0}) {
    switch (element.kind) {
        case "node": {
            Object.assign<Node, OffsetYElements>(element, {
                offsetYElements: accumulator.offsetYElements
            });
            accumulator.offsetYElements++;
            return;
        }
        case "row": {
            let maxOffsetYElements = 0;
            let oldOffsetYElements = accumulator.offsetYElements;
            element.elements.forEach(nestedElement => {
                addOffsetYElements(nestedElement, accumulator);
                maxOffsetYElements = Math.max(maxOffsetYElements, accumulator.offsetYElements);
                accumulator.offsetYElements = oldOffsetYElements;
            });
            accumulator.offsetYElements = maxOffsetYElements;
            return;
        }
        case "column": {
            element.elements.forEach(nestedElement => addOffsetYElements(nestedElement, accumulator));
            return;
        }
        default: {
            assertNever(element);
        }
    }
}

function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}