import {assertNever} from "./assertNever";

type Symbols = "component"

type Shapes = "rectangle" | "db-cylinder"

export type Node = {
    kind: "node",
} & NodeProperties;

export type NodeProperties = {
    name?: string,
    visible?: boolean,
    shape?: Shapes,
    symbol?: Symbols
};

export type Row<N> = {
    kind: "row"
} & ContainerProperties<N>;

export type Column<N> = {
    kind: "column"
} & ContainerProperties<N>;

type Borders = "solid" | "deployment-box"

type ContainerProperties<N> = {
    name?: string,
    border?: Borders,
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

export function node(nameOrProperties?: string | NodeProperties): Node {
    let defaults: Node = {
        kind: "node",
        visible: true,
        shape: "rectangle"
    };
    if (!nameOrProperties) {
        return defaults;
    } else if (typeof nameOrProperties === 'string') {
        return Object.assign<Node, NodeProperties>(defaults, {name: nameOrProperties});
    } else {
        return Object.assign<Node, NodeProperties>(defaults, nameOrProperties);
    }
}

export function gap(): Node {
    return node({visible: false});
}

export function component(name: string): Node {
    return node({name: name, symbol: "component"});
}

export function db(name: string): Node {
    return node({name: name, shape: "db-cylinder"});
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