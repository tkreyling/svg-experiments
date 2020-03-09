import React from "react";
import {edge, Element, gap, graph, node} from "./newGraphModel";
import {Diagram} from "./Diagram";

export const Sample: React.FC = () => {
    let node_1_1 = node("Some node");
    let node_1_2 = node();
    let node_2_1 = node();
    let node_2_2 = node({name: "Component node", symbol: "component"});
    let node_3_1 = node({name: "Another component node", symbol: "component"});
    let node_3_2 = node();
    let node_4_1 = node("Some node with long text");
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
    let node_7_1 = node({visible: false});
    let node_7_2 = node();
    let node_8_1 = node();
    let node_8_2 = node();
    let element: Element<unknown> = {
        kind: "column", elements: [{
            kind: "row", name: "Top row", border: "rectangle", elements: [{
                kind: "column", name: "Left column", border: "rectangle", elements: [node_1_1, node_1_2]
            }, {
                kind: "column", name: "Right column", border: "rectangle", elements: [{
                    kind: "row", name: "Nested row", border: "rectangle", elements: [node_2_1, node_2_2]
                }, node_3_1, node_3_2]
            }, node_7_1, {
                kind: "column", elements: [node_8_1, gap(), node_8_2]
            }, node_7_2]
        }, {
            kind: "row", elements: [node_4_1, node_4_2, node_4_3, node_4_4, node_4_5]
        }, {
            kind: "row", name: "Bottom row", border: "rectangle", elements: [{
                kind: "row", name: "Left row in row", border: "rectangle", elements: [node_5_1, node_5_2]
            }, {
                kind: "row", name: "Right row in row", border: "rectangle", elements: [node_6_1, node_6_2, node_6_3, node_6_4]
            }]
        }]
    };
    let edges = [
        edge(node_1_1, node_4_1),
        edge(node_1_1, node_1_2),
        edge(node_2_1, node_1_1),
        edge(node_2_1, node_1_1),
        edge(node_2_1, node_2_2),
        edge(node_2_1, node_2_2),
        edge(node_2_1, node_4_1),
        edge(node_2_1, node_4_1),
        edge(node_2_1, node_4_3),
        edge(node_2_1, node_4_3),
        edge(node_2_1, node_4_4),
        edge(node_2_2, node_4_4),
        edge(node_2_2, node_4_2),
        edge(node_2_2, node_6_4),
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
        edge(node_6_4, node_6_3),
        edge(node_6_4, node_6_3),
        edge(node_7_2, node_6_4),
        edge(node_8_1, node_8_2)
    ];
    return (
        <Diagram initialGraph={graph(element, edges)}/>
    );
};