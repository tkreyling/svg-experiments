import React from "react";
import {Diagram} from "./Diagram";
import {Node, Stack} from "./graphModel";

export const Architecture: React.FC = () => {
    let stack: Stack<Node, unknown> = {
        kind: "stack",
        elements: [
            {
                kind: "layer",
                elements: [
                    {
                        kind: "group", name: "Product Service",
                        elements: [
                            {
                                kind: "node", name: "Product API", symbol: "component"
                            },
                            {
                                kind: "node", name: "Stock API", symbol: "component"
                            }
                        ]
                    }
                ]
            },
            {
                kind: "layer",
                elements: [
                    {
                        kind: "group", name: "",
                        elements: [
                            {
                                kind: "node", name: "Product Service DB"
                            },
                            {
                                kind: "node", name: "", isPlaceholder: true
                            }
                        ]
                    }
                ]
            },
            {
                kind: "layer",
                elements: [
                    {
                        kind: "group", name: "",
                        elements: [
                            {
                                kind: "node", name: "Product Importer", symbol: "component"
                            },
                            {
                                kind: "node", name: "Stock Importer", symbol: "component"
                            },
                            {
                                kind: "node", name: "Category Importer", symbol: "component"
                            },
                            {
                                kind: "node", name: "Campaign Importer", symbol: "component"
                            }
                        ]
                    }
                ]
            }
        ]
    };
    return (
        <Diagram stack={stack} edges={[]}/>
    );
};