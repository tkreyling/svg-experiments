import React from 'react';
import './App.css';

export type Coordinates = {
    x: number
    y: number
}

export type LayerPosition = {
    key: string
    index: number
    relativePosition: number
    layerIndex: number
}

export type Node = {
    name: string
}

export type Edge<T> = {
    from: T
    to: T
}

type ConnectionIndex = {
    fromIndex: number
    toIndex: number
}

type NumberOfEdges = {
    upperSideEdges: number
    lowerSideEdges: number
}

type Graph<N, E> = {
    layers: N[][]
    edges: (Edge<N> & E)[]
}

export const MARGIN_TOP = 5;
export const MARGIN_SIDE = 5;
export const ELEMENT_WIDTH = 150;
export const ELEMENT_HEIGHT = 40;
export const HORIZONTAL_SPACING = 10;
export const VERTICAL_SPACING = 20;
export const TEXT_PADDING = 5;
export const EDGE_SPACING = 10;

export function widthOfLayers(layers: any[][]) {
    return Math.max(...layers.map(widthOfElements));
}

export function widthOfElements(elements: any[]) {
    const n = elements.length;
    if (n === 0) return 0;
    return n*ELEMENT_WIDTH + (n - 1)*HORIZONTAL_SPACING;
}

function heightOfNodes(layers: Node[][]) {
    let n = layers.length;
    return n*ELEMENT_HEIGHT + n*VERTICAL_SPACING;
}

function fromIsUpper<T extends LayerPosition>(edge: Edge<T>) {
    if (edge.from.layerIndex === edge.to.layerIndex) {
        return edge.from.index <= edge.to.index;
    }
    return edge.from.layerIndex < edge.to.layerIndex;
}

function getUpperNode<T extends LayerPosition>(edge: Edge<T>): T {
    return fromIsUpper(edge) ? edge.from : edge.to;
}

function getLowerNode<T extends LayerPosition>(edge: Edge<T>): T {
    return fromIsUpper(edge) ? edge.to : edge.from;
}

export function heightOfEdges(edges: (Edge<LayerPosition> & LayerPosition)[], numberOfLayers: number): number[] {
    let groupedByLayerIndex = new Map<number, (Edge<LayerPosition> & LayerPosition)[]>();
    edges.forEach(edge => {
        let layerIndex = getUpperNode(edge).layerIndex;
        let grouped = groupedByLayerIndex.get(layerIndex) || [];
        grouped.push(edge);
        groupedByLayerIndex.set(layerIndex, grouped);
    });
    let layerIndices = Array.from(Array(numberOfLayers).keys());
    return layerIndices.map(layerIndex => {
        let edgeIndices = groupedByLayerIndex.get(layerIndex)?.map(edge => edge.index) || [0];
        return Math.max(...edgeIndices) * EDGE_SPACING;
    })
}

function addLayerPositionToNodeG<N, E>(graph: Graph<N, E>): Graph<N & LayerPosition, E> {
    return {
        layers: addLayerPositionToNode(graph.layers),
        edges: graph.edges as unknown as (Edge<N & LayerPosition> & E)[]
    }
}

export function addLayerPositionToNode<N>(layers: N[][]): (N & LayerPosition)[][] {
    let fullWidth = Math.max(...layers.map(nodes => nodes.length));
    return layers.map((elements, layerIndex) => {
        let width = elements.length;
        let layerOffset = (fullWidth - width) / 2;
        return elements.map((element, index) => {
            return Object.assign(element, {
                key: layerIndex + "_" + index,
                index: index,
                relativePosition : layerOffset + index,
                layerIndex: layerIndex
            });
        });
    });
}

function layoutG<N extends LayerPosition, E>(graph: Graph<N, E>, heightOfEdges: number[]): Graph<N & Coordinates, E> {
    return {
        layers: layout(graph.layers, heightOfEdges),
        edges: graph.edges as unknown as (Edge<N & Coordinates> & E)[]
    }
}

export function layout<N>(layers: (N & LayerPosition)[][], heightOfEdges: number[]): (N & LayerPosition & Coordinates)[][] {
    let fullWidth = widthOfLayers(layers);
    return layers.map((elements, layerIndex) => {
        let additionalEdgeHeight = heightOfEdges.slice(0, layerIndex).reduce((sum, add) => sum + add, 0);
        return layoutHorizontally(elements, fullWidth, additionalEdgeHeight)
    });
}

