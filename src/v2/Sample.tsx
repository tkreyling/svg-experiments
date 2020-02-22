import React from "react";
import {Element} from "./newGraphModel";
import {Diagram} from "./Diagram";

export const Sample: React.FC = () => {
    let element: Element<unknown> = {
        kind: "column", elements: [{
            kind: "row", elements: [{
                kind: "column", elements: [{
                    kind: "node"
                }, {
                    kind: "node"
                }]
            }, {
                kind: "column", elements: [{
                    kind: "node"
                }, {
                    kind: "node"
                }, {
                    kind: "node"
                }]
            }]
        }, {
            kind: "node"
        }]
    };
    return (
        <Diagram element={element}/>
    );
};