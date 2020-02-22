import React from "react";
import {Diagram} from "./Diagram";
import {Edge, Node, Stack} from "./graphModel";

function component(name: string): Node {
    return {
        kind: "node", name: name, symbol: "component", size: 1.2
    }
}

export const Architecture: React.FC = () => {
    let productAPI = component("Product API");
    let stockAPI = component("Stock API");
    let productServiceDB = component("Product Service DB");
    let productImporter = component("Product Importer");
    let stockImporter = component("Stock Importer");
    let categoryImporter = component("Category Importer");
    let campaignImporter = component("Campaign Importer");

    let stack: Stack<Node, unknown> = {
        kind: "stack",
        elements: [
            {
                kind: "layer",
                elements: [productAPI, stockAPI]
            },
            {
                kind: "layer",
                elements: [productServiceDB]
            },
            {
                kind: "layer",
                elements: [productImporter, stockImporter, categoryImporter, campaignImporter]
            }
        ]
    };

    let edges: Edge<Node>[] = [
        {from: productAPI, to: productServiceDB},
        {from: stockAPI, to: productServiceDB},
        {from: productServiceDB, to: productImporter},
        {from: productServiceDB, to: stockImporter},
        {from: productServiceDB, to: categoryImporter},
        {from: productServiceDB, to: campaignImporter}
    ];

    return (
        <Diagram stack={stack} edges={edges}/>
    );
};