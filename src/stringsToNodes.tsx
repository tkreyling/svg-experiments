import {Group, Node, Stack} from "./App";

function convertStringsToNodes(group: Group<string | Node, unknown>): Group<Node, unknown> {
    // It is necessary to go through the array by index,
    // because the array operations `every`, `map` and `flat` bypass empty array elements.
    for (let i = 0; i < group.elements.length; i++) {
        if (group.elements[i] === undefined) throw new Error("Empty array elements are not allowed.");
    }
    return {
        kind: 'group',
        name: group.name,
        elements: group.elements.map(element => {
            if (typeof element === 'string') {
                return {
                    kind: 'node',
                    name: element
                }
            } else if ("elements" in element) {
                return convertStringsToNodes(element);
            } else {
                return Object.assign(element, {
                    kind: 'node'
                });
            }
        })
    }
}

export function stringsToNodes(strings: Group<string | Node, unknown>[][]): Stack<Node, unknown> {
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