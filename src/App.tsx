import React, {useState} from 'react';
import './App.css';
import {and, ascending, descending} from "./sorting";
import {indicesToReferences as indicesToReferencesImport} from "./indicesToReferences";
import {stringsToNodes as stringsToNodesImport} from "./stringsToNodes";
import {addLayerPositionToNodeG} from "./addLayerPositionToNode";

export type X = {
    x: number
}

export type Y = {
    y: number
}

export type Height = {
    height: number
}

export type LayerDimensions = {
    belowLayerY: number
}

export type LayerPosition = {
    key: string
    index: number
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
    size?: number
}

export type Edge<T> = {
    from: T
    to: T
}

export type EdgeIndex = {
    edgeIndex: number
}

type ConnectionIndex = {
    fromIndex: number
    toIndex: number
}

type NumberOfEdges = {
    upperSideEdges: number
    lowerSideEdges: number
}

export type Group<N, G> = {
    kind: 'group'
    name: string
    elements: ((Group<N, G> & G) | N)[]
}

export type Layer<N, G> = {
    kind: 'layer'
    elements: (Group<N, G> & G)[]
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

export function width(element: Node | Stack<Node, unknown> | Layer<Node, unknown> | Group<Node, unknown>): number {
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
            return ELEMENT_WIDTH * (element.size || 1);
    }
}

