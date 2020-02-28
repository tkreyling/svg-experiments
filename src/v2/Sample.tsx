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
    let node13 = node();
    let node14 = node();
    let node15 = node();
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
            kind: "row", elements: [node7, node8, node9]
        }, {
            kind: "row", border: "solid", elements: [{
                kind: "row", border: "solid", elements: [node10, node11]
            }, {
                kind: "row", border: "solid", elements: [node12, node13, node14, node15]
            }]
        }]
    };
    let edges = [
        edge(node6, node7),
        edge(node10, node8),
        edge(node12, node8),
        edge(node13, node8),
        edge(node14, node8),
        edge(node15, node8)
    ];
    return (
        <Diagram element={element} edges={edges}/>
    );
};