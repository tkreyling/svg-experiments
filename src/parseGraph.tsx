import {Edge, Graph, Node} from "./graphModel";

export function parseGraph(text: string): Graph<Node, unknown, unknown> | string {
    try {
// eslint-disable-next-line
        let graph: Graph<Node, unknown, unknown> = eval(text);

        if (graph === undefined) return "Script is not returning a graph object!";

        if (graph.stack === undefined) return "Property layers is missing in graph object!";
        if (graph.edges === undefined) return "Property edges is missing in graph object!";

        if (!graph.edges.every((edge: Edge<Node>) => edge.from !== undefined))
            return "Property from must be defined on every edge!";
        if (!graph.edges.every((edge: Edge<Node>) => edge.to !== undefined))
            return "Property to must be defined on every edge!";

        return graph;
    } catch (e) {
        return e.message;
    }
}