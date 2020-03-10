import React from "react";
import {component, db, dbTable, edge, Element, gap, graph, node, queue, s3Bucket, system} from "./newGraphModel";
import {Diagram} from "./Diagram";

function createInitialGraph() {
    let customerBrowser = new class {
        contentViewComponent = component("Content View HTML");
        searchViewComponent = component("Search View HTML");
        pdpViewComponent = component("PDP View HTML");

        element: Element<unknown> = {
            kind: "row", name: "Customer Browser", shape: "deployment-box",
            elements: [
                gap(),
                this.contentViewComponent, gap(), gap(), gap(),
                this.searchViewComponent, gap(), gap(), gap(), gap(),
                this.pdpViewComponent, gap(), gap(), gap()
            ]
        };
    }();

    let edutainment = new class {
        contentView = new class {
            siteMap = component("Content Site Map");
            component = component("Content View");

            element: Element<unknown> = {
                kind: "row", name: "Content View", shape: "deployment-box",
                elements: [this.siteMap, this.component]
            };
        }();

        element: Element<unknown> = {
            kind: "column", elements: [this.contentView.element]
        };
    }();

    let searchViewComponent = component("Search View");
    let pdpViewComponent = component("PDP View");

    let pdpView: Element<unknown> = {
        kind: "row",
        elements: [gap(), gap(), {
            kind: "row", name: "PDP View", shape: "deployment-box",
            elements: [gap(), searchViewComponent, gap(), gap(), gap(), gap(), pdpViewComponent, gap(), gap(), gap()]
        }]
    };

    let siteMapGenerator = component("Site Map Generator");

    let coreSiteMap: Element<unknown> = {
        kind: "column", elements: [gap(), {
            kind: "row", name: "Site Map Generator", shape: "deployment-box", elements: [siteMapGenerator]
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
                {kind: "row", name: "FACT Finder", shape: "deployment-box", elements: [gap(), factFinderAPI, gap()]}
            ]
        }, {
            kind: "row",
            elements: [factFinderFeedServiceDB, {
                kind: "column", name: "FACT Finder Feed Service", shape: "deployment-box",
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
            kind: "column", name: "Product Service", shape: "deployment-box", elements: [
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
            kind: "row", name: "Product Exporter Service", shape: "deployment-box",
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
            {kind: "row", name: "Stock Exporter Service", shape: "deployment-box", elements: [stockExporter]}
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
                shape: "deployment-box",
                elements: [deliveryTimeExporter]
            }
        ]
    };
    let deliveryTimeExporterServiceEdges = [
        edge(deliveryTimeExporter, deliveryTimeStream)
    ];

    let categoryStream = queue("Category Stream");
    let categoryExporter = component("Category Exporter");
    let articleS3Bucket = s3Bucket("Article S3 Bucket");

    let categoryExporterService: Element<unknown> = {
        kind: "column", elements: [
            categoryStream,
            {kind: "row", name: "Category Exporter Service", shape: "deployment-box", elements: [categoryExporter]},
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
        kind: "row", shape: "rectangle", name: "Core VPC", elements: [edutainment.element, core]
    };
    let coreAccountEdges = coreEdges.concat([
        edge(edutainment.contentView.component, factFinderAPI),
        edge(edutainment.contentView.component, productAPI)
    ]);

    let content = node("Site Content");
    let catalogContent = node("Catalog specific Content");
    let productContent = node("Product specific Content");

    let contentful: Element<unknown> = {
        kind: "row", name: "Contentful", shape: "deployment-box",
        elements: [content, catalogContent, productContent]
    };

    let mediaData = dbTable("Media Data");

    let shopNowDB: Element<unknown> = {
        kind: "row", name: "ShopNow DB", shape: "db-cylinder",
        elements: [mediaData]
    };

    let mediathek = system("Mediathek");

    let mediathekEdges = [
        edge(mediathek, mediaData)
    ];

    let mercatorStagingDB = db("Mercator Staging DB");
    let mercatorDB = db("Mercator DB");
    let mercatorComponent = system("Mercator");

    let mercator: Element<unknown> = {
        kind: "column",
        elements: [{
            kind: "row",
            elements: [mercatorStagingDB, mercatorDB]
        }, {
            kind: "row",
            elements: [gap(), mercatorComponent]
        }]
    };

    let mercatorEdges = [
        edge(mercatorComponent, mercatorDB),
        edge(mercatorDB, mercatorStagingDB)
    ];

    let articleReport = component("Article Report");

    let sapERP: Element<unknown> = {
        kind: "column", name: "SAP ERP / Retail", shape: "deployment-box",
        elements: [articleReport]
    };

    let tds: Element<unknown> = {
        kind: "row", shape: "rectangle", name: "TDS", elements: [
            {kind: "column", elements: [shopNowDB, mediathek]},
            mercator, gap(), gap(),
            sapERP
        ]
    };

    let tdsEdges = mediathekEdges.concat(mercatorEdges);

    let backendSystems: Element<unknown> = {
        kind: "row", elements: [contentful, gap(), gap(), gap(), gap(), gap(), tds]
    };

    let overall: Element<unknown> = {
        kind: "column", elements: [customerBrowser.element, coreAccount, backendSystems]
    };
    let overallEdges = coreAccountEdges.concat(tdsEdges).concat([
        edge(edutainment.contentView.component, customerBrowser.contentViewComponent),
        edge(searchViewComponent, customerBrowser.searchViewComponent),
        edge(pdpViewComponent, customerBrowser.pdpViewComponent),
        edge(edutainment.contentView.component, content),
        edge(searchViewComponent, catalogContent),
        edge(pdpViewComponent, productContent),
        edge(productExporter, mediaData),
        edge(productExporter, mercatorStagingDB),
        edge(productCampaignsExporter, mercatorStagingDB),
        edge(nightlyStockExporter, mercatorStagingDB),
        edge(articleReport, articleS3Bucket)
    ]);

    return graph(overall, overallEdges);
}

export const NewArchitecture: React.FC = () => {
    return (
        <Diagram initialGraph={createInitialGraph()}/>
    );
};