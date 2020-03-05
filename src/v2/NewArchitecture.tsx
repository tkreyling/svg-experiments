import React from "react";
import {component, edge, Element, gap, graph, node} from "./newGraphModel";
import {Diagram} from "./Diagram";

export const NewArchitecture: React.FC = () => {
    let productServiceDB = node("Product Service DB");
    let productAPI = component("Product API");
    let stockAPI = component("Stock API");
    let productImporter = component("Product Importer");
    let productCampaignsImporter = component("Product Campaigns Importer");
    let nightlyStockImporter = component("Nightly Stock Importer");
    let nearTimeStockImporter = component("Near Time Stock Importer");
    let deliveryTimeImporter = component("Delivery Time Importer");
    let categoryImporter = component("Category Importer");

    let productService: Element<unknown> = {
        kind: "row", elements: [{
            kind: "column", elements: [gap(), productServiceDB]
        }, {
            kind: "column", name: "Product Service", border: "solid", elements: [
                {
                    kind: "row", elements: [
                        productAPI, stockAPI
                    ]
                },
                gap(),
                {
                    kind: "row", elements: [
                        productImporter, productCampaignsImporter, nightlyStockImporter,
                        nearTimeStockImporter, deliveryTimeImporter, categoryImporter
                    ]
                }
            ]
        }]
    };

    let productServiceEdges = [
        edge(productAPI, productServiceDB),
        edge(stockAPI, productServiceDB),
        edge(productImporter, productServiceDB),
        edge(productCampaignsImporter, productServiceDB),
        edge(nightlyStockImporter, productServiceDB),
        edge(nearTimeStockImporter, productServiceDB),
        edge(deliveryTimeImporter, productServiceDB),
        edge(categoryImporter, productServiceDB),
    ];
    return (
        <Diagram graph={graph(productService, productServiceEdges)}/>
    );
};