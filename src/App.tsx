import React, {useState} from 'react';
import './App.css';
import {indicesToReferences as indicesToReferencesImport} from "./indicesToReferences";
import {stringsToNodes as stringsToNodesImport} from "./stringsToNodes";
import {Diagram} from "./Diagram";
import {parseGraph} from "./parseGraph";
import {Graph, Node} from "./graphModel";

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
        {name: "group 4", elements: [
            {name: "group 6", elements: ["element 4"]}, 
            {name: "placeholder", size: 0.3, isPlaceholder: true}, 
            "element 3"
        ]},
        "node on top level", 
        {name: "an element with long text", symbol: "component"}     
    ],
    [
        {name: "group 5", elements: [
            "element 1", "element 2", "element 3", 
            {name: "element with changed name", size: 1.5}, 
            {name: "element 5", size: 0.7}]}
    ]
]);

var edgeIndices = [
    {from: [0, 0, 0],    to: [1, 3]},
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
    {from: [0, 1, 0],    to: [1, 1, 1]},
    {from: [1, 1, 1],    to: [2, 0, 2]},
    {from: [0, 1, 0],    to: [1, 1, 2]},
    {from: [1, 0, 1],    to: [1, 0, 0]},
    {from: [0, 0, 0],    to: [2, 0, 0]},
    {from: [0, 0, 0],    to: [2, 0, 1]},
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