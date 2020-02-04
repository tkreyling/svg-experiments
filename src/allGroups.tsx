import {Group, Node, Stack} from "./App";

export function allGroups<N extends Node, G, E>(element: Stack<N, G> | (Group<N, G> & G) | N): (Group<N, G> & G)[] {
    switch (element.kind) {
        case "stack":
            return element.elements.flatMap(layer => layer.elements).flatMap(allGroups);
        case "group":
            return [element].concat(element.elements.flatMap(allGroups));
        case "node":
            return [];
    }
}