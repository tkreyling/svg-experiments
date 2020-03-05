import {assertNever} from "./assertNever";

export type Node = {
    kind: "node",
    name?: string
};

export type Row<N> = {
    kind: "row",
    name?: string,
    border?: "solid",
    elements: Element<N>[]
};

export type Column<N> = {
    kind: "column",
    name?: string,
    border?: "solid",
    elements: Element<N>[]
};

export type Container<N> = (Row<N> & N) | (Column<N> & N);

export type Element<N> = (Node & N) | (Row<N> & N) | (Column<N> & N);

export type Edge<N, E> = {
    from: N,
    to: N
} & E

export type Graph<N, E> = {
    element: Element<N>
    edges: Edge<N, E>[]
    syntheticNodes: (Node & N)[]
    syntheticEdges: Edge<N, E>[]
}

export function graph<N, E>(
    element: Element<N>,
    edges: Edge<N, E>[] = [],
    syntheticNodes: (Node & N)[] = [],
    syntheticEdges: Edge<N, E>[] = []
): Graph<N, E> {
    return {element, edges, syntheticNodes, syntheticEdges};
}

export function transformElements<N, A, E>(graph: Graph<N, E>, f: (element: Element<N>) => void): Graph<N & A, E> {
    f(graph.element);
    return graph as Graph<N & A, E>;
}

export function transformElementsUsingGraph<N, A, E>(graph: Graph<N, E>, f: (graph: Graph<N, E>) => void): Graph<N & A, E> {
    f(graph);
    return graph as Graph<N & A, E>;
}

export function node(name?: string): Node {
    return {
        kind: "node",
        name: name
    };
}

export function edge<N>(from: N, to: N): Edge<N, unknown> {
    return {
        from: from,
        to: to
    }
}

export function allNodes<N>(element: Element<N>): (Node & N)[] {
    switch (element.kind) {
        case "node":
            return [element];
        case "row":
        case "column":
            return element.elements.flatMap(allNodes);
        default: {
            assertNever(element);
        }
    }
}

export function allContainers<N>(element: Element<N>): Container<N>[] {
    switch (element.kind) {
        case "node":
            return [];
        case "row":
        case "column":
            return element.elements.flatMap(allContainers).concat(element);
        default: {
            assertNever(element);
        }
    }
}

export function allElements<N>(element: Element<N>): Element<N>[] {
    switch (element.kind) {
        case "node":
            return [element];
        case "row":
        case "column":
            return element.elements.flatMap(allElements).concat(element);
        default: {
            assertNever(element);
        }
    }
}