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

export type Graph<N> = {
    element: Element<N>
}

export function graph<N>(element: Element<N>): Graph<N> {
    return {element: element};
}

export function transformElements<N, E>(graph: Graph<N>, f: (element: Element<N>) => void): Graph<N & E> {
    f(graph.element);
    return graph as Graph<N & E>;
}