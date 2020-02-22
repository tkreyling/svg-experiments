import {Group, Layer, Node, Stack} from "./graphModel";

function convertStringsToNodes(
    element: string | Node | Group<string | Node, unknown> | Layer<Node, unknown> | Stack<Node, unknown>
): Node | Group<Node, unknown> | Layer<Node, unknown> | Stack<Node, unknown> {
    if (typeof element === 'string') {
        return {
            kind: 'node',
            name: element
        }
    } else if ("elements" in element) {
        // It is necessary to go through the array by index,
        // because the array operations `every`, `map` and `flat` bypass empty array elements.
        for (let i = 0; i < element.elements.length; i++) {
            if (element.elements[i] === undefined) throw new Error("Empty array elements are not allowed.");
        }
        if ("name" in element) {
            return {
                kind: "group",
                name: element.name,
                elements: element.elements.map(convertStringsToNodes) as (Group<Node, unknown> | Node)[]
            }
        }
        switch (element.kind) {
            default:
            case "stack":  {
                return {
                    kind: element.kind,
                    elements: element.elements.map(convertStringsToNodes) as Layer<Node, unknown>[]
                }
            }
            case "layer": {
                return {
                    kind: element.kind,
                    elements: element.elements.map(convertStringsToNodes) as (Node | Group<Node, unknown> | Stack<Node, unknown>)[]
                }
            }
        }
    } else {
        return Object.assign(element, {
            kind: 'node'
        });
    }
}

export function stringsToNodes(
    strings: (string | Node | Group<string | Node, unknown> | Stack<Node, unknown>)[][]
): Stack<Node, unknown> {
    return {
        kind: 'stack',
        elements: strings.map(layer => {
            return {
                kind: 'layer',
                elements: layer.map(convertStringsToNodes) as (Node | Group<Node, unknown> | Stack<Node, unknown>)[]
            }
        })
    };
}