export function layoutHorizontally<N>(elements: (N & LayerPosition)[], fullWidth: number, additionalEdgeHeight: number): (N & LayerPosition & Coordinates)[] {
    let offsetToCenter = (fullWidth - widthOfElements(elements)) / 2;
    return elements.map(element =>
        Object.assign(element, {
            x: element.index * (ELEMENT_WIDTH + HORIZONTAL_SPACING) + MARGIN_SIDE + offsetToCenter,
            y: element.layerIndex * (ELEMENT_HEIGHT + VERTICAL_SPACING) + MARGIN_TOP + additionalEdgeHeight
        }));
}

function addLayerPositionToEdgeG<N extends LayerPosition, E>(graph: Graph<N, E>): Graph<N, E & LayerPosition> {
    addLayerPositionToEdge(graph.edges);
    return {
        layers: graph.layers,
        edges: graph.edges as unknown as (Edge<N> & E & LayerPosition)[]
    }
}

export function addLayerPositionToEdge(edges: Edge<LayerPosition>[]) {
    let groupedByLayerIndex = new Map<number, Edge<LayerPosition>[]>();

    edges.forEach(edge => {
        let key = getUpperNode(edge).layerIndex;
        let edges = groupedByLayerIndex.get(key) || [];
        edges.push(edge);
        groupedByLayerIndex.set(key, edges);
    });

    Array.from(groupedByLayerIndex.values()).forEach(addLayerPositionToEdgeForLayer);
}

function addLayerPositionToEdgeForLayer(edges: Edge<LayerPosition>[]) {
    let groupedByUpperNode = new Map<string, Edge<LayerPosition>[]>();

    edges.forEach(edge => {
        let key = getUpperNode(edge).key;
        let edges = groupedByUpperNode.get(key) || [];
        edges.push(edge);
        groupedByUpperNode.set(key, edges);
    });

    let nodeKeys = Array.from(groupedByUpperNode.keys());
    nodeKeys.sort();

    let indexOffset = 0;
    nodeKeys.forEach(nodeKey => {
        let edges = groupedByUpperNode.get(nodeKey)!;

        let sameLayer = edges.filter(edge => getLowerNode(edge).layerIndex === getUpperNode(edge).layerIndex);
        let sameLayerBefore = sameLayer.filter(edge => getLowerNode(edge).index <= getUpperNode(edge).index);
        let sameLayerAfter = sameLayer.filter(edge => getLowerNode(edge).index > getUpperNode(edge).index);
        let otherLayer = edges.filter(edge => getLowerNode(edge).layerIndex !== getUpperNode(edge).layerIndex);
        let otherLayerBefore = otherLayer.filter(edge => getLowerNode(edge).relativePosition <= getUpperNode(edge).relativePosition);
        let otherLayerAfter = otherLayer.filter(edge => getLowerNode(edge).relativePosition > getUpperNode(edge).relativePosition);

        sameLayerBefore.sort((edge1, edge2) =>  getLowerNode(edge1).index - getLowerNode(edge2).index);
        otherLayerBefore.sort((edge1, edge2) =>  getLowerNode(edge1).index - getLowerNode(edge2).index);
        otherLayerAfter.sort((edge1, edge2) =>  getLowerNode(edge2).index - getLowerNode(edge1).index);
        sameLayerAfter.sort((edge1, edge2) =>  getLowerNode(edge1).index - getLowerNode(edge2).index);

        let before = sameLayerBefore.concat(otherLayerBefore);
        let after = sameLayerAfter.concat(otherLayerAfter);

        function addLayerPosition(edge: Edge<LayerPosition>, indexInArray: number) {
            let layerIndex = getUpperNode(edge).layerIndex;
            let index = indexOffset + indexInArray;
            Object.assign(edge, {
                key: layerIndex + "_" + index,
                index: index,
                layerIndex: layerIndex
            });
        }

        before.forEach((edge, index) => addLayerPosition(edge, index));
        after.forEach((edge, index) => addLayerPosition(edge, index));

        indexOffset += Math.max(before.length, after.length);
    });
}