function heightOfNodes(element: Node | Stack<Node, unknown> | Layer<Node, unknown> | Group<Node, unknown>): number {
    switch (element.kind) {
        case "stack":
            return element.elements
                .map(heightOfNodes)
                .reduce((sum, add) => sum + add, 0);
        case "layer":
            return Math.max(...element.elements.map(heightOfNodes)) + VERTICAL_SPACING;
        case "group": {
            return GROUP_MARGIN_TOP + Math.max(...element.elements.map(heightOfNodes)) + GROUP_MARGIN_BOTTOM;
        }
        case "node":
            return ELEMENT_HEIGHT;
    }
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

function groupNestingLevel(element: Node | Layer<Node, unknown> | Group<Node, unknown>): number {
    switch (element.kind) {
        case "layer":
            return Math.max(...element.elements.map(groupNestingLevel));
        case "group":
            return Math.max(...element.elements.map(groupNestingLevel)) + 1;
        case "node":
            return 0;
    }
}

function addXToNodeG<N extends (Node & LayerPosition), E, G extends GroupPosition>(
    graph: Graph<N, E, G>
): Graph<N & X, E, G & X> {
    addXToNode(graph.stack, {x: 0 });
    return graph as unknown as Graph<N & X, E, G & X>;
}

export function addXToNode<N extends (Node & LayerPosition), G extends GroupPosition>(
    element: N | (Group<N, G> & G) | Layer<N, G> | Stack<N, G>,
    accumulator: { x: number },
    fullWidth: number = 0
) {
    switch (element.kind) {
        case "stack": {
            let fullWidth = width(element);
            element.elements.forEach(layer => {
                addXToNode(layer, accumulator, fullWidth);
            });
            return;
        }
        case "layer": {
            accumulator.x = MARGIN_SIDE + (fullWidth - width(element)) / 2;
            element.elements.forEach(group => {
                addXToNode(group, accumulator, fullWidth);
            });
            return;
        }
        case "group": {
            Object.assign(element, {
                x: accumulator.x
            });

            accumulator.x += GROUP_MARGIN_SIDE;
            element.elements.forEach(node => {
                addXToNode(node, accumulator, fullWidth);
            });
            accumulator.x += GROUP_MARGIN_SIDE;
            return;
        }
        case "node": {
            Object.assign(element, {
                x: accumulator.x
            });
            accumulator.x += ELEMENT_WIDTH * (element.size || 1) + HORIZONTAL_SPACING;
            return;
        }
    }
}

function addYToNodeG<N extends (Node & LayerPosition), E extends LayerPosition, G>(
    graph: Graph<N, E, G>
): Graph<N & Y & LayerDimensions, E, G & Y & Height> {
    let heightOfAllEdges = heightOfEdges(graph.edges, graph.stack.elements.length);
    addYToNode(graph.stack, {y: 0, nodeY: 0, groupHeight: 0, belowLayerY: 0 }, heightOfAllEdges);
    return graph as unknown as Graph<N & Y & LayerDimensions, E, G & Y & Height>;
}

export function addYToNode<N extends Node, G>(
    element: N | (Group<N, G> & G) | Layer<N, G> | Stack<N, G>,
    accumulator: { y: number, nodeY: number, groupHeight: number, belowLayerY: number },
    heightOfEdges: number[],
    additionalEdgeHeight: number = 0
) {
    switch (element.kind) {
        case "stack": {
            accumulator.y += MARGIN_TOP;
            element.elements.forEach((layer, layerIndex) => {
                let additionalEdgeHeight = heightOfEdges.slice(0, layerIndex).reduce((sum, add) => sum + add, 0);
                addYToNode(layer, accumulator, heightOfEdges, additionalEdgeHeight);
            });
            return;
        }
        case "layer": {
            accumulator.nodeY = accumulator.y + groupNestingLevel(element) * GROUP_MARGIN_TOP;
            accumulator.groupHeight = groupNestingLevel(element) * (GROUP_MARGIN_TOP + GROUP_MARGIN_BOTTOM) + ELEMENT_HEIGHT;
            accumulator.belowLayerY = accumulator.y + heightOfNodes(element) + additionalEdgeHeight;
            element.elements.forEach(group => {
                addYToNode(group, accumulator, heightOfEdges, additionalEdgeHeight);
            });
            accumulator.y += heightOfNodes(element);
            return;
        }
        case "group": {
            Object.assign(element, {
                y: accumulator.y + additionalEdgeHeight,
                height: accumulator.groupHeight
            });

            accumulator.y += GROUP_MARGIN_TOP;
            accumulator.groupHeight -= GROUP_MARGIN_TOP + GROUP_MARGIN_BOTTOM;
            element.elements.forEach(node => {
                addYToNode(node, accumulator, heightOfEdges, additionalEdgeHeight);
            });
            accumulator.y -= GROUP_MARGIN_TOP;
            accumulator.groupHeight += GROUP_MARGIN_TOP + GROUP_MARGIN_BOTTOM;
            return;
        }
        case "node": {
            Object.assign(element, {
                y: accumulator.nodeY + additionalEdgeHeight,
                belowLayerY: accumulator.belowLayerY
            });
            return;
        }
    }
}

function addLayerPositionToEdgeG<N extends LayerPosition & X, E, G>(graph: Graph<N, E, G>):
    Graph<N, E & LayerPosition, G> {
    addLayerPositionToEdge(graph.edges);
    return graph as unknown as Graph<N, E & LayerPosition, G>;
}

export function addLayerPositionToEdge(edges: Edge<LayerPosition & X>[]) {
    let groupedByLayerIndex = new Map<number, (Edge<LayerPosition & X> & EdgeIndex)[]>();

    edges
        .map((edge, index) => Object.assign(edge, {edgeIndex: index}))
        .forEach(edge => {
            let key = getUpperNode(edge).layerIndex;
            let edges = groupedByLayerIndex.get(key) || [];
            edges.push(edge);
            groupedByLayerIndex.set(key, edges);
        });

    Array.from(groupedByLayerIndex.values()).forEach(addLayerPositionToEdgeForLayer);
}

function addLayerPositionToEdgeForLayer(edges: (Edge<LayerPosition & X> & EdgeIndex)[]) {
    let groupedByUpperNode = new Map<string, (Edge<LayerPosition & X> & EdgeIndex)[]>();

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
        let otherLayerBefore = otherLayer.filter(edge => getLowerNode(edge).x <= getUpperNode(edge).x);
        let otherLayerAfter = otherLayer.filter(edge => getLowerNode(edge).x > getUpperNode(edge).x);

        sameLayerBefore.sort(and(ascending(edge => getLowerNode(edge).index), ascending(edge => edge.edgeIndex)));
        otherLayerBefore.sort(and(ascending(edge => getLowerNode(edge).index), ascending(edge => edge.edgeIndex)));
        otherLayerAfter.sort(and(descending(edge => getLowerNode(edge).index), descending(edge => edge.edgeIndex)));
        sameLayerAfter.sort(and(ascending(edge => getLowerNode(edge).index), ascending(edge => edge.edgeIndex)));

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
    return graph as unknown as Graph<N & NumberOfEdges, E & ConnectionIndex, G>;
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

        before.sort(descending(e => e.reverseNode.index));
        otherLayer.sort(ascending(e => e.reverseNode.index));
        after.sort(descending(e => e.reverseNode.index));

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

export const Rect: React.FC<Node & LayerPosition & X & Y> = node => {
    let isComponent = node.symbol === "component";
    return (
        <g key={node.key}>
            <rect data-testid="rect"
                  x={node.x} y={node.y}
                  width={width(node)} height={ELEMENT_HEIGHT}
                  fill="lightgrey" strokeWidth={STROKE_WIDTH} stroke="black"/>

            <text x={node.x + TEXT_PADDING} y={node.y + ELEMENT_HEIGHT / 2} fill="black"
                  clipPath={"url(#clip-element-text-" + node.key + ")"}>{node.name}
            </text>

            <clipPath id={"clip-element-text-" + node.key}>
                <rect
                    x={node.x + TEXT_PADDING} y={node.y}
                    width={width(node) - 2 * TEXT_PADDING - (isComponent ? (SYMBOL_WIDTH + SYMBOL_SPACING) : 0)}
                    height={ELEMENT_HEIGHT}/>
            </clipPath>

            {isComponent ?
                <ComponentSymbol
                    symbolKey={node.key + "CS"}
                    x={node.x + width(node) - SYMBOL_WIDTH - SYMBOL_SPACING}
                    y={node.y + SYMBOL_SPACING}
                    width={SYMBOL_WIDTH}/>
                : ""}
        </g>
    );
};

const Group: React.FC<Group<Node, unknown> & GroupPosition & X & Y & Height> = group => {
    return (
        <g key={group.key}>
            <rect
                x={group.x} y={group.y}
                width={width(group)}
                height={group.height}
                fill="none" strokeWidth={STROKE_WIDTH} stroke="grey"/>

            <text x={group.x + GROUP_MARGIN_SIDE} y={group.y + ELEMENT_HEIGHT / 2} fill="black"
                  clipPath={"url(#clip-element-text-" + group.key + ")"}>{group.name}
            </text>

            <clipPath id={"clip-element-text-" + group.key}>
                <rect
                    x={group.x + GROUP_MARGIN_SIDE} y={group.y}
                    width={width(group) - 2 * GROUP_MARGIN_SIDE}
                    height={ELEMENT_HEIGHT}/>
            </clipPath>
        </g>
    );
};

function edgeEndCoordinates<N extends Node & LayerPosition & X & Y & NumberOfEdges>(
    node: N, edgeIndex: number, otherNode: N
) {
    let onLowerSide = node.layerIndex <= otherNode.layerIndex;
    let nodeCenteringOffset = (width(node) - ((onLowerSide ? node.lowerSideEdges : node.upperSideEdges) - 1) * EDGE_SPACING) / 2;
    return {
        x: node.x + nodeCenteringOffset + edgeIndex * EDGE_SPACING,
        y: node.y + (onLowerSide ? ELEMENT_HEIGHT : 0)
    };
}

export const Path: React.FC<Edge<Node & LayerPosition & X & Y & LayerDimensions & NumberOfEdges> & LayerPosition & ConnectionIndex> = edge => {
    let fromNode = edgeEndCoordinates(edge.from, edge.fromIndex, edge.to);
    let upperNodeEdgesY = getUpperNode(edge).belowLayerY - VERTICAL_SPACING / 2 + edge.index * EDGE_SPACING;
    let toNode = edgeEndCoordinates(edge.to, edge.toIndex, edge.from);
    return (
        <path key={edge.key} d={
            "M " + fromNode.x + " " + fromNode.y + " " +
            "L " + fromNode.x + " " + upperNodeEdgesY + " " +
            "L " + toNode.x + " " + upperNodeEdgesY + " " +
            "L " + toNode.x + " " + toNode.y
        }
              stroke="black"
              strokeWidth={STROKE_WIDTH}
              fill="none"
        />
    );
};

let graphAsString =
    `var stack = stringsToNodes([
    [
        {name: "group 1", elements: [
            "element 11", 
            {name: "element 2", size: 1.5, symbol: "component"}, 
            {name: "an element with long text", symbol: "component"}            
        ]},
        {name: "group 2", elements: ["element 4"]}
    ],
    [
        {name: "group 3", elements: ["element 1", "element 2"]},
        {name: "group 4", elements: [{name: "group 6", elements: ["element 4"]}, "element 3"]}
    ],
    [
        {name: "group 5", elements: [
            "element 1", "element 2", "element 3", 
            {name: "element with changed name", size: 1.5}, 
            {name: "element 5", size: 0.7}]}
    ]
]);

var edgeIndices = [
    {from: [0, 0, 1],    to: [1, 0, 0]},
    {from: [0, 0, 2],    to: [1, 1, 0, 0]},
    {from: [0, 1, 0],    to: [1, 0, 1]},
    {from: [1, 1, 0, 0], to: [2, 0, 2]},
    {from: [1, 0, 1],    to: [2, 0, 4]},
    {from: [1, 0, 1],    to: [2, 0, 3]},
    {from: [1, 0, 1],    to: [2, 0, 2]},
    {from: [1, 0, 1],    to: [2, 0, 1]},
    {from: [1, 0, 1],    to: [2, 0, 0]},
    {from: [2, 0, 0],    to: [1, 0, 0]},
    {from: [2, 0, 1],    to: [1, 0, 0]},
    {from: [2, 0, 0],    to: [2, 0, 3]},
    {from: [2, 0, 1],    to: [2, 0, 3]},
    {from: [2, 0, 4],    to: [2, 0, 3]},
    {from: [0, 0, 0],    to: [0, 0, 2]},
    {from: [0, 0, 0],    to: [0, 0, 1]},
    {from: [0, 0, 0],    to: [1, 0, 0]},
    {from: [0, 0, 0],    to: [1, 0, 0]},
    {from: [1, 0, 1],    to: [1, 0, 0]},
    {from: [1, 0, 1],    to: [1, 1, 0, 0]}
];
var edges = indicesToReferences(stack, edgeIndices);

var graph = {
    stack: stack,
    edges: edges
};

graph
`;

// noinspection JSUnusedLocalSymbols
const indicesToReferences = indicesToReferencesImport;

// noinspection JSUnusedLocalSymbols
const stringsToNodes = stringsToNodesImport;

// eslint-disable-next-line
const initialGraph: Graph<Node, unknown, unknown> = eval(graphAsString);

export function allNodes<N extends Node, G, E>(element: Stack<N, G> | Group<N, G> | N): N[] {
    switch (element.kind) {
        case "stack":
            return element.elements.flatMap(layer => layer.elements).flatMap(allNodes);
        case "group":
            return element.elements.flatMap(allNodes);
        case "node":
            return [element];
    }
}

function allGroups<N extends Node, G, E>(element: Stack<N, G> | (Group<N, G> & G) | N): (Group<N, G> & G)[] {
    switch (element.kind) {
        case "stack":
            return element.elements.flatMap(layer => layer.elements).flatMap(allGroups);
        case "group":
            return [element].concat(element.elements.flatMap(allGroups));
        case "node":
            return [];
    }
}

export const Diagram: React.FC<Graph<Node, unknown, unknown>> = graph => {
    return [graph]
        .map(addLayerPositionToNodeG)
        .map(addXToNodeG)
        .map(addLayerPositionToEdgeG)
        .map(addYToNodeG)
        .map(addConnectionIndexAndNumberOfEdgesG)
        .map(graph => {
            let heightOfAllEdges = heightOfEdges(graph.edges, graph.stack.elements.length);
            let overallWidth = width(graph.stack) + 2 * MARGIN_SIDE;
            let height = heightOfNodes(graph.stack) + heightOfAllEdges.reduce((sum, add) => sum + add) + 2 * MARGIN_TOP;

            return (
                <svg viewBox={"0 0 " + overallWidth + " " + height}>
                    {allNodes(graph.stack).map(Rect)}
                    {allGroups(graph.stack).map(Group)}
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