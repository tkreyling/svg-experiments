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

    let pdpView = new class {
        searchViewComponent = component("Search View");
        pdpViewComponent = component("PDP View");

        element: Element<unknown> = {
            kind: "row",
            elements: [gap(), gap(), {
                kind: "row", name: "PDP View", shape: "deployment-box",
                elements: [
                    gap(),
                    this.searchViewComponent,
                    gap(), gap(), gap(), gap(),
                    this.pdpViewComponent,
                    gap(), gap(), gap()
                ]
            }]
        };
    }();

    let coreSiteMap = new class {
        siteMapGenerator = component("Site Map Generator");

        element: Element<unknown> = {
            kind: "column", elements: [gap(), {
                kind: "row", name: "Site Map Generator", shape: "deployment-box", elements: [
                    this.siteMapGenerator
                ]
            }]
        };
    }();

    let search = new class {
        factFinderDB = db("FACTFinder DB");
        factFinderAPI = component("FACTFinder API");

        factFinderFeedServiceDB = db("FACTFinder Feed\nService DB");
        factFinderUpdater = component("FACTFinder Updater");
        ffProductImporter = component("Product Importer");
        ffProductCampaignsImporter = component("Product Campaigns\nImporter");
        ffCategoryImporter = component("Category Importer");

        element: Element<unknown> = {
            kind: "column", elements: [{
                kind: "row",
                elements: [
                    this.factFinderDB,
                    {
                        kind: "row", name: "FACT Finder", shape: "deployment-box", elements: [
                            gap(), this.factFinderAPI, gap()
                        ]
                    }
                ]
            }, {
                kind: "row",
                elements: [this.factFinderFeedServiceDB, {
                    kind: "column", name: "FACT Finder Feed Service", shape: "deployment-box",
                    elements: [
                        {kind: "row", elements: [gap(), this.factFinderUpdater]},
                        {kind: "row", elements: [this.ffProductImporter, this.ffProductCampaignsImporter, this.ffCategoryImporter]}
                    ]
                }]
            }]
        };

        edges = [
            edge(this.factFinderAPI, this.factFinderDB),
            edge(this.factFinderUpdater, this.factFinderAPI),
            edge(this.factFinderUpdater, this.factFinderFeedServiceDB),
            edge(this.ffProductImporter, this.factFinderFeedServiceDB),
            edge(this.ffProductCampaignsImporter, this.factFinderFeedServiceDB),
            edge(this.ffCategoryImporter, this.factFinderFeedServiceDB)
        ];
    }();

    let productService = new class {
        productServiceDB = db("Product Service DB");
        productAPI = component("Product API");
        stockAPI = component("Stock API");
        productImporter = component("Product Importer");
        productCampaignsImporter = component("Product Campaigns\nImporter");
        nightlyStockImporter = component("Nightly Stock Importer");
        nearTimeStockImporter = component("Near Time Stock\nImporter");
        deliveryTimeImporter = component("Delivery Time Importer");
        categoryImporter = component("Category Importer");

        element: Element<unknown> = {
            kind: "row", elements: [{
                kind: "column", elements: [gap(), this.productServiceDB]
            }, {
                kind: "column", name: "Product Service", shape: "deployment-box", elements: [
                    {
                        kind: "row", elements: [
                            gap(), gap(), this.productAPI, this.stockAPI
                        ]
                    },
                    gap(),
                    {
                        kind: "row", elements: [
                            this.productImporter, this.productCampaignsImporter, this.nightlyStockImporter,
                            this.nearTimeStockImporter, this.deliveryTimeImporter, this.categoryImporter
                        ]
                    }
                ]
            }]
        };

        edges = [
            edge(this.productAPI, this.productServiceDB),
            edge(this.stockAPI, this.productServiceDB),
            edge(this.productImporter, this.productServiceDB),
            edge(this.productCampaignsImporter, this.productServiceDB),
            edge(this.nightlyStockImporter, this.productServiceDB),
            edge(this.nearTimeStockImporter, this.productServiceDB),
            edge(this.deliveryTimeImporter, this.productServiceDB),
            edge(this.categoryImporter, this.productServiceDB),
        ];
    }();

    let productExporterService = new class {
        productStream = queue("Product Stream");
        productExporter = component("Product Exporter");
        productCampaignsStream = queue("Product Campaigns\nStream");
        productCampaignsExporter = component("Product Campaigns\nExporter");
        nightlyStockStream = queue("Nightly Stock Stream");
        nightlyStockExporter = component("Nightly Stock Exporter");

        element: Element<unknown> = {
            kind: "column", elements: [{
                kind: "row", elements: [
                    this.productStream, this.productCampaignsStream, this.nightlyStockStream
                ]
            }, {
                kind: "row", name: "Product Exporter Service", shape: "deployment-box",
                elements: [
                    this.productExporter, this.productCampaignsExporter, this.nightlyStockExporter
                ]
            }]
        };

        edges = [
            edge(this.productExporter, this.productStream),
            edge(this.productCampaignsExporter, this.productCampaignsStream),
            edge(this.nightlyStockExporter, this.nightlyStockStream),
        ];
    }();

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
        kind: "row", elements: [coreSiteMap.element, search.element, productService.element]
    };
    let coreServicesEdges = search.edges.concat(productService.edges);

    let coreExporter: Element<unknown> = {
        kind: "row", elements: [
            gap(), gap(), gap(), gap(), gap(), gap(),
            productExporterService.element, stockExporterService, deliveryTimeExporterService, categoryExporterService
        ]
    };
    let coreExporterEdges = productExporterService.edges
        .concat(stockExporterServiceEdges)
        .concat(deliveryTimeExporterServiceEdges)
        .concat(categoryExporterServiceEdges);

    let core: Element<unknown> = {
        kind: "column", elements: [pdpView.element, coreServices, coreExporter]
    };
    let coreEdges = coreServicesEdges.concat(coreExporterEdges).concat([
        edge(pdpView.pdpViewComponent, productService.productAPI),
        edge(pdpView.pdpViewComponent, productService.stockAPI),
        edge(pdpView.searchViewComponent, search.factFinderAPI),
        edge(coreSiteMap.siteMapGenerator, search.factFinderFeedServiceDB),
        edge(search.ffProductImporter, productExporterService.productStream),
        edge(search.ffProductCampaignsImporter, productExporterService.productCampaignsStream),
        edge(search.ffCategoryImporter, categoryStream),
        edge(productService.productImporter, productExporterService.productStream),
        edge(productService.productCampaignsImporter, productExporterService.productCampaignsStream),
        edge(productService.nightlyStockImporter, productExporterService.nightlyStockStream),
        edge(productService.nearTimeStockImporter, stockStream),
        edge(productService.deliveryTimeImporter, deliveryTimeStream),
        edge(productService.categoryImporter, categoryStream)
    ]);

    let coreAccount: Element<unknown> = {
        kind: "row", shape: "rectangle", name: "Core VPC", elements: [edutainment.element, core]
    };
    let coreAccountEdges = coreEdges.concat([
        edge(edutainment.contentView.component, search.factFinderAPI),
        edge(edutainment.contentView.component, productService.productAPI)
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
        edge(pdpView.searchViewComponent, customerBrowser.searchViewComponent),
        edge(pdpView.pdpViewComponent, customerBrowser.pdpViewComponent),
        edge(edutainment.contentView.component, content),
        edge(pdpView.searchViewComponent, catalogContent),
        edge(pdpView.pdpViewComponent, productContent),
        edge(productExporterService.productExporter, mediaData),
        edge(productExporterService.productExporter, mercatorStagingDB),
        edge(productExporterService.productCampaignsExporter, mercatorStagingDB),
        edge(productExporterService.nightlyStockExporter, mercatorStagingDB),
        edge(articleReport, articleS3Bucket)
    ]);

    return graph(overall, overallEdges);
}

export const NewArchitecture: React.FC = () => {
    return (
        <Diagram initialGraph={createInitialGraph()}/>
    );
};