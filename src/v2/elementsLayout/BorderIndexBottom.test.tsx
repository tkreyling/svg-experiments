import {Element} from "../newGraphModel";
import {addBorderIndexBottom, BorderIndexBottom} from "./BorderIndexBottom";

type InputType = Element<unknown>;
type OutputType = Element<BorderIndexBottom>;

test('a single node has borderIndexBottom 0', () => {
    let element: InputType = {kind: "node"};

    addBorderIndexBottom(element);

    let expected: OutputType = {kind: "node", borderIndexBottom: 0};
    expect(element).toStrictEqual(expected)
});

test('a row without elements receives borderIndexBottom 0 itself', () => {
    let element: InputType = {kind: "row", elements: []};

    addBorderIndexBottom(element);

    let expected: OutputType = {kind: "row", borderIndexBottom: 0, elements: []};
    expect(element).toStrictEqual(expected)
});

test('a row with a border has borderIndexBottom 1', () => {
    let element: InputType = {kind: "row", shape: "rectangle", elements: [{kind: "node"}]};

    addBorderIndexBottom(element);

    let expected: OutputType = {
        kind: "row", shape: "rectangle", borderIndexBottom: 1, elements: [{kind: "node", borderIndexBottom: 0}]
    };
    expect(element).toStrictEqual(expected)
});

test('a row with a border and a nested row with a border has borderIndexBottom 2', () => {
    let element: InputType = {
        kind: "row", shape: "rectangle", elements: [{
            kind: "row", shape: "rectangle", elements: [{kind: "node"}]
        }]
    };

    addBorderIndexBottom(element);

    let expected: OutputType = {
        kind: "row", shape: "rectangle", borderIndexBottom: 2, elements: [{
            kind: "row", shape: "rectangle", borderIndexBottom: 1, elements: [{
                kind: "node", borderIndexBottom: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a row with a border and two nested rows with border has borderIndexBottom 2', () => {
    let element: InputType = {
        kind: "row", shape: "rectangle", elements: [{
            kind: "row", shape: "rectangle", elements: [{kind: "node"}]
        }, {
            kind: "row", shape: "rectangle", elements: [{kind: "node"}]
        }]
    };

    addBorderIndexBottom(element);

    let expected: OutputType = {
        kind: "row", shape: "rectangle", borderIndexBottom: 2, elements: [{
            kind: "row", shape: "rectangle", borderIndexBottom: 1, elements: [{
                kind: "node", borderIndexBottom: 0
            }]
        }, {
            kind: "row", shape: "rectangle", borderIndexBottom: 1, elements: [{
                kind: "node", borderIndexBottom: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a row with a border and two nested rows, last one without border, has borderIndexBottom 2', () => {
    let element: InputType = {
        kind: "row", shape: "rectangle", elements: [{
            kind: "row", shape: "rectangle", elements: [{kind: "node"}]
        }, {
            kind: "row", elements: [{kind: "node"}]
        }]
    };

    addBorderIndexBottom(element);

    let expected: OutputType = {
        kind: "row", shape: "rectangle", borderIndexBottom: 2, elements: [{
            kind: "row", shape: "rectangle", borderIndexBottom: 1, elements: [{
                kind: "node", borderIndexBottom: 0
            }]
        }, {
            kind: "row", borderIndexBottom: 0, elements: [{
                kind: "node", borderIndexBottom: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with a border has borderIndexBottom 1', () => {
    let element: InputType = {kind: "column", shape: "rectangle", elements: [{kind: "node"}]};

    addBorderIndexBottom(element);

    let expected: OutputType = {
        kind: "column", shape: "rectangle", borderIndexBottom: 1, elements: [{
            kind: "node", borderIndexBottom: 0
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with a border and a nested row with a border has borderIndexBottom 2', () => {
    let element: InputType = {
        kind: "column", shape: "rectangle", elements: [{
            kind: "row", shape: "rectangle", elements: [{kind: "node"}]
        }]
    };

    addBorderIndexBottom(element);

    let expected: OutputType = {
        kind: "column", shape: "rectangle", borderIndexBottom: 2, elements: [{
            kind: "row", shape: "rectangle", borderIndexBottom: 1, elements: [{
                kind: "node", borderIndexBottom: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with a border and two nested rows with border has borderIndexBottom 2', () => {
    let element: InputType = {
        kind: "column", shape: "rectangle", elements: [{
            kind: "row", shape: "rectangle", elements: [{kind: "node"}]
        }, {
            kind: "row", shape: "rectangle", elements: [{kind: "node"}]
        }]
    };

    addBorderIndexBottom(element);

    let expected: OutputType = {
        kind: "column", shape: "rectangle", borderIndexBottom: 2, elements: [{
            kind: "row", shape: "rectangle", borderIndexBottom: 1, elements: [{
                kind: "node", borderIndexBottom: 0
            }]
        }, {
            kind: "row", shape: "rectangle", borderIndexBottom: 1, elements: [{
                kind: "node", borderIndexBottom: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with a border and two nested rows, last one without border, has borderIndexBottom 1', () => {
    let element: InputType = {
        kind: "column", shape: "rectangle", elements: [{
            kind: "row", shape: "rectangle", elements: [{kind: "node"}]
        }, {
            kind: "row", elements: [{kind: "node"}]
        }]
    };

    addBorderIndexBottom(element);

    let expected: OutputType = {
        kind: "column", shape: "rectangle", borderIndexBottom: 1, elements: [{
            kind: "row", shape: "rectangle", borderIndexBottom: 1, elements: [{
                kind: "node", borderIndexBottom: 0
            }]
        }, {
            kind: "row", borderIndexBottom: 0, elements: [{
                kind: "node", borderIndexBottom: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});