function addConnectionIndexAndNumberOfEdgesG<N extends LayerPosition, E>(graph: Graph<N, E>):
    Graph<N & NumberOfEdges, E & ConnectionIndex> {
    addConnectionIndexAndNumberOfEdges(graph.edges);
    return {
        layers: graph.layers as unknown as (N & NumberOfEdges)[][],
        edges: graph.edges as unknown as (Edge<N & NumberOfEdges> & E & ConnectionIndex)[]
    }
}

export function addConnectionIndexAndNumberOfEdges(edges: Edge<LayerPosition>[]) {
    type NodeSide = {
        node: LayerPosition
        side: "LOWER" | "UPPER"
        edgeEnds: EdgeEnd[]
    }

    type EdgeEnd = {
        reverseNode: LayerPosition
        setIndex: (index: number) => void
    }

    let groupedByNodeAndSide = new Map<string, NodeSide>();

    function addEdgeEnd(firstNode: LayerPosition, secondNode: LayerPosition, setIndex: (index: number) => void) {
        let side: "LOWER" | "UPPER" = firstNode.layerIndex <= secondNode.layerIndex ? "LOWER" : "UPPER";
        let key = firstNode.key + side;
        let nodeSide: NodeSide = groupedByNodeAndSide.get(key) || {
            node: firstNode,
            side: side,
            edgeEnds: []
        };
        nodeSide.edgeEnds.push({
            reverseNode: secondNode,
            setIndex: setIndex
        });
        groupedByNodeAndSide.set(key, nodeSide);
    }

    edges.forEach(edge => {
        addEdgeEnd(edge.from, edge.to, index => Object.assign(edge, {fromIndex: index}));
        addEdgeEnd(edge.to, edge.from, index=> Object.assign(edge, {toIndex: index}));
    });

    Array.from(groupedByNodeAndSide.values()).forEach(({edgeEnds, node, side}) => {
        let sameLayer = edgeEnds.filter(edgeEnd => edgeEnd.reverseNode.layerIndex === node.layerIndex);
        let before = sameLayer.filter(edgeEnd => edgeEnd.reverseNode.index <= node.index);
        let after = sameLayer.filter(edgeEnd => edgeEnd.reverseNode.index >= node.index);
        let otherLayer = edgeEnds.filter(edgeEnd => edgeEnd.reverseNode.layerIndex !== node.layerIndex);

        before.sort((edgeEnd1, edgeEnd2) => edgeEnd2.reverseNode.index - edgeEnd1.reverseNode.index);
        otherLayer.sort((edgeEnd1, edgeEnd2) => edgeEnd1.reverseNode.index - edgeEnd2.reverseNode.index);
        after.sort((edgeEnd1, edgeEnd2) => edgeEnd2.reverseNode.index - edgeEnd1.reverseNode.index);

        let all = before.concat(otherLayer).concat(after);
        all.forEach((edgeEnd, index) => {
            edgeEnd.setIndex(index);
        });
        if (side === "UPPER") {
            Object.assign(node, {
                upperSideEdges: edgeEnds.length
            });
        } else {
            Object.assign(node, {
                lowerSideEdges: edgeEnds.length
            });
        }
    });
}

export const Rect: React.FC<Node & LayerPosition & Coordinates> = node => {
    return (
        <g key={node.key}>
            <rect data-testid="rect"
                  x={node.x} y={node.y}
                  width={ELEMENT_WIDTH} height={ELEMENT_HEIGHT}
                  fill="lightgrey" strokeWidth={1} stroke="black"/>

            <text x={node.x + TEXT_PADDING } y={node.y + ELEMENT_HEIGHT / 2} fill="black"
                  clipPath={"url(#clip-element-text-" + node.key + ")"}>{node.name}
            </text>

            <clipPath id={"clip-element-text-" + node.key}>
                <rect x={node.x + TEXT_PADDING} y={node.y} width={ELEMENT_WIDTH - 2 * TEXT_PADDING} height={ELEMENT_HEIGHT}/>
            </clipPath>
        </g>
    );
};

