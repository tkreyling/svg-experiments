import {Element} from "./newGraphModel";
import {addRightBorderIndex, RightBorderIndex} from "./addRightBorderIndex";

type InputType = Element<unknown>;
type OutputType = Element<RightBorderIndex>;

test('a single node has rightBorderIndex 0', () => {
    let element: InputType = {kind: "node"};

    addRightBorderIndex(element);

    let expected: OutputType = {kind: "node", rightBorderIndex: 0};
    expect(element).toStrictEqual(expected)
});

test('a row without elements receives rightBorderIndex 0 itself', () => {
    let element: InputType = {kind: "row", elements: []};

    addRightBorderIndex(element);

    let expected: OutputType = {kind: "row", rightBorderIndex: 0, elements: []};
    expect(element).toStrictEqual(expected)
});

test('a row with a border has rightBorderIndex 1', () => {
    let element: InputType = {kind: "row", border: "solid", elements: [{kind: "node"}]};

    addRightBorderIndex(element);

    let expected: OutputType = {
        kind: "row", border: "solid", rightBorderIndex: 1, elements: [{kind: "node", rightBorderIndex: 0}]
    };
    expect(element).toStrictEqual(expected)
});

test('a row with a border and a nested row with a border has rightBorderIndex 2', () => {
    let element: InputType = {
        kind: "row", border: "solid", elements: [{
            kind: "row", border: "solid", elements: [{kind: "node"}]
        }]
    };

    addRightBorderIndex(element);

    let expected: OutputType = {
        kind: "row", border: "solid", rightBorderIndex: 2, elements: [{
            kind: "row", border: "solid", rightBorderIndex: 1, elements: [{
                kind: "node", rightBorderIndex: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a row with a border and two nested rows with border has rightBorderIndex 2', () => {
    let element: InputType = {
        kind: "row", border: "solid", elements: [{
            kind: "row", border: "solid", elements: [{kind: "node"}]
        }, {
            kind: "row", border: "solid", elements: [{kind: "node"}]
        }]
    };

    addRightBorderIndex(element);

    let expected: OutputType = {
        kind: "row", border: "solid", rightBorderIndex: 2, elements: [{
            kind: "row", border: "solid", rightBorderIndex: 1, elements: [{
                kind: "node", rightBorderIndex: 0
            }]
        }, {
            kind: "row", border: "solid", rightBorderIndex: 1, elements: [{
                kind: "node", rightBorderIndex: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a row with a border and two nested rows, last one without border, has rightBorderIndex 1', () => {
    let element: InputType = {
        kind: "row", border: "solid", elements: [{
            kind: "row", border: "solid", elements: [{kind: "node"}]
        }, {
            kind: "row", elements: [{kind: "node"}]
        }]
    };

    addRightBorderIndex(element);

    let expected: OutputType = {
        kind: "row", border: "solid", rightBorderIndex: 1, elements: [{
            kind: "row", border: "solid", rightBorderIndex: 1, elements: [{
                kind: "node", rightBorderIndex: 0
            }]
        }, {
            kind: "row", rightBorderIndex: 0, elements: [{
                kind: "node", rightBorderIndex: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with a border has rightBorderIndex 1', () => {
    let element: InputType = {kind: "column", border: "solid", elements: [{kind: "node"}]};

    addRightBorderIndex(element);

    let expected: OutputType = {
        kind: "column", border: "solid", rightBorderIndex: 1, elements: [{
            kind: "node", rightBorderIndex: 0
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with a border and a nested row with a border has rightBorderIndex 2', () => {
    let element: InputType = {
        kind: "column", border: "solid", elements: [{
            kind: "row", border: "solid", elements: [{kind: "node"}]
        }]
    };

    addRightBorderIndex(element);

    let expected: OutputType = {
        kind: "column", border: "solid", rightBorderIndex: 2, elements: [{
            kind: "row", border: "solid", rightBorderIndex: 1, elements: [{
                kind: "node", rightBorderIndex: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with a border and two nested rows with border has rightBorderIndex 2', () => {
    let element: InputType = {
        kind: "column", border: "solid", elements: [{
            kind: "row", border: "solid", elements: [{kind: "node"}]
        }, {
            kind: "row", border: "solid", elements: [{kind: "node"}]
        }]
    };

    addRightBorderIndex(element);

    let expected: OutputType = {
        kind: "column", border: "solid", rightBorderIndex: 2, elements: [{
            kind: "row", border: "solid", rightBorderIndex: 1, elements: [{
                kind: "node", rightBorderIndex: 0
            }]
        }, {
            kind: "row", border: "solid", rightBorderIndex: 1, elements: [{
                kind: "node", rightBorderIndex: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with a border and two nested rows, not all with border, has rightBorderIndex 2', () => {
    let element: InputType = {
        kind: "column", border: "solid", elements: [{
            kind: "row", elements: [{kind: "node"}]
        }, {
            kind: "row", border: "solid", elements: [{kind: "node"}]
        }]
    };

    addRightBorderIndex(element);

    let expected: OutputType = {
        kind: "column", border: "solid", rightBorderIndex: 2, elements: [{
            kind: "row", rightBorderIndex: 0, elements: [{
                kind: "node", rightBorderIndex: 0
            }]
        }, {
            kind: "row", border: "solid", rightBorderIndex: 1, elements: [{
                kind: "node", rightBorderIndex: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});