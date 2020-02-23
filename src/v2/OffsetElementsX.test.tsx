import {addOffsetElementsX, OffsetElementsX} from "./OffsetElementsX";
import {Element} from "./newGraphModel";

type InputType = Element<unknown>;
type OutputType = Element<OffsetElementsX>;

test('a single node has offsetElementsX 0', () => {
    let element: InputType = {kind: "node"};

    addOffsetElementsX(element);

    let expected: OutputType = {kind: "node", offsetElementsX: 0};
    expect(element).toStrictEqual(expected)
});

test('a row without elements receives offsetElementsX 0 itself', () => {
    let element: InputType = {kind: "row", elements: []};

    addOffsetElementsX(element);

    let expected: OutputType = {kind: "row", offsetElementsX: 0, elements: []};
    expect(element).toStrictEqual(expected)
});

test('a single node in a row has offsetElementsX 0', () => {
    let element: InputType = {kind: "row", elements: [{kind: "node"}]};

    addOffsetElementsX(element);

    let expected: OutputType = {
        kind: "row", offsetElementsX: 0, elements: [{kind: "node", offsetElementsX: 0}]
    };
    expect(element).toStrictEqual(expected)
});

test('the second node in a row has offsetElementsX 1', () => {
    let element: InputType = {kind: "row", elements: [{kind: "node"}, {kind: "node"}]};

    addOffsetElementsX(element);

    let expected: OutputType = {
        kind: "row", offsetElementsX: 0, elements: [{
            kind: "node", offsetElementsX: 0
        }, {
            kind: "node", offsetElementsX: 1
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a node nested twice in rows has offsetElementsX 0', () => {
    let element: InputType = {
        kind: "row", elements: [{
            kind: "row", elements: [{
                kind: "node"
            }]
        }]
    };

    addOffsetElementsX(element);

    let expected: OutputType = {
        kind: "row", offsetElementsX: 0, elements: [{
            kind: "row", offsetElementsX: 0, elements: [{
                kind: "node", offsetElementsX: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a node after an row has an increased offsetElementsX', () => {
    let element: InputType = {
        kind: "row", elements: [{
            kind: "row", elements: [{
                kind: "node"
            }]
        }, {
            kind: "node"
        }]
    };

    addOffsetElementsX(element);

    let expected: OutputType = {
        kind: "row", offsetElementsX: 0, elements: [{
            kind: "row", offsetElementsX: 0, elements: [{
                kind: "node", offsetElementsX: 0
            }]
        }, {
            kind: "node", offsetElementsX: 1
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a single node in a column has offsetElementsX 0', () => {
    let element: InputType = {kind: "column", elements: [{kind: "node"}]};

    addOffsetElementsX(element);

    let expected: OutputType = {
        kind: "column", offsetElementsX: 0, elements: [{kind: "node", offsetElementsX: 0}]
    };
    expect(element).toStrictEqual(expected)
});

test('the second node in a columns has the same offsetElementsX', () => {
    let element: InputType = {kind: "column", elements: [{kind: "node"}, {kind: "node"}]};

    addOffsetElementsX(element);

    let expected: OutputType = {
        kind: "column", offsetElementsX: 0, elements: [{
            kind: "node", offsetElementsX: 0
        }, {
            kind: "node", offsetElementsX: 0
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a node nested twice in columns has offsetElementsX 0', () => {
    let element: InputType = {
        kind: "column", elements: [{
            kind: "column", elements: [{
                kind: "node"
            }]
        }]
    };

    addOffsetElementsX(element);

    let expected: OutputType = {
        kind: "column", offsetElementsX: 0, elements: [{
            kind: "column", offsetElementsX: 0, elements: [{
                kind: "node", offsetElementsX: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a node after an column in a row has an increased offsetElementsX', () => {
    let element: InputType = {
        kind: "row", elements: [{
            kind: "column", elements: [{
                kind: "node"
            }]
        }, {
            kind: "node"
        }]
    };

    addOffsetElementsX(element);

    let expected: OutputType = {
        kind: "row", offsetElementsX: 0, elements: [{
            kind: "column", offsetElementsX: 0, elements: [{
                kind: "node", offsetElementsX: 0
            }]
        }, {
            kind: "node", offsetElementsX: 1
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('rows inside of a column have independent offsetElementsX', () => {
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

    addOffsetElementsX(element);

    let expected: OutputType =  {
        kind: "column", offsetElementsX: 0, elements: [{
            kind: "row", offsetElementsX: 0, elements: [{
                kind: "node", offsetElementsX: 0
            }, {
                kind: "node", offsetElementsX: 1
            }, {
                kind: "node", offsetElementsX: 2
            }]
        }, {
            kind: "row", offsetElementsX: 0, elements: [{
                kind: "node", offsetElementsX: 0
            }, {
                kind: "node", offsetElementsX: 1
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a node after a column receives the max offsetElementsX increased by one', () => {
    let element: InputType = {
        kind: "row", elements: [{
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
        }, {
            kind: "node"
        }]
    };

    addOffsetElementsX(element);

    let expected: OutputType = {
        kind: "row", offsetElementsX: 0, elements: [{
            kind: "column", offsetElementsX: 0, elements: [{
                kind: "row", offsetElementsX: 0, elements: [{
                    kind: "node", offsetElementsX: 0
                }, {
                    kind: "node", offsetElementsX: 1
                }, {
                    kind: "node", offsetElementsX: 2
                }]
            }, {
                kind: "row", offsetElementsX: 0, elements: [{
                    kind: "node", offsetElementsX: 0
                }, {
                    kind: "node", offsetElementsX: 1
                }]
            }]
        }, {
            kind: "node", offsetElementsX: 3
        }]
    };
    expect(element).toStrictEqual(expected)
});