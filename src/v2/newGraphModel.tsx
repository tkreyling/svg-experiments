export type Node = {
    kind: "node"
};

export type Row<N> = {
    kind: "row",
    border?: "solid",
    elements: Element<N>[]
};

export type Column<N> = {
    kind: "column",
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
}

export function graph<N, E>(element: Element<N>, edges: Edge<N, E>[] = []): Graph<N, E> {
    return {element: element, edges: edges};
}

export function transformElements<N, A, E>(graph: Graph<N, E>, f: (element: Element<N>) => void): Graph<N & A, E> {
    f(graph.element);
    return graph as Graph<N & A, E>;
}

export function node(): Node {
    return {
        kind: "node"
    };
}

export function edge<N>(from: N, to: N): Edge<N, unknown> {
    return {
        from: from,
        to: to
    }
}