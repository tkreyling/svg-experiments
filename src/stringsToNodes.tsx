import {Group, Node, Stack} from "./graphModel";

function convertStringsToNodes(element: (string | Group<string | Node, unknown>)): Node | Group<Node, unknown> {
    if (typeof element === 'string') {
        return {
            kind: 'node',
            name: element
        }
    }

    // It is necessary to go through the array by index,
    // because the array operations `every`, `map` and `flat` bypass empty array elements.
    for (let i = 0; i < element.elements.length; i++) {
        if (element.elements[i] === undefined) throw new Error("Empty array elements are not allowed.");
    }
    return {
        kind: 'group',
        name: element.name,
        elements: element.elements.map(nestedElement => {
            if (typeof nestedElement === 'string') {
                return {
                    kind: 'node',
                    name: nestedElement
                }
            } else if ("elements" in nestedElement) {
                return convertStringsToNodes(nestedElement);
            } else {
                return Object.assign(nestedElement, {
                    kind: 'node'
                });
            }
        })
    }
}

export function stringsToNodes(strings: (string | Group<string | Node, unknown>)[][]): Stack<Node, unknown> {
    return {
        kind: 'stack',
        elements: strings.map(layer => {
            return {
                kind: 'layer',
                elements: layer.map(convertStringsToNodes)
            }
        })
    };
}