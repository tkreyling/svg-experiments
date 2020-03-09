import React from "react";
import {component, db, edge, Element, gap, graph, node, queue} from "./newGraphModel";
import {Diagram} from "./Diagram";

function createInitialGraph() {
    let browserContentViewComponent = component("Content View HTML");
    let browserSearchViewComponent = component("Search View HTML");
    let browserPdpViewComponent = component("PDP View HTML");

    let customerBrowser: Element<unknown> = {
        kind: "row", name: "Customer Browser", border: "deployment-box",
        elements: [
            gap(),
            browserContentViewComponent, gap(), gap(), gap(),
            browserSearchViewComponent, gap(), gap(), gap(), gap(),
            browserPdpViewComponent, gap(), gap(), gap()
        ]
    };

    let contentSiteMap = component("Content Site Map");
    let contentViewComponent = component("Content View");

    let contentView: Element<unknown> = {
        kind: "row", name: "Content View", border: "deployment-box",
        elements: [contentSiteMap, contentViewComponent]
    };

    let edutainment: Element<unknown> = {
        kind: "column", elements: [contentView]
    };

    let searchViewComponent = component("Search View");
    let pdpViewComponent = component("PDP View");

    let pdpView: Element<unknown> = {
        kind: "row",
        elements: [gap(), gap(), {
            kind: "row", name: "PDP View", border: "deployment-box",
            elements: [gap(), searchViewComponent, gap(), gap(), gap(), gap(), pdpViewComponent, gap(), gap(), gap()]
        }]
    };

    let siteMapGenerator = component("Site Map Generator");

    let coreSiteMap: Element<unknown> = {
        kind: "column", elements: [gap(), {
            kind: "row", name: "Site Map Generator", border: "deployment-box", elements: [siteMapGenerator]
        }]
    };

    let factFinderDB = db("FACTFinder DB");
    let factFinderAPI = component("FACTFinder API");

    let factFinderFeedServiceDB = db("FACTFinder Feed\nService DB");
    let factFinderUpdater = component("FACTFinder Updater");
    let ffProductImporter = component("Product Importer");
    let ffProductCampaignsImporter = component("Product Campaigns\nImporter");
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

    let productServiceDB = db("Product Service DB");
    let productAPI = component("Product API");
    let stockAPI = component("Stock API");
    let productImporter = component("Product Importer");
    let productCampaignsImporter = component("Product Campaigns\nImporter");
    let nightlyStockImporter = component("Nightly Stock Importer");
    let nearTimeStockImporter = component("Near Time Stock\nImporter");
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

    let productStream = queue("Product Stream");
    let productExporter = component("Product Exporter");
    let productCampaignsStream = queue("Product Campaigns\nStream");
    let productCampaignsExporter = component("Product Campaigns\nExporter");
    let nightlyStockStream = queue("Nightly Stock Stream");
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

    let stockStream = queue("Stock Stream");
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

    let deliveryTimeStream = queue("Delivery Time Stream");
    let deliveryTimeExporter = component("Delivery Time Exporter");

    let deliveryTimeExporterService: Element<unknown> = {
        kind: "column", elements: [
            deliveryTimeStream,
            {
                kind: "row",
                name: "Delivery Time\nExporter Service",
                border: "deployment-box",
                elements: [deliveryTimeExporter]
            }
        ]
    };
    let deliveryTimeExporterServiceEdges = [
        edge(deliveryTimeExporter, deliveryTimeStream)
    ];

    let categoryStream = queue("Category Stream");
    let categoryExporter = component("Category Exporter");
    let articleS3Bucket = node("Article S3 Bucket");

    let categoryExporterService: Element<unknown> = {
        kind: "column", elements: [
            categoryStream,
            {kind: "row", name: "Category Exporter Service", border: "deployment-box", elements: [categoryExporter]},
            articleS3Bucket
        ]
    };
    let categoryExporterServiceEdges = [
        edge(categoryExporter, categoryStream),
        edge(categoryExporter, articleS3Bucket)
    ];

    let coreServices: Element<unknown> = {
        kind: "row", elements: [coreSiteMap, search, productService]
    };
    let coreServicesEdges = searchEdges.concat(productServiceEdges);

    let coreExporter: Element<unknown> = {
        kind: "row", elements: [
            gap(), gap(), gap(), gap(), gap(), gap(),
            productExporterService, stockExporterService, deliveryTimeExporterService, categoryExporterService
        ]
    };
    let coreExporterEdges = productExporterServiceEdges
        .concat(stockExporterServiceEdges)
        .concat(deliveryTimeExporterServiceEdges)
        .concat(categoryExporterServiceEdges);

    let core: Element<unknown> = {
        kind: "column", elements: [pdpView, coreServices, coreExporter]
    };
    let coreEdges = coreServicesEdges.concat(coreExporterEdges).concat([
        edge(pdpViewComponent, productAPI),
        edge(pdpViewComponent, stockAPI),
        edge(searchViewComponent, factFinderAPI),
        edge(siteMapGenerator, factFinderFeedServiceDB),
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

    let coreAccount: Element<unknown> = {
        kind: "row", border: "rectangle", name: "Core VPC", elements: [edutainment, core]
    };
    let coreAccountEdges = coreEdges.concat([
        edge(contentViewComponent, factFinderAPI),
        edge(contentViewComponent, productAPI)
    ]);

    let content = node("Site Content");
    let catalogContent = node("Catalog specific Content");
    let productContent = node("Product specific Content");

    let contentful: Element<unknown> = {
        kind: "row", name: "Contentful", border: "deployment-box",
        elements: [content, catalogContent, productContent]
    };

    let mediaData = db("Media Data");

    let shopNowDB: Element<unknown> = {
        kind: "row", name: "ShopNow DB", border: "rectangle",
        elements: [mediaData]
    };

    let mediathekComponent = node("Mediathek");

    let mediathek: Element<unknown> = {
        kind: "row", name: "Mediathek", border: "deployment-box",
        elements: [mediathekComponent]
    };

    let mediathekEdges = [
        edge(mediathekComponent, mediaData)
    ];

    let mercatorStagingDB = db("Mercator Staging DB");
    let mercatorDB = db("Mercator DB");
    let mercatorComponent = node("Mercator");

    let mercator: Element<unknown> = {
        kind: "column",
        elements: [{
            kind: "row",
            elements: [mercatorStagingDB, mercatorDB]
        }, {
            kind: "row",
            elements: [gap(), {
                kind: "row", name: "Mercator", border: "deployment-box",
                elements: [mercatorComponent]
            }]
        }]
    };

    let mercatorEdges = [
        edge(mercatorComponent, mercatorDB),
        edge(mercatorDB, mercatorStagingDB)
    ];

    let tds: Element<unknown> = {
        kind: "row", border: "rectangle", name: "TDS", elements: [
            {kind: "column", elements: [shopNowDB, mediathek]},
            mercator
        ]
    };

    let tdsEdges = mediathekEdges.concat(mercatorEdges);

    let backendSystems: Element<unknown> = {
        kind: "row", elements: [contentful, gap(), gap(), gap(), gap(), gap(), tds]
    };

    let overall: Element<unknown> = {
        kind: "column", elements: [customerBrowser, coreAccount, backendSystems]
    };
    let overallEdges = coreAccountEdges.concat(tdsEdges).concat([
        edge(contentViewComponent, browserContentViewComponent),
        edge(searchViewComponent, browserSearchViewComponent),
        edge(pdpViewComponent, browserPdpViewComponent),
        edge(contentViewComponent, content),
        edge(searchViewComponent, catalogContent),
        edge(pdpViewComponent, productContent),
        edge(productExporter, mediaData),
        edge(productExporter, mercatorStagingDB)
    ]);

    return graph(overall, overallEdges);
}

export const NewArchitecture: React.FC = () => {
    return (
        <Diagram initialGraph={createInitialGraph()}/>
    );
};