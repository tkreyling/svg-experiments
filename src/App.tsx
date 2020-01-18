import React, {useState} from 'react';
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

type Group<N> = {
    name: string
    nodes: N[]
}

export type Layer<N> = Group<N>[]

type Graph<N, E> = {
    layers: Layer<N>[]
    edges: (Edge<N> & E)[]
}

export const MARGIN_TOP = 5;
export const MARGIN_SIDE = 5;
export const ELEMENT_WIDTH = 150;
export const ELEMENT_HEIGHT = 40;
export const GROUP_MARGIN_TOP = 10;
export const GROUP_MARGIN_SIDE = 10;
export const HORIZONTAL_SPACING = 10;
export const VERTICAL_SPACING = 20;
export const TEXT_PADDING = 5;
export const EDGE_SPACING = 10;

export function widthOfLayers(layers: Layer<any>[]) {
    return Math.max(...layers.map(widthOfElements));
}

export function widthOfElements(groups: Layer<any>) {
    const n = groups
        .map(group => group.nodes.length)
        .reduce((sum, add) => sum + add, 0);
    if (n === 0) return 0;
    return groups.length * GROUP_MARGIN_SIDE * 2 + n * ELEMENT_WIDTH + (n - 1) * HORIZONTAL_SPACING;
}

function heightOfNodes(layers: Layer<any>[]) {
    let n = layers.length;
    return n * ELEMENT_HEIGHT + n * VERTICAL_SPACING + 2 * n * GROUP_MARGIN_TOP;
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

export function addLayerPositionToNode<N>(layers: Layer<N>[]): Layer<N & LayerPosition>[] {
    let fullWidth = Math.max(...layers.map(groups => {
        return groups
            .map(group => group.nodes.length)
            .reduce((sum, add) => sum + add, 0);
    }));

    return layers.map((groups, layerIndex) =>
        addLayerPositionToNodeForLayer(groups, fullWidth, layerIndex)
    );
}

function addLayerPositionToNodeForLayer<N>(groups: Layer<N>, fullWidth: number, layerIndex: number):
    Layer<N & LayerPosition> {
    let layerWidth = groups
        .map(group => group.nodes.length)
        .reduce((sum, add) => sum + add, 0);
    let layerOffset = (fullWidth - layerWidth) / 2;

    let resultGroups: Layer<N & LayerPosition> = [];
    let index = 0;
    groups.forEach(group => {
        let resultGroup = {
            name: group.name,
            nodes: group.nodes.map(element => {
                let resultElement = Object.assign(element, {
                    key: layerIndex + "_" + index,
                    index: index,
                    relativePosition: layerOffset + index,
                    layerIndex: layerIndex
                });
                index++;
                return resultElement;
            })
        };
        resultGroups.push(resultGroup);
    });
    return resultGroups;
}

function addCoordinatesToNodeG<N extends LayerPosition, E extends LayerPosition>(graph: Graph<N, E>):
    Graph<N & Coordinates, E> {
    let heightOfAllEdges = heightOfEdges(graph.edges, graph.layers.length);
    return {
        layers: layout(graph.layers, heightOfAllEdges),
        edges: graph.edges as unknown as (Edge<N & Coordinates> & E)[]
    }
}

export function layout<N>(layers: Layer<N & LayerPosition>[], heightOfEdges: number[]): Layer<N & LayerPosition & Coordinates>[] {
    let fullWidth = widthOfLayers(layers);
    return layers.map((elements, layerIndex) => {
        let additionalEdgeHeight = heightOfEdges.slice(0, layerIndex).reduce((sum, add) => sum + add, 0);
        return layoutHorizontally(elements, fullWidth, additionalEdgeHeight)
    });
}

export function layoutHorizontally<N>(groups: Layer<N & LayerPosition>, fullWidth: number, additionalEdgeHeight: number): Layer<N & LayerPosition & Coordinates> {
    let offsetToCenter = (fullWidth - widthOfElements(groups)) / 2;
    return groups.map((group, groupIndex) => {
        return {
            name: group.name,
            nodes: group.nodes.map(element =>
                Object.assign(element, {
                    x: MARGIN_SIDE + GROUP_MARGIN_SIDE + groupIndex * 2 * GROUP_MARGIN_SIDE + element.index * (ELEMENT_WIDTH + HORIZONTAL_SPACING) + offsetToCenter,
                    y: MARGIN_TOP + GROUP_MARGIN_TOP + element.layerIndex * (ELEMENT_HEIGHT + VERTICAL_SPACING + 2 * GROUP_MARGIN_TOP) + additionalEdgeHeight
                }))
        };
    });
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

        function addLayerPosition(edge: Edge<LayerPosition>, indexInArray: number, beforeOrAfter: "A" | "B") {
            let layerIndex = getUpperNode(edge).layerIndex;
            let index = indexOffset + indexInArray;
            Object.assign(edge, {
                key: nodeKey + "_" + beforeOrAfter + "_" + index,
                index: index,
                layerIndex: layerIndex
            });
        }

        before.forEach((edge, index) => addLayerPosition(edge, index, "B"));
        after.forEach((edge, index) => addLayerPosition(edge, index, "A"));

        indexOffset += Math.max(before.length, after.length);
    });
}

