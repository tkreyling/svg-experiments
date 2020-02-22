export type Node = {
    kind: "node"
};
export type Row<N> = {
    kind: "row",
    elements: Element<N>[]
};
export type Column<N> = {
    kind: "column",
    elements: Element<N>[]
};
export type Element<N> = (Node & N) | Row<N> | Column<N>;