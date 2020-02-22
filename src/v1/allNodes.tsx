import {Group, Node, Stack} from "./graphModel";

export function allNodes<N extends Node, G, E>(element: Stack<N, G> | Group<N, G> | N): N[] {
    switch (element.kind) {
        case "stack":
            return element.elements.flatMap(layer => layer.elements).flatMap(allNodes);
        case "group":
            return element.elements.flatMap(allNodes);
        case "node":
            return [element];
    }
}