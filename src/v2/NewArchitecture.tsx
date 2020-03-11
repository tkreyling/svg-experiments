import React from "react";
import {component, db, dbTable, edge, Element, gap, graph, node, queue, s3Bucket, system} from "./newGraphModel";
import {Diagram} from "./Diagram";

function createInitialGraph() {
    let overall = new class {
        customerBrowser = new class {
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

        coreAccount = new class {
            edutainment = new class {
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

            core = new class {
                pdpView = new class {
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

                services = new class {
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

                exporter = new class {
                    productExporterService = new class {
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

                    stockExporterService = new class {
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

                    deliveryTimeExporterService = new class {
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

                    categoryExporterService = new class {
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

                    element: Element<unknown> = {
                        kind: "row", elements: [
                            gap(), gap(), gap(), gap(), gap(), gap(),
                            this.productExporterService.element, this.stockExporterService.element,
                            this.deliveryTimeExporterService.element, this.categoryExporterService.element
                        ]
                    };

                    edges = this.productExporterService.edges
                        .concat(this.stockExporterService.edges)
                        .concat(this.deliveryTimeExporterService.edges)
                        .concat(this.categoryExporterService.edges);
                }();

                element: Element<unknown> = {
                    kind: "column", elements: [
                        this.pdpView.element,
                        this.services.element,
                        this.exporter.element
                    ]
                };

                edges = this.services.edges.concat(this.exporter.edges).concat([
                    edge(this.pdpView.pdpViewComponent, this.services.productService.productAPI),
                    edge(this.pdpView.pdpViewComponent, this.services.productService.stockAPI),
                    edge(this.pdpView.searchViewComponent, this.services.search.factFinderAPI),
                    edge(this.services.coreSiteMap.siteMapGenerator, this.services.search.factFinderFeedServiceDB),
                    edge(this.services.search.ffProductImporter, this.exporter.productExporterService.productStream),
                    edge(this.services.search.ffProductCampaignsImporter, this.exporter.productExporterService.productCampaignsStream),
                    edge(this.services.search.ffCategoryImporter, this.exporter.categoryExporterService.categoryStream),
                    edge(this.services.productService.productImporter, this.exporter.productExporterService.productStream),
                    edge(this.services.productService.productCampaignsImporter, this.exporter.productExporterService.productCampaignsStream),
                    edge(this.services.productService.nightlyStockImporter, this.exporter.productExporterService.nightlyStockStream),
                    edge(this.services.productService.nearTimeStockImporter, this.exporter.stockExporterService.stockStream),
                    edge(this.services.productService.deliveryTimeImporter, this.exporter.deliveryTimeExporterService.deliveryTimeStream),
                    edge(this.services.productService.categoryImporter, this.exporter.categoryExporterService.categoryStream)
                ]);
            }();

            element: Element<unknown> = {
                kind: "row", shape: "rectangle", name: "Core VPC", elements: [
                    this.edutainment.element, this.core.element
                ]
            };

            edges = this.core.edges.concat([
                edge(this.edutainment.contentView.component, this.core.services.search.factFinderAPI),
                edge(this.edutainment.contentView.component, this.core.services.productService.productAPI)
            ]);
        }();

        backendSystems = new class {
            contentful = new class {
                content = node("Site Content");
                catalogContent = node("Catalog specific Content");
                productContent = node("Product specific Content");

                element: Element<unknown> = {
                    kind: "row", name: "Contentful", shape: "deployment-box",
                    elements: [
                        this.content,
                        this.catalogContent,
                        this.productContent
                    ]
                };
            }();

            tds = new class {
                shopNowDB = new class {
                    mediaData = dbTable("Media Data");

                    element: Element<unknown> = {
                        kind: "row", name: "ShopNow DB", shape: "db-cylinder",
                        elements: [this.mediaData]
                    };
                }();

                mediathek = new class {
                    element = system("Mediathek");
                }();

                mercator = new class {
                    mercatorStagingDB = db("Mercator Staging DB");
                    mercatorDB = db("Mercator DB");
                    mercatorComponent = system("Mercator");

                    element: Element<unknown> = {
                        kind: "column",
                        elements: [{
                            kind: "row",
                            elements: [this.mercatorStagingDB, this.mercatorDB]
                        }, {
                            kind: "row",
                            elements: [gap(), this.mercatorComponent]
                        }]
                    };

                    edges = [
                        edge(this.mercatorComponent, this.mercatorDB),
                        edge(this.mercatorDB, this.mercatorStagingDB)
                    ];
                }();

                sapERP = new class {
                    articleReport = component("Article Report");

                    element: Element<unknown> = {
                        kind: "column", name: "SAP ERP / Retail", shape: "deployment-box",
                        elements: [this.articleReport]
                    };
                }();

                element: Element<unknown> = {
                    kind: "row", shape: "rectangle", name: "TDS", elements: [
                        {
                            kind: "column", elements: [
                                this.shopNowDB.element,
                                this.mediathek.element
                            ]
                        },
                        this.mercator.element, gap(), gap(),
                        this.sapERP.element
                    ]
                };

                edges = this.mercator.edges.concat([
                    edge(this.mediathek.element, this.shopNowDB.mediaData)
                ]);
            }();

            element: Element<unknown> = {
                kind: "row", elements: [this.contentful.element, gap(), gap(), gap(), gap(), gap(), this.tds.element]
            };
        }();

        element: Element<unknown> = {
            kind: "column", elements: [
                this.customerBrowser.element,
                this.coreAccount.element,
                this.backendSystems.element
            ]
        };

        edges = this.coreAccount.edges.concat(this.backendSystems.tds.edges).concat([
            edge(this.coreAccount.edutainment.contentView.component, this.customerBrowser.contentViewComponent),
            edge(this.coreAccount.core.pdpView.searchViewComponent, this.customerBrowser.searchViewComponent),
            edge(this.coreAccount.core.pdpView.pdpViewComponent, this.customerBrowser.pdpViewComponent),
            edge(this.coreAccount.edutainment.contentView.component, this.backendSystems.contentful.content),
            edge(this.coreAccount.core.pdpView.searchViewComponent, this.backendSystems.contentful.catalogContent),
            edge(this.coreAccount.core.pdpView.pdpViewComponent, this.backendSystems.contentful.productContent),
            edge(this.coreAccount.core.exporter.productExporterService.productExporter, this.backendSystems.tds.shopNowDB.mediaData),
            edge(this.coreAccount.core.exporter.productExporterService.productExporter, this.backendSystems.tds.mercator.mercatorStagingDB),
            edge(this.coreAccount.core.exporter.productExporterService.productCampaignsExporter, this.backendSystems.tds.mercator.mercatorStagingDB),
            edge(this.coreAccount.core.exporter.productExporterService.nightlyStockExporter, this.backendSystems.tds.mercator.mercatorStagingDB),
            edge(this.backendSystems.tds.sapERP.articleReport, this.coreAccount.core.exporter.categoryExporterService.articleS3Bucket)
        ]);
    }();

    return graph(overall.element, overall.edges);
}

export const NewArchitecture: React.FC = () => {
    return (
        <Diagram initialGraph={createInitialGraph()}/>
    );
};