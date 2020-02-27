import React from "react";
import {edge, Element, node} from "./newGraphModel";
import {Diagram} from "./Diagram";

export const Sample: React.FC = () => {
    let node1 = node();
    let node2 = node();
    let node3 = node();
    let node4 = node();
    let node5 = node();
    let node6 = node();
    let node7 = node();
    let node8 = node();
    let node9 = node();
    let node10 = node();
    let node11 = node();
    let node12 = node();
    let element: Element<unknown> = {
        kind: "column", elements: [{
            kind: "row", elements: [{
                kind: "column", border: "solid", elements: [node1, node2]
            }, {
                kind: "column", border: "solid", elements: [{
                    kind: "row", border: "solid", elements: [node3, node4]
                }, node5, node6]
            }]
        }, {
            kind: "row", elements: [node7, node8]
        }, {
            kind: "row", border: "solid", elements: [{
                kind: "row", border: "solid", elements: [node9, node10]
            }, {
                kind: "row", border: "solid", elements: [node11, node12]
            }]
        }]
    };
    let edges = [
        edge(node6, node7)
    ];
    return (
        <Diagram element={element} edges={edges}/>
    );
};