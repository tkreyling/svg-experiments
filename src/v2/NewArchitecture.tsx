import React from "react";
import {component, edge, Element, gap, graph, node} from "./newGraphModel";
import {Diagram} from "./Diagram";

export const NewArchitecture: React.FC = () => {
    let factFinderDB = node("FACTFinder DB");
    let factFinderAPI = component("FACTFinder API");

    let factFinderFeedServiceDB = node("FACTFinder Feed Service DB");
    let factFinderUpdater = component("FACTFinder Updater");
    let ffProductImporter = component("Product Importer");
    let ffProductCampaignsImporter = component("Product Campaigns Importer");
    let ffCategoryImporter = component("Category Importer");

    let search: Element<unknown> = {
        kind: "column", elements: [{
            kind: "row",
            elements: [
                factFinderDB,
                {kind: "row", name: "FACT Finder", border: "deployment-box", elements: [gap(), factFinderAPI, gap()]}
            ]
        }, {
            kind: "row",
            elements: [factFinderFeedServiceDB, {
                kind: "column", name: "FACT Finder Feed Service", border: "deployment-box",
                elements: [
                    {kind: "row", elements: [gap(), factFinderUpdater]},
                    {kind: "row", elements: [ffProductImporter, ffProductCampaignsImporter, ffCategoryImporter]}
                ]
            }]
        }]
    };

    let searchEdges = [
        edge(factFinderAPI, factFinderDB),
        edge(factFinderUpdater, factFinderAPI),
        edge(factFinderUpdater, factFinderFeedServiceDB),
        edge(ffProductImporter, factFinderFeedServiceDB),
        edge(ffProductCampaignsImporter, factFinderFeedServiceDB),
        edge(ffCategoryImporter, factFinderFeedServiceDB)
    ];

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
            kind: "column", name: "Product Service", border: "deployment-box", elements: [
                {
                    kind: "row", elements: [
                        gap(), gap(), productAPI, stockAPI
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

    let productStream = node("Product Stream");
    let productExporter = component("Product Exporter");
    let productCampaignsStream = node("Product Campaigns Stream");
    let productCampaignsExporter = component("Product Campaigns Exporter");
    let nightlyStockStream = node("Nightly Stock Stream");
    let nightlyStockExporter = component("Nightly Stock Exporter");

    let productExporterService: Element<unknown> = {
        kind: "column", elements: [{
            kind: "row", elements: [productStream, productCampaignsStream, nightlyStockStream]
        }, {
            kind: "row", name: "Product Exporter Service", border: "deployment-box",
            elements: [productExporter, productCampaignsExporter, nightlyStockExporter]
        }]
    };

    let productExporterServiceEdges = [
        edge(productExporter, productStream),
        edge(productCampaignsExporter, productCampaignsStream),
        edge(nightlyStockExporter, nightlyStockStream),
    ];

    let stockStream = node("Stock Stream");
    let stockExporter = component("Stock Exporter");

    let stockExporterService: Element<unknown> = {
        kind: "column", elements: [
            stockStream,
            {kind: "row", name: "Stock Exporter Service", border: "deployment-box", elements: [stockExporter]}
        ]
    };
    let stockExporterServiceEdges = [
        edge(stockExporter, stockStream)
    ];

    let deliveryTimeStream = node("Delivery Time Stream");
    let deliveryTimeExporter = component("Delivery Time Exporter");

    let deliveryTimeExporterService: Element<unknown> = {
        kind: "column", elements: [
            deliveryTimeStream,
            {kind: "row", name: "Delivery Time Exporter Service", border: "deployment-box", elements: [deliveryTimeExporter]}
        ]
    };
    let deliveryTimeExporterServiceEdges = [
        edge(deliveryTimeExporter, deliveryTimeStream)
    ];

    let categoryStream = node("Category Stream");
    let categoryExporter = component("Category Exporter");

    let categoryExporterService: Element<unknown> = {
        kind: "column", elements: [
            categoryStream,
            {kind: "row", name: "Category Exporter Service", border: "deployment-box", elements: [categoryExporter]}
        ]
    };
    let categoryExporterServiceEdges = [
        edge(categoryExporter, categoryStream)
    ];

    let coreServices: Element<unknown> = {
        kind: "row", elements: [search, productService]
    };
    let coreServicesEdges = searchEdges.concat(productServiceEdges);

    let coreExporter: Element<unknown> = {
        kind: "row", elements: [
            gap(), gap(), gap(), gap(), gap(),
            productExporterService, stockExporterService, deliveryTimeExporterService, categoryExporterService
        ]
    };
    let coreExporterEdges = productExporterServiceEdges
        .concat(stockExporterServiceEdges)
        .concat(deliveryTimeExporterServiceEdges)
        .concat(categoryExporterServiceEdges);

    let core: Element<unknown> = {
        kind: "column", elements: [coreServices, coreExporter]
    };
    let coreEdges = coreServicesEdges.concat(coreExporterEdges).concat([
        edge(ffProductImporter, productStream),
        edge(ffProductCampaignsImporter, productCampaignsStream),
        edge(ffCategoryImporter, categoryStream),
        edge(productImporter, productStream),
        edge(productCampaignsImporter, productCampaignsStream),
        edge(nightlyStockImporter, nightlyStockStream),
        edge(nearTimeStockImporter, stockStream),
        edge(deliveryTimeImporter, deliveryTimeStream),
        edge(categoryImporter, categoryStream)
    ]);

    return (
        <Diagram graph={graph(core, coreEdges)}/>
    );
};