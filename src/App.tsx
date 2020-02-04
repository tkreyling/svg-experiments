import React, {useState} from 'react';
import './App.css';
import {indicesToReferences as indicesToReferencesImport} from "./indicesToReferences";
import {stringsToNodes as stringsToNodesImport} from "./stringsToNodes";
import {Diagram} from "./Diagram";

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

export type ConnectionIndex = {
    fromIndex: number
    toIndex: number
}

export type NumberOfEdges = {
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

function fromIsUpper<T extends LayerPosition>(edge: Edge<T>) {
    if (edge.from.layerIndex === edge.to.layerIndex) {
        return edge.from.index <= edge.to.index;
    }
    return edge.from.layerIndex < edge.to.layerIndex;
}

export function getUpperNode<T extends LayerPosition>(edge: Edge<T>): T {
    return fromIsUpper(edge) ? edge.from : edge.to;
}

export function getLowerNode<T extends LayerPosition>(edge: Edge<T>): T {
    return fromIsUpper(edge) ? edge.to : edge.from;
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

export const NodeShape: React.FC<Node & LayerPosition & X & Y> = node => {
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

export const GroupShape: React.FC<Group<Node, unknown> & GroupPosition & X & Y & Height> = group => {
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