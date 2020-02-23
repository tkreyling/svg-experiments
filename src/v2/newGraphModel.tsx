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
