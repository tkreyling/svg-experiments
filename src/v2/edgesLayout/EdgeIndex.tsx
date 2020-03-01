import {Edge, Graph} from "../newGraphModel";

export type EdgeIndex = {
    edgeIndex: number
}

export function addEdgeIndexG<N, E>(graph: Graph<N, E>):
    Graph<N, E & EdgeIndex> {
    addEdgeIndex(graph.edges);
    return graph as unknown as Graph<N, E & EdgeIndex>;
}

export function addEdgeIndex(edges: Edge<unknown, unknown>[]) {
    edges.forEach((edge, index) => {
        Object.assign<Edge<unknown, unknown>, EdgeIndex>(
            edge, {edgeIndex: index});
    });
}