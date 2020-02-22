import {addOffsetYElements, OffsetYElements} from "./addOffsetYElements";
import {Element} from "./newGraphModel";

type InputType = Element<unknown>;
type OutputType = Element<OffsetYElements>;

test('a single node has offsetYElements 0', () => {
    let element: InputType = {kind: "node"};

    addOffsetYElements(element);

    let expected: OutputType = {kind: "node", offsetYElements: 0};
    expect(element).toStrictEqual(expected)
});

test('a row without elements receives offsetYElements 0 itself', () => {
    let element: InputType = {kind: "row", elements: []};

    addOffsetYElements(element);

    let expected: OutputType = {kind: "row", offsetYElements: 0, elements: []};
    expect(element).toStrictEqual(expected)
});

test('a single node in a row has offsetYElements 0', () => {
    let element: InputType = {kind: "row", elements: [{kind: "node"}]};

    addOffsetYElements(element);

    let expected: OutputType = {
        kind: "row", offsetYElements: 0, elements: [{kind: "node", offsetYElements: 0}]
    };
    expect(element).toStrictEqual(expected)
});

test('the second node in a row has also offsetYElements 0', () => {
    let element: InputType = {kind: "row", elements: [{kind: "node"}, {kind: "node"}]};

    addOffsetYElements(element);

    let expected: OutputType = {
        kind: "row", offsetYElements: 0, elements: [{
            kind: "node", offsetYElements: 0
        }, {
            kind: "node", offsetYElements: 0
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a node nested twice in rows has offsetYElements 0', () => {
    let element: InputType = {
        kind: "row", elements: [{
            kind: "row", elements: [{
                kind: "node"
            }]
        }]
    };

    addOffsetYElements(element);

    let expected: OutputType = {
        kind: "row", offsetYElements: 0, elements: [{
            kind: "row", offsetYElements: 0, elements: [{
                kind: "node", offsetYElements: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a node after an row has also offsetYElements 0', () => {
    let element: InputType = {
        kind: "row", elements: [{
            kind: "row", elements: [{
                kind: "node"
            }]
        }, {
            kind: "node"
        }]
    };

    addOffsetYElements(element);

    let expected: OutputType = {
        kind: "row", offsetYElements: 0, elements: [{
            kind: "row", offsetYElements: 0, elements: [{
                kind: "node", offsetYElements: 0
            }]
        }, {
            kind: "node", offsetYElements: 0
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a single node in a column has offsetYElements 0', () => {
    let element: InputType = {kind: "column", elements: [{kind: "node"}]};

    addOffsetYElements(element);

    let expected: OutputType = {
        kind: "column", offsetYElements: 0, elements: [{kind: "node", offsetYElements: 0}]
    };
    expect(element).toStrictEqual(expected)
});

test('the second node in a columns has offsetYElements 1', () => {
    let element: InputType = {kind: "column", elements: [{kind: "node"}, {kind: "node"}]};

    addOffsetYElements(element);

    let expected: OutputType = {
        kind: "column", offsetYElements: 0, elements: [{
            kind: "node", offsetYElements: 0
        }, {
            kind: "node", offsetYElements: 1
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a node nested twice in columns has offsetYElements 0', () => {
    let element: InputType = {
        kind: "column", elements: [{
            kind: "column", elements: [{
                kind: "node"
            }]
        }]
    };

    addOffsetYElements(element);

    let expected: OutputType = {
        kind: "column", offsetYElements: 0, elements: [{
            kind: "column", offsetYElements: 0, elements: [{
                kind: "node", offsetYElements: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a node after an column in a row has offsetYElements 0', () => {
    let element: InputType = {
        kind: "row", elements: [{
            kind: "column", elements: [{
                kind: "node"
            }]
        }, {
            kind: "node"
        }]
    };

    addOffsetYElements(element);

    let expected: OutputType = {
        kind: "row", offsetYElements: 0, elements: [{
            kind: "column", offsetYElements: 0, elements: [{
                kind: "node", offsetYElements: 0
            }]
        }, {
            kind: "node", offsetYElements: 0
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('every row inside of a column receives an increased offsetYElements', () => {
    let element: InputType = {
        kind: "column", elements: [{
            kind: "row", elements: [{
                kind: "node"
            }, {
                kind: "node"
            }, {
                kind: "node"
            }]
        }, {
            kind: "row", elements: [{
                kind: "node"
            }, {
                kind: "node"
            }]
        }]
    };

    addOffsetYElements(element);

    let expected: OutputType =  {
        kind: "column", offsetYElements: 0, elements: [{
            kind: "row", offsetYElements: 0, elements: [{
                kind: "node", offsetYElements: 0
            }, {
                kind: "node", offsetYElements: 0
            }, {
                kind: "node", offsetYElements: 0
            }]
        }, {
            kind: "row", offsetYElements: 1, elements: [{
                kind: "node", offsetYElements: 1
            }, {
                kind: "node", offsetYElements: 1
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('columns inside of a row have independent offsetYElements', () => {
    let element: InputType = {
        kind: "row", elements: [{
            kind: "column", elements: [{
                kind: "node"
            }, {
                kind: "node"
            }, {
                kind: "node"
            }]
        }, {
            kind: "column", elements: [{
                kind: "node"
            }, {
                kind: "node"
            }]
        }]
    };

    addOffsetYElements(element);

    let expected: OutputType =  {
        kind: "row", offsetYElements: 0, elements: [{
            kind: "column", offsetYElements: 0, elements: [{
                kind: "node", offsetYElements: 0
            }, {
                kind: "node", offsetYElements: 1
            }, {
                kind: "node", offsetYElements: 2
            }]
        }, {
            kind: "column", offsetYElements: 0, elements: [{
                kind: "node", offsetYElements: 0
            }, {
                kind: "node", offsetYElements: 1
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a node after a row in one column receives the max offsetYElements increased by one', () => {
    let element: InputType = {
        kind: "column", elements: [{
            kind: "row", elements: [{
                kind: "column", elements: [{
                    kind: "node"
                }, {
                    kind: "node"
                }, {
                    kind: "node"
                }]
            }, {
                kind: "column", elements: [{
                    kind: "node"
                }, {
                    kind: "node"
                }]
            }]
        }, {
            kind: "node"
        }]
    };

    addOffsetYElements(element);

    let expected: OutputType = {
        kind: "column", offsetYElements: 0, elements: [{
            kind: "row", offsetYElements: 0, elements: [{
                kind: "column", offsetYElements: 0, elements: [{
                    kind: "node", offsetYElements: 0
                }, {
                    kind: "node", offsetYElements: 1
                }, {
                    kind: "node", offsetYElements: 2
                }]
            }, {
                kind: "column", offsetYElements: 0, elements: [{
                    kind: "node", offsetYElements: 0
                }, {
                    kind: "node", offsetYElements: 1
                }]
            }]
        }, {
            kind: "node", offsetYElements: 3
        }]
    };
    expect(element).toStrictEqual(expected)
});