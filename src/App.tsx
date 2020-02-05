import React, {useState} from 'react';
import './App.css';
import {indicesToReferences as indicesToReferencesImport} from "./indicesToReferences";
import {stringsToNodes as stringsToNodesImport} from "./stringsToNodes";
import {Diagram} from "./Diagram";
import {parseGraph} from "./parseGraph";
import {STROKE_WIDTH} from "./styling";

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