function addConnectionIndexAndNumberOfEdgesG<N extends LayerPosition, E>(graph: Graph<N, E>):
    Graph<N & NumberOfEdges, E & ConnectionIndex> {
    addConnectionIndexAndNumberOfEdges(graph.edges);
    return {
        layers: graph.layers as unknown as Layer<N & NumberOfEdges>[],
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

const Group: React.FC<Group<Coordinates>> = group => {
    let firstNode = group.nodes[0];
    let n = group.nodes.length;
    return (
        <rect
            x={firstNode.x - GROUP_MARGIN_SIDE} y={firstNode.y - GROUP_MARGIN_TOP}
            width={n * ELEMENT_WIDTH + (n - 1) * HORIZONTAL_SPACING + 2 * GROUP_MARGIN_SIDE}
            height={ELEMENT_HEIGHT + 2 * GROUP_MARGIN_TOP}
            fill="none" strokeWidth={1} stroke="grey"/>
    );
};

export const Path: React.FC<Edge<LayerPosition & Coordinates & NumberOfEdges> & LayerPosition & ConnectionIndex> = edge => {
    let fromNodeOnLowerSide = edge.from.layerIndex <= edge.to.layerIndex;
    let fromNodeCenteringOffset = (ELEMENT_WIDTH - ((fromNodeOnLowerSide ? edge.from.lowerSideEdges : edge.from.upperSideEdges) - 1) * EDGE_SPACING) / 2;
    let fromNodeX = edge.from.x + fromNodeCenteringOffset + edge.fromIndex * EDGE_SPACING;
    let fromNodeY = edge.from.y + (fromNodeOnLowerSide ? ELEMENT_HEIGHT : 0);
    let upperNodeEdgesY = getUpperNode(edge).y + ELEMENT_HEIGHT + VERTICAL_SPACING / 2 + GROUP_MARGIN_TOP + edge.index * EDGE_SPACING;
    let toNodeOnLowerSide = edge.from.layerIndex >= edge.to.layerIndex;
    let toNodeCenteringOffset = (ELEMENT_WIDTH - ((toNodeOnLowerSide ? edge.to.lowerSideEdges : edge.to.upperSideEdges) - 1) * EDGE_SPACING) / 2;
    let toNodeX = edge.to.x + toNodeCenteringOffset + edge.toIndex * EDGE_SPACING;
    let toNodeY = edge.to.y + (toNodeOnLowerSide ? ELEMENT_HEIGHT : 0);
    return (
        <path key={edge.key} d={
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

export function stringsToNodes(strings: string[][][]): Layer<Node>[] {
    return strings.map(layer => {
        return layer.map(group => {
            return {
                name: "group",
                nodes: group.map(name => {
                    return {name: name}
                })
            }
        });
    });
}

let graphAsString =
`var layers = stringsToNodes([
    [["element 11", "element 2", "an element with long text"], ["element 4"]],
    [["element 1", "element 2"], ["element 3"]],
    [["element 1", "element 2", "element 3", "element with changed name", "element 5"]]
]);

var edges = [
    {from: layers[0][0].nodes[1], to: layers[1][0].nodes[0]},
    {from: layers[0][0].nodes[2], to: layers[1][1].nodes[0]},
    {from: layers[0][1].nodes[0], to: layers[1][0].nodes[1]},
    {from: layers[1][1].nodes[0], to: layers[2][0].nodes[2]},
    {from: layers[1][0].nodes[1], to: layers[2][0].nodes[4]},
    {from: layers[1][0].nodes[1], to: layers[2][0].nodes[3]},
    {from: layers[1][0].nodes[1], to: layers[2][0].nodes[2]},
    {from: layers[1][0].nodes[1], to: layers[2][0].nodes[1]},
    {from: layers[1][0].nodes[1], to: layers[2][0].nodes[0]},
    {from: layers[2][0].nodes[0], to: layers[1][0].nodes[0]},
    {from: layers[2][0].nodes[1], to: layers[1][0].nodes[0]},
    {from: layers[2][0].nodes[0], to: layers[2][0].nodes[3]},
    {from: layers[2][0].nodes[1], to: layers[2][0].nodes[3]},
    {from: layers[2][0].nodes[4], to: layers[2][0].nodes[3]},
    {from: layers[0][0].nodes[0], to: layers[0][0].nodes[2]},
    {from: layers[0][0].nodes[0], to: layers[0][0].nodes[1]},
    {from: layers[0][0].nodes[0], to: layers[1][0].nodes[0]},
    {from: layers[0][0].nodes[0], to: layers[1][0].nodes[0]},
    {from: layers[1][0].nodes[1], to: layers[1][0].nodes[0]},
    {from: layers[1][0].nodes[1], to: layers[1][1].nodes[0]}
];

var graph = {
    layers: layers,
    edges: edges
};

graph
`;

// eslint-disable-next-line
const initialGraph: Graph<Node, unknown> = eval(graphAsString);

export const Diagram: React.FC<Graph<Node, unknown>> = graph => {
    return [graph]
        .map(addLayerPositionToNodeG)
        .map(addLayerPositionToEdgeG)
        .map(addCoordinatesToNodeG)
        .map(addConnectionIndexAndNumberOfEdgesG)
        .map(graph => {
            let heightOfAllEdges = heightOfEdges(graph.edges, graph.layers.length);
            let width = widthOfLayers(graph.layers) + 2 * MARGIN_SIDE;
            let height = heightOfNodes(graph.layers) + heightOfAllEdges.reduce((sum, add) => sum + add) + 2 * MARGIN_TOP;

            return (
                <svg viewBox={"0 0 " + width + " " + height}>
                    {graph.layers.flat().flatMap(group => group.nodes).map(Rect)}
                    {graph.layers.flat().map(Group)}
                    {graph.edges.map(Path)}
                </svg>
            );
        })[0];
};

export function parseGraph(text: string): Graph<Node, unknown> | string {
    try {
// eslint-disable-next-line
        let graph = eval(text);

        if (graph === undefined) return "Script is not returning a graph object!";

        if (graph.layers === undefined) return "Property layers is missing in graph object!";
        if (graph.edges === undefined) return "Property edges is missing in graph object!";

        let layers: Node[][][] = graph.layers;
        let aNodeIsUndefined = false;
        // It is necessary to go through the nested arrays by index,
        // because the array operations `every`, `map` and `flat` bypass empty array elements.
        for (let layerIndex = 0; layerIndex < layers.length; layerIndex++) {
            let groups = layers[layerIndex];
            for (let groupIndex = 0; groupIndex < groups.length; groupIndex++) {
                let elements = groups[groupIndex];
                for (let elementIndex = 0; elementIndex < elements.length; elementIndex++) {
                    if (elements[elementIndex] === undefined) aNodeIsUndefined = true;
                }
            }
        }
        if (aNodeIsUndefined) return "Every node must be defined!";

        if (!graph.edges.every((edge: Edge<Node>) => edge.from !== undefined))
            return "Property from must be defined on every edge!";
        if (!graph.edges.every((edge: Edge<Node>) => edge.to !== undefined))
            return "Property to must be defined on every edge!";

        return graph;
    } catch (e) {
        return e.message;
    }
}

const App: React.FC = () => {
    const [graph, setGraph] = useState(initialGraph);
    const [errorMessage, setErrorMessage] = useState("");

    function handleChange(changeEvent: React.ChangeEvent<HTMLTextAreaElement>) {
        let result = parseGraph(changeEvent.target.value);
        if (typeof result === 'string') {
            setErrorMessage(result);
        } else {
            setGraph(result);
            setErrorMessage("");
        }
    }

    return (
        <div id="parent" className="App">
            <div id="graph">
                <Diagram layers={graph.layers} edges={graph.edges}/>
            </div>
            <div>
                <textarea cols={100} rows={45} onChange={handleChange} defaultValue={graphAsString}/>
                <p className="error-message">{errorMessage}</p>
            </div>
        </div>
    );
};

export default App;