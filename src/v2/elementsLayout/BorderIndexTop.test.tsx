import {Element} from "../newGraphModel";
import {addBorderIndexTop, BorderIndexTop} from "./BorderIndexTop";

type InputType = Element<unknown>;
type OutputType = Element<BorderIndexTop>;

test('a single node has borderIndexTop 0', () => {
    let element: InputType = {kind: "node"};

    addBorderIndexTop(element);

    let expected: OutputType = {kind: "node", borderIndexTop: 0};
    expect(element).toStrictEqual(expected)
});

test('a row without elements receives borderIndexTop 0 itself', () => {
    let element: InputType = {kind: "row", elements: []};

    addBorderIndexTop(element);

    let expected: OutputType = {kind: "row", borderIndexTop: 0, elements: []};
    expect(element).toStrictEqual(expected)
});

test('a row with a border has borderIndexTop 1', () => {
    let element: InputType = {kind: "row", shape: "rectangle", elements: [{kind: "node"}]};

    addBorderIndexTop(element);

    let expected: OutputType = {
        kind: "row", shape: "rectangle", borderIndexTop: 1, elements: [{kind: "node", borderIndexTop: 0}]
    };
    expect(element).toStrictEqual(expected)
});

test('a row with a border and a nested row with a border has borderIndexTop 2', () => {
    let element: InputType = {
        kind: "row", shape: "rectangle", elements: [{
            kind: "row", shape: "rectangle", elements: [{kind: "node"}]
        }]
    };

    addBorderIndexTop(element);

    let expected: OutputType = {
        kind: "row", shape: "rectangle", borderIndexTop: 2, elements: [{
            kind: "row", shape: "rectangle", borderIndexTop: 1, elements: [{
                kind: "node", borderIndexTop: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a row with a border and two nested rows with border has borderIndexTop 2', () => {
    let element: InputType = {
        kind: "row", shape: "rectangle", elements: [{
            kind: "row", shape: "rectangle", elements: [{kind: "node"}]
        }, {
            kind: "row", shape: "rectangle", elements: [{kind: "node"}]
        }]
    };

    addBorderIndexTop(element);

    let expected: OutputType = {
        kind: "row", shape: "rectangle", borderIndexTop: 2, elements: [{
            kind: "row", shape: "rectangle", borderIndexTop: 1, elements: [{
                kind: "node", borderIndexTop: 0
            }]
        }, {
            kind: "row", shape: "rectangle", borderIndexTop: 1, elements: [{
                kind: "node", borderIndexTop: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a row with a border and two nested rows, first one without border, has borderIndexTop 2', () => {
    let element: InputType = {
        kind: "row", shape: "rectangle", elements: [{
            kind: "row", elements: [{kind: "node"}]
        }, {
            kind: "row", shape: "rectangle", elements: [{kind: "node"}]
        }]
    };

    addBorderIndexTop(element);

    let expected: OutputType = {
        kind: "row", shape: "rectangle", borderIndexTop: 2, elements: [{
            kind: "row", borderIndexTop: 0, elements: [{
                kind: "node", borderIndexTop: 0
            }]
        }, {
            kind: "row", shape: "rectangle", borderIndexTop: 1, elements: [{
                kind: "node", borderIndexTop: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with a border has borderIndexTop 1', () => {
    let element: InputType = {kind: "column", shape: "rectangle", elements: [{kind: "node"}]};

    addBorderIndexTop(element);

    let expected: OutputType = {
        kind: "column", shape: "rectangle", borderIndexTop: 1, elements: [{
            kind: "node", borderIndexTop: 0
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with a border and a nested row with a border has borderIndexTop 2', () => {
    let element: InputType = {
        kind: "column", shape: "rectangle", elements: [{
            kind: "row", shape: "rectangle", elements: [{kind: "node"}]
        }]
    };

    addBorderIndexTop(element);

    let expected: OutputType = {
        kind: "column", shape: "rectangle", borderIndexTop: 2, elements: [{
            kind: "row", shape: "rectangle", borderIndexTop: 1, elements: [{
                kind: "node", borderIndexTop: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with a border and two nested rows with border has borderIndexTop 2', () => {
    let element: InputType = {
        kind: "column", shape: "rectangle", elements: [{
            kind: "row", shape: "rectangle", elements: [{kind: "node"}]
        }, {
            kind: "row", shape: "rectangle", elements: [{kind: "node"}]
        }]
    };

    addBorderIndexTop(element);

    let expected: OutputType = {
        kind: "column", shape: "rectangle", borderIndexTop: 2, elements: [{
            kind: "row", shape: "rectangle", borderIndexTop: 1, elements: [{
                kind: "node", borderIndexTop: 0
            }]
        }, {
            kind: "row", shape: "rectangle", borderIndexTop: 1, elements: [{
                kind: "node", borderIndexTop: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with a border and two nested rows, not all with border, has borderIndexTop 1', () => {
    let element: InputType = {
        kind: "column", shape: "rectangle", elements: [{
            kind: "row", elements: [{kind: "node"}]
        }, {
            kind: "row", shape: "rectangle", elements: [{kind: "node"}]
        }]
    };

    addBorderIndexTop(element);

    let expected: OutputType = {
        kind: "column", shape: "rectangle", borderIndexTop: 1, elements: [{
            kind: "row", borderIndexTop: 0, elements: [{
                kind: "node", borderIndexTop: 0
            }]
        }, {
            kind: "row", shape: "rectangle", borderIndexTop: 1, elements: [{
                kind: "node", borderIndexTop: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});