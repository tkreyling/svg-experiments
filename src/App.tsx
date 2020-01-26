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

export type GroupPosition = {
    key: string
    index: number
    layerIndex: number
}

type Symbols = "component"

export type Node = {
    kind: 'node'
    name: string
    symbol?: Symbols
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

export type Group<N> = {
    kind: 'group'
    name: string
    elements: N[]
}

export type Layer<N, G> = {
    kind: 'layer'
    elements: (Group<N> & G)[]
}

export type Stack<N, G> = {
    kind: 'stack'
    elements: Layer<N, G>[]
}

export type Graph<N, E, G> = {
    stack: Stack<N, G>
    edges: (Edge<N> & E)[]
}

export const MARGIN_TOP = 5;
export const MARGIN_SIDE = 5;
export const ELEMENT_WIDTH = 150;
export const ELEMENT_HEIGHT = 40;
export const SYMBOL_WIDTH = 12;
export const SYMBOL_SPACING = 3;
export const GROUP_MARGIN_TOP = 30;
export const GROUP_MARGIN_BOTTOM = 10;
export const GROUP_MARGIN_SIDE = 10;
export const HORIZONTAL_SPACING = 10;
export const VERTICAL_SPACING = 20;
export const TEXT_PADDING = 5;
export const EDGE_SPACING = 10;
export const STROKE_WIDTH = 0.5;

export function width(element: Node | Stack<Node, unknown> | Layer<Node, unknown> | Group<Node>): number {
    switch (element.kind) {
        case "stack":
            return Math.max(...element.elements.map(width));
        case "layer":
            return element.elements
                .map(width)
                .map((width, index) => width + (index > 0 ? HORIZONTAL_SPACING : 0))
                .reduce((sum, add) => sum + add, 0);
        case "group": {
            return element.elements
                .map(width)
                .map((width, index) => width + (index > 0 ? HORIZONTAL_SPACING : 0))
                .reduce((sum, add) => sum + add, 0) + 2 * GROUP_MARGIN_SIDE;
        }
        case "node":
            return ELEMENT_WIDTH;
    }
}

function heightOfNodes(stack: Stack<unknown, unknown>) {
    let n = stack.elements.length;
    return n * ELEMENT_HEIGHT + n * VERTICAL_SPACING + n * GROUP_MARGIN_TOP + n * GROUP_MARGIN_BOTTOM;
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

function addLayerPositionToNodeG<N extends Node, E, G>(graph: Graph<N, E, G>): Graph<N & LayerPosition, E, G> {
    return {
        stack: addLayerPositionToNode(graph.stack) as Stack<N & LayerPosition, G>,
        edges: graph.edges as unknown as (Edge<N & LayerPosition> & E)[]
    }
}

function numberOfElements<N extends Node, G>(element: Node | Group<N> | Layer<N, G> | Stack<N, G>): number {
    switch (element.kind) {
        case "stack":
            return Math.max(...element.elements.map(numberOfElements));
        case "layer":
            return element.elements.map(numberOfElements).reduce((sum, add) => sum + add, 0);
        case "group":
            return element.elements.map(numberOfElements).reduce((sum, add) => sum + add, 0);
        case "node":
            return 1;
    }
}

export function addLayerPositionToNode<N extends Node, G>(
    element: Group<N> | Layer<N, G> | Stack<N, G>,
    fullWidth: number = 0,
    layerIndex: number = 0,
    layerOffset: number = 0,
    accumulator: { index: number } = {index: 0}
): Group<N & LayerPosition> | Layer<N & LayerPosition, G> | Stack<N & LayerPosition, G> {

    switch (element.kind) {
        case "stack": {
            let fullWidth = numberOfElements(element);

            return Object.assign(element, {
                elements: element.elements.map((groups, layerIndex) =>
                    addLayerPositionToNode(groups, fullWidth, layerIndex) as Layer<N & LayerPosition, G>
                )
            });
        }
        case "layer": {
            let layerWidth = numberOfElements(element);
            let layerOffset = (fullWidth - layerWidth) / 2;

            let resultElements: (Group<N & LayerPosition> & G)[] = [];
            let accumulator = {index: 0};
            element.elements.forEach(group => {
                let resultGroup = addLayerPositionToNode(group, fullWidth, layerIndex, layerOffset, accumulator);
                resultElements.push(resultGroup as (Group<N & LayerPosition> & G));
            });

            return Object.assign(element, {
                elements: resultElements
            });
        }
        default: {
            return Object.assign(element, {
                elements: element.elements.map(element => {
                    let resultElement = Object.assign(element, {
                        key: layerIndex + "_" + accumulator.index,
                        index: accumulator.index,
                        relativePosition: layerOffset + accumulator.index,
                        layerIndex: layerIndex
                    });
                    accumulator.index++;
                    return resultElement;
                })
            });
        }
    }
}

function addCoordinatesToNodeG<N extends (Node & LayerPosition), E extends LayerPosition, G>(graph: Graph<N, E, G>):
    Graph<N & Coordinates, E, G> {
    let heightOfAllEdges = heightOfEdges(graph.edges, graph.stack.elements.length);
    return {
        stack: addCoordinatesToNode(graph.stack, heightOfAllEdges) as Stack<N & LayerPosition & Coordinates, G>,
        edges: graph.edges as unknown as (Edge<N & Coordinates> & E)[]
    }
}

export function addCoordinatesToNode<N extends (Node & LayerPosition), G>(
    element: Group<N> | Layer<N, G> | Stack<N, G>,
    heightOfEdges: number[],
    fullWidth: number = 0,
    additionalEdgeHeight: number = 0,
    groupIndex: number = 0,
    offsetToCenter: number = 0
): Group<N & Coordinates> | Layer<N & Coordinates, G> | Stack<N & Coordinates, G> {

    switch (element.kind) {
        case "stack": {
            let fullWidth = width(element);
            return Object.assign(element, {
                elements: element.elements.map((elements, layerIndex) => {
                    let additionalEdgeHeight = heightOfEdges.slice(0, layerIndex).reduce((sum, add) => sum + add, 0);
                    return addCoordinatesToNode(elements, heightOfEdges, fullWidth, additionalEdgeHeight) as
                        Layer<N & LayerPosition & Coordinates, G>
                })
            });
        }
        case "layer": {
            let offsetToCenter = (fullWidth - width(element)) / 2;
            return Object.assign(element, {
                elements: element.elements.map((elements, groupIndex) => {
                    return addCoordinatesToNode(elements, heightOfEdges, fullWidth, additionalEdgeHeight, groupIndex, offsetToCenter) as
                        Group<N & LayerPosition & Coordinates> & G;
                })
            });
        }
        default: {
            return Object.assign(element, {
                elements: element.elements.map(node =>
                    Object.assign(node, {
                        x: MARGIN_SIDE + GROUP_MARGIN_SIDE + groupIndex * 2 * GROUP_MARGIN_SIDE + node.index * (ELEMENT_WIDTH + HORIZONTAL_SPACING) + offsetToCenter,
                        y: MARGIN_TOP + GROUP_MARGIN_TOP + node.layerIndex * (ELEMENT_HEIGHT + VERTICAL_SPACING + GROUP_MARGIN_TOP + GROUP_MARGIN_BOTTOM) + additionalEdgeHeight
                    }))
            });
        }
    }
}

function addLayerPositionToEdgeG<N extends LayerPosition, E, G>(graph: Graph<N, E, G>):
    Graph<N, E & LayerPosition, G> {
    addLayerPositionToEdge(graph.edges);
    return {
        stack: graph.stack,
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

        sameLayerBefore.sort((edge1, edge2) => getLowerNode(edge1).index - getLowerNode(edge2).index);
        otherLayerBefore.sort((edge1, edge2) => getLowerNode(edge1).index - getLowerNode(edge2).index);
        otherLayerAfter.sort((edge1, edge2) => getLowerNode(edge2).index - getLowerNode(edge1).index);
        sameLayerAfter.sort((edge1, edge2) => getLowerNode(edge1).index - getLowerNode(edge2).index);

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

function addConnectionIndexAndNumberOfEdgesG<N extends LayerPosition, E, G>(graph: Graph<N, E, G>):
    Graph<N & NumberOfEdges, E & ConnectionIndex, G> {
    addConnectionIndexAndNumberOfEdges(graph.edges);
    return {
        stack: graph.stack as unknown as Stack<N & NumberOfEdges, G>,
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
        addEdgeEnd(edge.to, edge.from, index => Object.assign(edge, {toIndex: index}));
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

function addPositionToGroupG<N, E, G>(graph: Graph<N, E, G>): Graph<N, E, G & GroupPosition> {
    return {
        stack: addPositionToGroup(graph.stack),
        edges: graph.edges
    }
}

export function addPositionToGroup<N, G>(stack: Stack<N, G>): Stack<N, G & GroupPosition> {
    return {
        kind: 'stack',
        elements: stack.elements.map((layer, layerIndex) => ({
            kind: layer.kind,
            elements: layer.elements.map((group, groupIndex) =>
                Object.assign(group, {
                    key: "G_" + layerIndex + "_" + groupIndex,
                    index: groupIndex,
                    layerIndex: layerIndex
                }))
        }))
    };
}

type Symbol = {
    x: number
    y: number
    width: number
    symbolKey: string
}

export const ComponentSymbol: React.FC<Symbol> = symbol => {
    const symbolHeightRelative = 1.1;
    const barWidthRelative = 0.4;
    const barHeightRelative = 0.15;
    const barWidthAbsolute = symbol.width * barWidthRelative;
    const barHeightAbsolute = symbol.width * barHeightRelative;
    return (
        <g key={symbol.symbolKey}>
            <rect
                x={symbol.x + barWidthAbsolute / 2} y={symbol.y}
                width={symbol.width * (1 - barWidthRelative / 2)} height={symbol.width * symbolHeightRelative}
                fill="none" strokeWidth={STROKE_WIDTH} stroke="black"/>
            <rect
                x={symbol.x} y={symbol.y + barHeightAbsolute}
                width={barWidthAbsolute} height={barHeightAbsolute}
                fill="lightgrey" strokeWidth={STROKE_WIDTH} stroke="black"/>
            <rect
                x={symbol.x} y={symbol.y + barHeightAbsolute * 3}
                width={barWidthAbsolute} height={barHeightAbsolute}
                fill="lightgrey" strokeWidth={STROKE_WIDTH} stroke="black"/>
        </g>
    );
};

export const Rect: React.FC<Node & LayerPosition & Coordinates> = node => {
    let isComponent = node.symbol === "component";
    return (
        <g key={node.key}>
            <rect data-testid="rect"
                  x={node.x} y={node.y}
                  width={ELEMENT_WIDTH} height={ELEMENT_HEIGHT}
                  fill="lightgrey" strokeWidth={STROKE_WIDTH} stroke="black"/>

            <text x={node.x + TEXT_PADDING} y={node.y + ELEMENT_HEIGHT / 2} fill="black"
                  clipPath={"url(#clip-element-text-" + node.key + ")"}>{node.name}
            </text>

            <clipPath id={"clip-element-text-" + node.key}>
                <rect
                    x={node.x + TEXT_PADDING} y={node.y}
                    width={ELEMENT_WIDTH - 2 * TEXT_PADDING - (isComponent ? (SYMBOL_WIDTH + SYMBOL_SPACING) : 0)}
                    height={ELEMENT_HEIGHT}/>
            </clipPath>

            {isComponent ?
                <ComponentSymbol
                    symbolKey={node.key + "CS"}
                    x={node.x + ELEMENT_WIDTH - SYMBOL_WIDTH - SYMBOL_SPACING}
                    y={node.y + SYMBOL_SPACING}
                    width={SYMBOL_WIDTH}/>
                : ""}
        </g>
    );
};

const Group: React.FC<Group<Coordinates> & GroupPosition> = group => {
    let firstNode = group.elements[0];
    let n = group.elements.length;

    let x = firstNode.x - GROUP_MARGIN_SIDE;
    let y = firstNode.y - GROUP_MARGIN_TOP;
    let contentWidth = n * ELEMENT_WIDTH + (n - 1) * HORIZONTAL_SPACING;
    return (
        <g key={group.key}>
            <rect
                x={x} y={y}
                width={contentWidth + 2 * GROUP_MARGIN_SIDE}
                height={ELEMENT_HEIGHT + GROUP_MARGIN_TOP + GROUP_MARGIN_BOTTOM}
                fill="none" strokeWidth={STROKE_WIDTH} stroke="grey"/>

            <text x={x + GROUP_MARGIN_SIDE} y={y + ELEMENT_HEIGHT / 2} fill="black"
                  clipPath={"url(#clip-element-text-" + group.key + ")"}>{group.name}
            </text>

            <clipPath id={"clip-element-text-" + group.key}>
                <rect
                    x={x + GROUP_MARGIN_SIDE} y={y}
                    width={contentWidth}
                    height={ELEMENT_HEIGHT}/>
            </clipPath>
        </g>
    );
};

export const Path: React.FC<Edge<LayerPosition & Coordinates & NumberOfEdges> & LayerPosition & ConnectionIndex> = edge => {
    let fromNodeOnLowerSide = edge.from.layerIndex <= edge.to.layerIndex;
    let fromNodeCenteringOffset = (ELEMENT_WIDTH - ((fromNodeOnLowerSide ? edge.from.lowerSideEdges : edge.from.upperSideEdges) - 1) * EDGE_SPACING) / 2;
    let fromNodeX = edge.from.x + fromNodeCenteringOffset + edge.fromIndex * EDGE_SPACING;
    let fromNodeY = edge.from.y + (fromNodeOnLowerSide ? ELEMENT_HEIGHT : 0);
    let upperNodeEdgesY = getUpperNode(edge).y + ELEMENT_HEIGHT + VERTICAL_SPACING / 2 + GROUP_MARGIN_BOTTOM + edge.index * EDGE_SPACING;
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
              strokeWidth={STROKE_WIDTH}
              fill="none"
        />
    );
};

export function stringsToNodes(strings: Group<string | Node>[][]): Stack<Node, unknown> {
    return {
        kind: 'stack',
        elements: strings.map(layer => {
            return {
                kind: 'layer',
                elements: layer.map(group => {
                    return {
                        kind: 'group',
                        name: group.name,
                        elements: group.elements.map(element => {
                            if (typeof element === 'string') {
                                return {
                                    kind: 'node',
                                    name: element
                                }
                            } else {
                                return Object.assign(element, {
                                    kind: 'node'
                                });
                            }
                        })
                    }
                })
            }
        })
    };
}

let graphAsString =
    `var stack = stringsToNodes([
    [
        {name: "group 1", elements: [
            "element 11", 
            {name: "element 2", symbol: "component"}, 
            {name: "an element with long text", symbol: "component"}            
        ]},
        {name: "group 2", elements: ["element 4"]}
    ],
    [
        {name: "group 3", elements: ["element 1", "element 2"]},
        {name: "group 4", elements: ["element 3"]}
    ],
    [
        {name: "group 5", elements: ["element 1", "element 2", "element 3", "element with changed name", "element 5"]}
    ]
]);
var layers = stack.elements;

var edges = [
    {from: layers[0].elements[0].elements[1], to: layers[1].elements[0].elements[0]},
    {from: layers[0].elements[0].elements[2], to: layers[1].elements[1].elements[0]},
    {from: layers[0].elements[1].elements[0], to: layers[1].elements[0].elements[1]},
    {from: layers[1].elements[1].elements[0], to: layers[2].elements[0].elements[2]},
    {from: layers[1].elements[0].elements[1], to: layers[2].elements[0].elements[4]},
    {from: layers[1].elements[0].elements[1], to: layers[2].elements[0].elements[3]},
    {from: layers[1].elements[0].elements[1], to: layers[2].elements[0].elements[2]},
    {from: layers[1].elements[0].elements[1], to: layers[2].elements[0].elements[1]},
    {from: layers[1].elements[0].elements[1], to: layers[2].elements[0].elements[0]},
    {from: layers[2].elements[0].elements[0], to: layers[1].elements[0].elements[0]},
    {from: layers[2].elements[0].elements[1], to: layers[1].elements[0].elements[0]},
    {from: layers[2].elements[0].elements[0], to: layers[2].elements[0].elements[3]},
    {from: layers[2].elements[0].elements[1], to: layers[2].elements[0].elements[3]},
    {from: layers[2].elements[0].elements[4], to: layers[2].elements[0].elements[3]},
    {from: layers[0].elements[0].elements[0], to: layers[0].elements[0].elements[2]},
    {from: layers[0].elements[0].elements[0], to: layers[0].elements[0].elements[1]},
    {from: layers[0].elements[0].elements[0], to: layers[1].elements[0].elements[0]},
    {from: layers[0].elements[0].elements[0], to: layers[1].elements[0].elements[0]},
    {from: layers[1].elements[0].elements[1], to: layers[1].elements[0].elements[0]},
    {from: layers[1].elements[0].elements[1], to: layers[1].elements[1].elements[0]}
];

var graph = {
    stack: stack,
    edges: edges
};

graph
`;

// eslint-disable-next-line
const initialGraph: Graph<Node, unknown, unknown> = eval(graphAsString);

export const Diagram: React.FC<Graph<Node, unknown, unknown>> = graph => {
    return [graph]
        .map(addLayerPositionToNodeG)
        .map(addLayerPositionToEdgeG)
        .map(addCoordinatesToNodeG)
        .map(addConnectionIndexAndNumberOfEdgesG)
        .map(addPositionToGroupG)
        .map(graph => {
            let heightOfAllEdges = heightOfEdges(graph.edges, graph.stack.elements.length);
            let overallWidth = width(graph.stack) + 2 * MARGIN_SIDE;
            let height = heightOfNodes(graph.stack) + heightOfAllEdges.reduce((sum, add) => sum + add) + 2 * MARGIN_TOP;

            return (
                <svg viewBox={"0 0 " + overallWidth + " " + height}>
                    {graph.stack.elements.flatMap(layer => layer.elements).flatMap(group => group.elements).map(Rect)}
                    {graph.stack.elements.flatMap(layer => layer.elements).map(Group)}
                    {graph.edges.map(Path)}
                </svg>
            );
        })[0];
};

export function parseGraph(text: string): Graph<Node, unknown, unknown> | string {
    try {
// eslint-disable-next-line
        let graph: Graph<Node, unknown, unknown> = eval(text);

        if (graph === undefined) return "Script is not returning a graph object!";

        if (graph.stack === undefined) return "Property layers is missing in graph object!";
        if (graph.edges === undefined) return "Property edges is missing in graph object!";

        let layers = graph.stack.elements;
        let aNodeIsUndefined = false;
        // It is necessary to go through the nested arrays by index,
        // because the array operations `every`, `map` and `flat` bypass empty array elements.
        for (let layerIndex = 0; layerIndex < layers.length; layerIndex++) {
            let groups = layers[layerIndex].elements;
            for (let groupIndex = 0; groupIndex < groups.length; groupIndex++) {
                let elements = groups[groupIndex].elements;
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
                <Diagram stack={graph.stack} edges={graph.edges}/>
            </div>
            <div>
                <textarea cols={100} rows={45} onChange={handleChange} defaultValue={graphAsString}/>
                <p className="error-message">{errorMessage}</p>
            </div>
        </div>
    );
};

export default App;