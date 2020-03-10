import {Element} from "../newGraphModel";
import {addBorderIndexLeft, BorderIndexLeft} from "./BorderIndexLeft";

type InputType = Element<unknown>;
type OutputType = Element<BorderIndexLeft>;

test('a single node has borderIndexLeft 0', () => {
    let element: InputType = {kind: "node"};

    addBorderIndexLeft(element);

    let expected: OutputType = {kind: "node", borderIndexLeft: 0};
    expect(element).toStrictEqual(expected)
});

test('a row without elements receives borderIndexLeft 0 itself', () => {
    let element: InputType = {kind: "row", elements: []};

    addBorderIndexLeft(element);

    let expected: OutputType = {kind: "row", borderIndexLeft: 0, elements: []};
    expect(element).toStrictEqual(expected)
});

test('a row with a border has borderIndexLeft 1', () => {
    let element: InputType = {kind: "row", shape: "rectangle", elements: [{kind: "node"}]};

    addBorderIndexLeft(element);

    let expected: OutputType = {
        kind: "row", shape: "rectangle", borderIndexLeft: 1, elements: [{kind: "node", borderIndexLeft: 0}]
    };
    expect(element).toStrictEqual(expected)
});

test('a row with a border and a nested row with a border has borderIndexLeft 2', () => {
    let element: InputType = {
        kind: "row", shape: "rectangle", elements: [{
            kind: "row", shape: "rectangle", elements: [{kind: "node"}]
        }]
    };

    addBorderIndexLeft(element);

    let expected: OutputType = {
        kind: "row", shape: "rectangle", borderIndexLeft: 2, elements: [{
            kind: "row", shape: "rectangle", borderIndexLeft: 1, elements: [{
                kind: "node", borderIndexLeft: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a row with a border and two nested rows with border has borderIndexLeft 2', () => {
    let element: InputType = {
        kind: "row", shape: "rectangle", elements: [{
            kind: "row", shape: "rectangle", elements: [{kind: "node"}]
        }, {
            kind: "row", shape: "rectangle", elements: [{kind: "node"}]
        }]
    };

    addBorderIndexLeft(element);

    let expected: OutputType = {
        kind: "row", shape: "rectangle", borderIndexLeft: 2, elements: [{
            kind: "row", shape: "rectangle", borderIndexLeft: 1, elements: [{
                kind: "node", borderIndexLeft: 0
            }]
        }, {
            kind: "row", shape: "rectangle", borderIndexLeft: 1, elements: [{
                kind: "node", borderIndexLeft: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a row with a border and two nested rows, first on without border, has borderIndexLeft 1', () => {
    let element: InputType = {
        kind: "row", shape: "rectangle", elements: [{
            kind: "row", elements: [{kind: "node"}]
        }, {
            kind: "row", shape: "rectangle", elements: [{kind: "node"}]
        }]
    };

    addBorderIndexLeft(element);

    let expected: OutputType = {
        kind: "row", shape: "rectangle", borderIndexLeft: 1, elements: [{
            kind: "row", borderIndexLeft: 0, elements: [{
                kind: "node", borderIndexLeft: 0
            }]
        }, {
            kind: "row", shape: "rectangle", borderIndexLeft: 1, elements: [{
                kind: "node", borderIndexLeft: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with a border has borderIndexLeft 1', () => {
    let element: InputType = {kind: "column", shape: "rectangle", elements: [{kind: "node"}]};

    addBorderIndexLeft(element);

    let expected: OutputType = {
        kind: "column", shape: "rectangle", borderIndexLeft: 1, elements: [{
            kind: "node", borderIndexLeft: 0
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with a border and a nested row with a border has borderIndexLeft 2', () => {
    let element: InputType = {
        kind: "column", shape: "rectangle", elements: [{
            kind: "row", shape: "rectangle", elements: [{kind: "node"}]
        }]
    };

    addBorderIndexLeft(element);

    let expected: OutputType = {
        kind: "column", shape: "rectangle", borderIndexLeft: 2, elements: [{
            kind: "row", shape: "rectangle", borderIndexLeft: 1, elements: [{
                kind: "node", borderIndexLeft: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with a border and two nested rows with border has borderIndexLeft 2', () => {
    let element: InputType = {
        kind: "column", shape: "rectangle", elements: [{
            kind: "row", shape: "rectangle", elements: [{kind: "node"}]
        }, {
            kind: "row", shape: "rectangle", elements: [{kind: "node"}]
        }]
    };

    addBorderIndexLeft(element);

    let expected: OutputType = {
        kind: "column", shape: "rectangle", borderIndexLeft: 2, elements: [{
            kind: "row", shape: "rectangle", borderIndexLeft: 1, elements: [{
                kind: "node", borderIndexLeft: 0
            }]
        }, {
            kind: "row", shape: "rectangle", borderIndexLeft: 1, elements: [{
                kind: "node", borderIndexLeft: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with a border and two nested rows, not all with border, has borderIndexLeft 2', () => {
    let element: InputType = {
        kind: "column", shape: "rectangle", elements: [{
            kind: "row", elements: [{kind: "node"}]
        }, {
            kind: "row", shape: "rectangle", elements: [{kind: "node"}]
        }]
    };

    addBorderIndexLeft(element);

    let expected: OutputType = {
        kind: "column", shape: "rectangle", borderIndexLeft: 2, elements: [{
            kind: "row", borderIndexLeft: 0, elements: [{
                kind: "node", borderIndexLeft: 0
            }]
        }, {
            kind: "row", shape: "rectangle", borderIndexLeft: 1, elements: [{
                kind: "node", borderIndexLeft: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});