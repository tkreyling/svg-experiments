import React from "react";
import {edge, Element, graph, node} from "./newGraphModel";
import {Diagram} from "./Diagram";

export const Sample: React.FC = () => {
    let node_1_1 = node();
    let node_1_2 = node();
    let node_2_1 = node();
    let node_2_2 = node();
    let node_3_1 = node();
    let node_3_2 = node();
    let node_4_1 = node();
    let node_4_2 = node();
    let node_4_3 = node();
    let node_4_4 = node();
    let node_4_5 = node();
    let node_5_1 = node();
    let node_5_2 = node();
    let node_6_1 = node();
    let node_6_2 = node();
    let node_6_3 = node();
    let node_6_4 = node();
    let element: Element<unknown> = {
        kind: "column", elements: [{
            kind: "row", border: "solid", elements: [{
                kind: "column", border: "solid", elements: [node_1_1, node_1_2]
            }, {
                kind: "column", border: "solid", elements: [{
                    kind: "row", border: "solid", elements: [node_2_1, node_2_2]
                }, node_3_1, node_3_2]
            }]
        }, {
            kind: "row", elements: [node_4_1, node_4_2, node_4_3, node_4_4, node_4_5]
        }, {
            kind: "row", border: "solid", elements: [{
                kind: "row", border: "solid", elements: [node_5_1, node_5_2]
            }, {
                kind: "row", border: "solid", elements: [node_6_1, node_6_2, node_6_3, node_6_4]
            }]
        }]
    };
    let edges = [
        edge(node_2_1, node_1_1),
        edge(node_2_1, node_1_1),
        edge(node_2_1, node_2_2),
        edge(node_2_1, node_2_2),
        edge(node_2_1, node_4_1),
        edge(node_2_1, node_4_1),
        edge(node_2_1, node_4_3),
        edge(node_2_1, node_4_3),
        edge(node_2_1, node_4_4),
        edge(node_3_2, node_4_1),
        edge(node_3_2, node_4_1),
        edge(node_3_2, node_4_3),
        edge(node_3_2, node_4_4),
        edge(node_3_2, node_4_5),
        edge(node_3_2, node_4_5),
        edge(node_4_1, node_4_2),
        edge(node_5_1, node_4_2),
        edge(node_5_2, node_4_2),
        edge(node_6_1, node_4_2),
        edge(node_6_2, node_4_2),
        edge(node_6_3, node_4_2),
        edge(node_6_3, node_4_2),
        edge(node_6_4, node_4_2),
        edge(node_5_1, node_4_5),
        edge(node_5_2, node_4_5),
        edge(node_6_1, node_4_5),
        edge(node_6_2, node_4_5),
        edge(node_6_3, node_4_5),
        edge(node_6_4, node_4_5),
        edge(node_6_4, node_6_3)
    ];
    return (
        <Diagram graph={graph(element, edges)}/>
    );
};