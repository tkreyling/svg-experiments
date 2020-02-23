import {addOffsetElementsY, OffsetElementsY} from "./OffsetElementsY";
import {Element} from "./newGraphModel";

type InputType = Element<unknown>;
type OutputType = Element<OffsetElementsY>;

test('a single node has offsetElementsY 0', () => {
    let element: InputType = {kind: "node"};

    addOffsetElementsY(element);

    let expected: OutputType = {kind: "node", offsetElementsY: 0};
    expect(element).toStrictEqual(expected)
});

test('a row without elements receives offsetElementsY 0 itself', () => {
    let element: InputType = {kind: "row", elements: []};

    addOffsetElementsY(element);

    let expected: OutputType = {kind: "row", offsetElementsY: 0, elements: []};
    expect(element).toStrictEqual(expected)
});

test('a single node in a row has offsetElementsY 0', () => {
    let element: InputType = {kind: "row", elements: [{kind: "node"}]};

    addOffsetElementsY(element);

    let expected: OutputType = {
        kind: "row", offsetElementsY: 0, elements: [{kind: "node", offsetElementsY: 0}]
    };
    expect(element).toStrictEqual(expected)
});

test('the second node in a row has also offsetElementsY 0', () => {
    let element: InputType = {kind: "row", elements: [{kind: "node"}, {kind: "node"}]};

    addOffsetElementsY(element);

    let expected: OutputType = {
        kind: "row", offsetElementsY: 0, elements: [{
            kind: "node", offsetElementsY: 0
        }, {
            kind: "node", offsetElementsY: 0
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a node nested twice in rows has offsetElementsY 0', () => {
    let element: InputType = {
        kind: "row", elements: [{
            kind: "row", elements: [{
                kind: "node"
            }]
        }]
    };

    addOffsetElementsY(element);

    let expected: OutputType = {
        kind: "row", offsetElementsY: 0, elements: [{
            kind: "row", offsetElementsY: 0, elements: [{
                kind: "node", offsetElementsY: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a node after an row has also offsetElementsY 0', () => {
    let element: InputType = {
        kind: "row", elements: [{
            kind: "row", elements: [{
                kind: "node"
            }]
        }, {
            kind: "node"
        }]
    };

    addOffsetElementsY(element);

    let expected: OutputType = {
        kind: "row", offsetElementsY: 0, elements: [{
            kind: "row", offsetElementsY: 0, elements: [{
                kind: "node", offsetElementsY: 0
            }]
        }, {
            kind: "node", offsetElementsY: 0
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a single node in a column has offsetElementsY 0', () => {
    let element: InputType = {kind: "column", elements: [{kind: "node"}]};

    addOffsetElementsY(element);

    let expected: OutputType = {
        kind: "column", offsetElementsY: 0, elements: [{kind: "node", offsetElementsY: 0}]
    };
    expect(element).toStrictEqual(expected)
});

test('the second node in a columns has offsetElementsY 1', () => {
    let element: InputType = {kind: "column", elements: [{kind: "node"}, {kind: "node"}]};

    addOffsetElementsY(element);

    let expected: OutputType = {
        kind: "column", offsetElementsY: 0, elements: [{
            kind: "node", offsetElementsY: 0
        }, {
            kind: "node", offsetElementsY: 1
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a node nested twice in columns has offsetElementsY 0', () => {
    let element: InputType = {
        kind: "column", elements: [{
            kind: "column", elements: [{
                kind: "node"
            }]
        }]
    };

    addOffsetElementsY(element);

    let expected: OutputType = {
        kind: "column", offsetElementsY: 0, elements: [{
            kind: "column", offsetElementsY: 0, elements: [{
                kind: "node", offsetElementsY: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a node after an column in a row has offsetElementsY 0', () => {
    let element: InputType = {
        kind: "row", elements: [{
            kind: "column", elements: [{
                kind: "node"
            }]
        }, {
            kind: "node"
        }]
    };

    addOffsetElementsY(element);

    let expected: OutputType = {
        kind: "row", offsetElementsY: 0, elements: [{
            kind: "column", offsetElementsY: 0, elements: [{
                kind: "node", offsetElementsY: 0
            }]
        }, {
            kind: "node", offsetElementsY: 0
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('every row inside of a column receives an increased offsetElementsY', () => {
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

    addOffsetElementsY(element);

    let expected: OutputType =  {
        kind: "column", offsetElementsY: 0, elements: [{
            kind: "row", offsetElementsY: 0, elements: [{
                kind: "node", offsetElementsY: 0
            }, {
                kind: "node", offsetElementsY: 0
            }, {
                kind: "node", offsetElementsY: 0
            }]
        }, {
            kind: "row", offsetElementsY: 1, elements: [{
                kind: "node", offsetElementsY: 1
            }, {
                kind: "node", offsetElementsY: 1
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('columns inside of a row have independent offsetElementsY', () => {
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

    addOffsetElementsY(element);

    let expected: OutputType =  {
        kind: "row", offsetElementsY: 0, elements: [{
            kind: "column", offsetElementsY: 0, elements: [{
                kind: "node", offsetElementsY: 0
            }, {
                kind: "node", offsetElementsY: 1
            }, {
                kind: "node", offsetElementsY: 2
            }]
        }, {
            kind: "column", offsetElementsY: 0, elements: [{
                kind: "node", offsetElementsY: 0
            }, {
                kind: "node", offsetElementsY: 1
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a node after a row in one column receives the max offsetElementsY increased by one', () => {
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

    addOffsetElementsY(element);

    let expected: OutputType = {
        kind: "column", offsetElementsY: 0, elements: [{
            kind: "row", offsetElementsY: 0, elements: [{
                kind: "column", offsetElementsY: 0, elements: [{
                    kind: "node", offsetElementsY: 0
                }, {
                    kind: "node", offsetElementsY: 1
                }, {
                    kind: "node", offsetElementsY: 2
                }]
            }, {
                kind: "column", offsetElementsY: 0, elements: [{
                    kind: "node", offsetElementsY: 0
                }, {
                    kind: "node", offsetElementsY: 1
                }]
            }]
        }, {
            kind: "node", offsetElementsY: 3
        }]
    };
    expect(element).toStrictEqual(expected)
});