export const Path: React.FC<Edge<LayerPosition & Coordinates & NumberOfEdges> & LayerPosition & ConnectionIndex> = edge => {
    let fromNodeOnLowerSide = edge.from.layerIndex <= edge.to.layerIndex;
    let fromNodeCenteringOffset = (ELEMENT_WIDTH - ((fromNodeOnLowerSide ? edge.from.lowerSideEdges : edge.from.upperSideEdges) - 1) * EDGE_SPACING) / 2;
    let fromNodeX = edge.from.x + fromNodeCenteringOffset + edge.fromIndex * EDGE_SPACING;
    let fromNodeY = edge.from.y + (fromNodeOnLowerSide ? ELEMENT_HEIGHT : 0);
    let upperNodeEdgesY = getUpperNode(edge).y + ELEMENT_HEIGHT + VERTICAL_SPACING / 2 + edge.index * EDGE_SPACING;
    let toNodeOnLowerSide = edge.from.layerIndex >= edge.to.layerIndex;
    let toNodeCenteringOffset = (ELEMENT_WIDTH - ((toNodeOnLowerSide ? edge.to.lowerSideEdges : edge.to.upperSideEdges) - 1) * EDGE_SPACING) / 2;
    let toNodeX = edge.to.x + toNodeCenteringOffset + edge.toIndex * EDGE_SPACING;
    let toNodeY = edge.to.y + (toNodeOnLowerSide ? ELEMENT_HEIGHT : 0);
    return (
        <path d={
            "M " + fromNodeX + " " + fromNodeY + " " +
            "L " + fromNodeX + " " + upperNodeEdgesY + " " +
            "L " + toNodeX + " " + upperNodeEdgesY + " " +
            "L " + toNodeX + " " + toNodeY
        }
              stroke="black"
              strokeWidth={1}
              fill="none"
        />
    );
};

const layers: Node[][] = [
    ["element 1", "element 2", "an element with long text", "element 4"],
    ["element 1", "element 2", "element 3"],
    ["element 1", "element 2", "element 3", "element 4", "element 5"]
].map(layer => {
    return layer.map(name => {
        return {name: name}
    })
});

const edges = [
    {from: layers[0][1], to: layers[1][0]},
    {from: layers[0][2], to: layers[1][2]},
    {from: layers[0][3], to: layers[1][1]},
    {from: layers[1][2], to: layers[2][2]},
    {from: layers[1][1], to: layers[2][4]},
    {from: layers[1][1], to: layers[2][3]},
    {from: layers[1][1], to: layers[2][2]},
    {from: layers[1][1], to: layers[2][1]},
    {from: layers[1][1], to: layers[2][0]},
    {from: layers[2][0], to: layers[1][0]},
    {from: layers[2][1], to: layers[1][0]},
    {from: layers[2][0], to: layers[2][3]},
    {from: layers[2][1], to: layers[2][3]},
    {from: layers[0][0], to: layers[0][2]},
    {from: layers[0][0], to: layers[0][1]},
    {from: layers[0][0], to: layers[1][0]},
    {from: layers[0][0], to: layers[1][0]},
    {from: layers[1][1], to: layers[1][0]},
    {from: layers[1][1], to: layers[1][2]}
];

export const Diagram: React.FC<Graph<Node, unknown>> = graph1 => {
    let graph2 = addLayerPositionToNodeG(graph1);

    let graph3 = addLayerPositionToEdgeG(graph2);

    let heightOfAllEdges = heightOfEdges(graph3.edges, graph1.layers.length);

    let graph4 = layoutG(graph3, heightOfAllEdges);

    let graph5 = addConnectionIndexAndNumberOfEdgesG(graph4);

    let width = widthOfLayers(graph1.layers) + 2 * MARGIN_SIDE;
    let height = heightOfNodes(graph1.layers) + heightOfAllEdges.reduce((sum, add) => sum + add) + 2 * MARGIN_TOP;

    return (
        <svg viewBox={"0 0 " + width + " " + height}>
            {graph5.layers.flat().map(Rect)}
            {graph5.edges.map(Path)}
        </svg>
    );
};

const App: React.FC = () => {
    return (
        <div className="App">
            <Diagram layers={layers} edges={edges}/>
        </div>
    );
};

export default App;