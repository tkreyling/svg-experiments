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

    let coreServices = new class {
        coreSiteMap = new class {
            siteMapGenerator = component("Site Map Generator");

            element: Element<unknown> = {
                kind: "column", elements: [gap(), {
                    kind: "row", name: "Site Map Generator", shape: "deployment-box", elements: [
                        this.siteMapGenerator
                    ]
                }]
            };
        }();

        search = new class {
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

        productService = new class {
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

        element: Element<unknown> = {
            kind: "row", elements: [this.coreSiteMap.element, this.search.element, this.productService.element]
        };

        edges = this.search.edges.concat(this.productService.edges);
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

    let stockExporterService = new class {
        stockStream = queue("Stock Stream");
        stockExporter = component("Stock Exporter");

        element: Element<unknown> = {
            kind: "column", elements: [
                this.stockStream,
                {kind: "row", name: "Stock Exporter Service", shape: "deployment-box", elements: [
                    this.stockExporter
                ]}
            ]
        };

        edges = [
            edge(this.stockExporter, this.stockStream)
        ];
    }();

    let deliveryTimeExporterService = new class {
        deliveryTimeStream = queue("Delivery Time Stream");
        deliveryTimeExporter = component("Delivery Time Exporter");

        element: Element<unknown> = {
            kind: "column", elements: [
                this.deliveryTimeStream,
                {
                    kind: "row",
                    name: "Delivery Time\nExporter Service",
                    shape: "deployment-box",
                    elements: [this.deliveryTimeExporter]
                }
            ]
        };

        edges = [
            edge(this.deliveryTimeExporter, this.deliveryTimeStream)
        ];
    }();

    let categoryExporterService = new class {
        categoryStream = queue("Category Stream");
        categoryExporter = component("Category Exporter");
        articleS3Bucket = s3Bucket("Article S3 Bucket");

        element: Element<unknown> = {
            kind: "column", elements: [
                this.categoryStream,
                {
                    kind: "row", name: "Category Exporter Service", shape: "deployment-box", elements: [
                        this.categoryExporter
                    ]
                },
                this.articleS3Bucket
            ]
        };
        edges = [
            edge(this.categoryExporter, this.categoryStream),
            edge(this.categoryExporter, this.articleS3Bucket)
        ];
    }();

    let coreExporter: Element<unknown> = {
        kind: "row", elements: [
            gap(), gap(), gap(), gap(), gap(), gap(),
            productExporterService.element, stockExporterService.element,
            deliveryTimeExporterService.element, categoryExporterService.element
        ]
    };
    let coreExporterEdges = productExporterService.edges
        .concat(stockExporterService.edges)
        .concat(deliveryTimeExporterService.edges)
        .concat(categoryExporterService.edges);

    let core: Element<unknown> = {
        kind: "column", elements: [pdpView.element, coreServices.element, coreExporter]
    };
    let coreEdges = coreServices.edges.concat(coreExporterEdges).concat([
        edge(pdpView.pdpViewComponent, coreServices.productService.productAPI),
        edge(pdpView.pdpViewComponent, coreServices.productService.stockAPI),
        edge(pdpView.searchViewComponent, coreServices.search.factFinderAPI),
        edge(coreServices.coreSiteMap.siteMapGenerator, coreServices.search.factFinderFeedServiceDB),
        edge(coreServices.search.ffProductImporter, productExporterService.productStream),
        edge(coreServices.search.ffProductCampaignsImporter, productExporterService.productCampaignsStream),
        edge(coreServices.search.ffCategoryImporter, categoryExporterService.categoryStream),
        edge(coreServices.productService.productImporter, productExporterService.productStream),
        edge(coreServices.productService.productCampaignsImporter, productExporterService.productCampaignsStream),
        edge(coreServices.productService.nightlyStockImporter, productExporterService.nightlyStockStream),
        edge(coreServices.productService.nearTimeStockImporter, stockExporterService.stockStream),
        edge(coreServices.productService.deliveryTimeImporter, deliveryTimeExporterService.deliveryTimeStream),
        edge(coreServices.productService.categoryImporter, categoryExporterService.categoryStream)
    ]);

    let coreAccount: Element<unknown> = {
        kind: "row", shape: "rectangle", name: "Core VPC", elements: [edutainment.element, core]
    };
    let coreAccountEdges = coreEdges.concat([
        edge(edutainment.contentView.component, coreServices.search.factFinderAPI),
        edge(edutainment.contentView.component, coreServices.productService.productAPI)
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
        edge(articleReport, categoryExporterService.articleS3Bucket)
    ]);

    return graph(overall, overallEdges);
}

export const NewArchitecture: React.FC = () => {
    return (
        <Diagram initialGraph={createInitialGraph()}/>
    );
};