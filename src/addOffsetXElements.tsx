export type Node = {
    kind: "node"
};

export type Row<N> = {
    kind: "row",
    elements: ((Node & N) | Row<N>)[]
};

export type Element<N> = (Node & N) | Row<N>;

export type OffsetXElements = { offsetXElements: number };


export function addOffsetXElements(element: Element<unknown>, accumulator = {offsetXElements: 0}) {
    switch (element.kind) {
        case "node": {
            Object.assign<Node, OffsetXElements>(element, {
                offsetXElements: accumulator.offsetXElements
            });
            accumulator.offsetXElements++;
            return;
        }
        case "row": {
            element.elements.forEach(nestedElement => addOffsetXElements(nestedElement, accumulator));
            return;
        }
    }
}