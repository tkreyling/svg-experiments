import {Element} from "./newGraphModel";
import {addLeftBorderIndex, LeftBorderIndex} from "./addLeftBorderIndex";

type InputType = Element<unknown>;
type OutputType = Element<LeftBorderIndex>;

test('a single node has leftBorderIndex 0', () => {
    let element: InputType = {kind: "node"};

    addLeftBorderIndex(element);

    let expected: OutputType = {kind: "node", leftBorderIndex: 0};
    expect(element).toStrictEqual(expected)
});

test('a row without elements receives leftBorderIndex 0 itself', () => {
    let element: InputType = {kind: "row", elements: []};

    addLeftBorderIndex(element);

    let expected: OutputType = {kind: "row", leftBorderIndex: 0, elements: []};
    expect(element).toStrictEqual(expected)
});

test('a row with a border has leftBorderIndex 1', () => {
    let element: InputType = {kind: "row", border: "solid", elements: [{kind: "node"}]};

    addLeftBorderIndex(element);

    let expected: OutputType = {
        kind: "row", border: "solid", leftBorderIndex: 1, elements: [{kind: "node", leftBorderIndex: 0}]
    };
    expect(element).toStrictEqual(expected)
});

test('a row with a border and a nested row with a border has leftBorderIndex 2', () => {
    let element: InputType = {
        kind: "row", border: "solid", elements: [{
            kind: "row", border: "solid", elements: [{kind: "node"}]
        }]
    };

    addLeftBorderIndex(element);

    let expected: OutputType = {
        kind: "row", border: "solid", leftBorderIndex: 2, elements: [{
            kind: "row", border: "solid", leftBorderIndex: 1, elements: [{
                kind: "node", leftBorderIndex: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a row with a border and two nested rows with border has leftBorderIndex 2', () => {
    let element: InputType = {
        kind: "row", border: "solid", elements: [{
            kind: "row", border: "solid", elements: [{kind: "node"}]
        }, {
            kind: "row", border: "solid", elements: [{kind: "node"}]
        }]
    };

    addLeftBorderIndex(element);

    let expected: OutputType = {
        kind: "row", border: "solid", leftBorderIndex: 2, elements: [{
            kind: "row", border: "solid", leftBorderIndex: 1, elements: [{
                kind: "node", leftBorderIndex: 0
            }]
        }, {
            kind: "row", border: "solid", leftBorderIndex: 1, elements: [{
                kind: "node", leftBorderIndex: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a row with a border and two nested rows, first on without border, has leftBorderIndex 1', () => {
    let element: InputType = {
        kind: "row", border: "solid", elements: [{
            kind: "row", elements: [{kind: "node"}]
        }, {
            kind: "row", border: "solid", elements: [{kind: "node"}]
        }]
    };

    addLeftBorderIndex(element);

    let expected: OutputType = {
        kind: "row", border: "solid", leftBorderIndex: 1, elements: [{
            kind: "row", leftBorderIndex: 0, elements: [{
                kind: "node", leftBorderIndex: 0
            }]
        }, {
            kind: "row", border: "solid", leftBorderIndex: 1, elements: [{
                kind: "node", leftBorderIndex: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with a border has leftBorderIndex 1', () => {
    let element: InputType = {kind: "column", border: "solid", elements: [{kind: "node"}]};

    addLeftBorderIndex(element);

    let expected: OutputType = {
        kind: "column", border: "solid", leftBorderIndex: 1, elements: [{
            kind: "node", leftBorderIndex: 0
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with a border and a nested row with a border has leftBorderIndex 2', () => {
    let element: InputType = {
        kind: "column", border: "solid", elements: [{
            kind: "row", border: "solid", elements: [{kind: "node"}]
        }]
    };

    addLeftBorderIndex(element);

    let expected: OutputType = {
        kind: "column", border: "solid", leftBorderIndex: 2, elements: [{
            kind: "row", border: "solid", leftBorderIndex: 1, elements: [{
                kind: "node", leftBorderIndex: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with a border and two nested rows with border has leftBorderIndex 2', () => {
    let element: InputType = {
        kind: "column", border: "solid", elements: [{
            kind: "row", border: "solid", elements: [{kind: "node"}]
        }, {
            kind: "row", border: "solid", elements: [{kind: "node"}]
        }]
    };

    addLeftBorderIndex(element);

    let expected: OutputType = {
        kind: "column", border: "solid", leftBorderIndex: 2, elements: [{
            kind: "row", border: "solid", leftBorderIndex: 1, elements: [{
                kind: "node", leftBorderIndex: 0
            }]
        }, {
            kind: "row", border: "solid", leftBorderIndex: 1, elements: [{
                kind: "node", leftBorderIndex: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with a border and two nested rows, not all with border, has leftBorderIndex 2', () => {
    let element: InputType = {
        kind: "column", border: "solid", elements: [{
            kind: "row", elements: [{kind: "node"}]
        }, {
            kind: "row", border: "solid", elements: [{kind: "node"}]
        }]
    };

    addLeftBorderIndex(element);

    let expected: OutputType = {
        kind: "column", border: "solid", leftBorderIndex: 2, elements: [{
            kind: "row", leftBorderIndex: 0, elements: [{
                kind: "node", leftBorderIndex: 0
            }]
        }, {
            kind: "row", border: "solid", leftBorderIndex: 1, elements: [{
                kind: "node", leftBorderIndex: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});