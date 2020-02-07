import {Graph, LayerIndex, Node} from "./graphModel";

export function insertPlaceholdersInMultilayerEdges(graph: Graph<Node & LayerIndex, unknown, LayerIndex>): Graph<Node & LayerIndex, unknown, LayerIndex> {
    return {
        stack: graph.stack,
        edges: graph.edges
            .flatMap(edge => {
                if (Math.abs(edge.from.layerIndex - edge.to.layerIndex) <= 1) return edge;

                let from = Math.min(edge.from.layerIndex, edge.to.layerIndex);
                let to = Math.max(edge.from.layerIndex, edge.to.layerIndex);
                let newEdges = [];
                let last = edge.from.layerIndex < edge.to.layerIndex ? edge.from : edge.to;
                let end = edge.from.layerIndex >= edge.to.layerIndex ? edge.from : edge.to;
                for (let i = from + 1; i < to; i++) {
                    let placeholder: Node & LayerIndex = {
                        kind: "node",
                        name: "",
                        size: 0.01,
                        isPlaceholder: true,
                        layerIndex: i
                    };
                    graph.stack.elements[i].elements[0].elements.splice(0, 0, placeholder);
                    newEdges.push({from: last, to: placeholder});
                    last = placeholder;
                }
                newEdges.push({from: last, to: end});
                return newEdges;
            })
    };
}