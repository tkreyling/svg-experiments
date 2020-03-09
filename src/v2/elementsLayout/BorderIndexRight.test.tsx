import {Element} from "../newGraphModel";
import {addBorderIndexRight, BorderIndexRight} from "./BorderIndexRight";

type InputType = Element<unknown>;
type OutputType = Element<BorderIndexRight>;

test('a single node has borderIndexRight 0', () => {
    let element: InputType = {kind: "node"};

    addBorderIndexRight(element);

    let expected: OutputType = {kind: "node", borderIndexRight: 0};
    expect(element).toStrictEqual(expected)
});

test('a row without elements receives borderIndexRight 0 itself', () => {
    let element: InputType = {kind: "row", elements: []};

    addBorderIndexRight(element);

    let expected: OutputType = {kind: "row", borderIndexRight: 0, elements: []};
    expect(element).toStrictEqual(expected)
});

test('a row with a border has borderIndexRight 1', () => {
    let element: InputType = {kind: "row", border: "rectangle", elements: [{kind: "node"}]};

    addBorderIndexRight(element);

    let expected: OutputType = {
        kind: "row", border: "rectangle", borderIndexRight: 1, elements: [{kind: "node", borderIndexRight: 0}]
    };
    expect(element).toStrictEqual(expected)
});

test('a row with a border and a nested row with a border has borderIndexRight 2', () => {
    let element: InputType = {
        kind: "row", border: "rectangle", elements: [{
            kind: "row", border: "rectangle", elements: [{kind: "node"}]
        }]
    };

    addBorderIndexRight(element);

    let expected: OutputType = {
        kind: "row", border: "rectangle", borderIndexRight: 2, elements: [{
            kind: "row", border: "rectangle", borderIndexRight: 1, elements: [{
                kind: "node", borderIndexRight: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a row with a border and two nested rows with border has borderIndexRight 2', () => {
    let element: InputType = {
        kind: "row", border: "rectangle", elements: [{
            kind: "row", border: "rectangle", elements: [{kind: "node"}]
        }, {
            kind: "row", border: "rectangle", elements: [{kind: "node"}]
        }]
    };

    addBorderIndexRight(element);

    let expected: OutputType = {
        kind: "row", border: "rectangle", borderIndexRight: 2, elements: [{
            kind: "row", border: "rectangle", borderIndexRight: 1, elements: [{
                kind: "node", borderIndexRight: 0
            }]
        }, {
            kind: "row", border: "rectangle", borderIndexRight: 1, elements: [{
                kind: "node", borderIndexRight: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a row with a border and two nested rows, last one without border, has borderIndexRight 1', () => {
    let element: InputType = {
        kind: "row", border: "rectangle", elements: [{
            kind: "row", border: "rectangle", elements: [{kind: "node"}]
        }, {
            kind: "row", elements: [{kind: "node"}]
        }]
    };

    addBorderIndexRight(element);

    let expected: OutputType = {
        kind: "row", border: "rectangle", borderIndexRight: 1, elements: [{
            kind: "row", border: "rectangle", borderIndexRight: 1, elements: [{
                kind: "node", borderIndexRight: 0
            }]
        }, {
            kind: "row", borderIndexRight: 0, elements: [{
                kind: "node", borderIndexRight: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with a border has borderIndexRight 1', () => {
    let element: InputType = {kind: "column", border: "rectangle", elements: [{kind: "node"}]};

    addBorderIndexRight(element);

    let expected: OutputType = {
        kind: "column", border: "rectangle", borderIndexRight: 1, elements: [{
            kind: "node", borderIndexRight: 0
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with a border and a nested row with a border has borderIndexRight 2', () => {
    let element: InputType = {
        kind: "column", border: "rectangle", elements: [{
            kind: "row", border: "rectangle", elements: [{kind: "node"}]
        }]
    };

    addBorderIndexRight(element);

    let expected: OutputType = {
        kind: "column", border: "rectangle", borderIndexRight: 2, elements: [{
            kind: "row", border: "rectangle", borderIndexRight: 1, elements: [{
                kind: "node", borderIndexRight: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with a border and two nested rows with border has borderIndexRight 2', () => {
    let element: InputType = {
        kind: "column", border: "rectangle", elements: [{
            kind: "row", border: "rectangle", elements: [{kind: "node"}]
        }, {
            kind: "row", border: "rectangle", elements: [{kind: "node"}]
        }]
    };

    addBorderIndexRight(element);

    let expected: OutputType = {
        kind: "column", border: "rectangle", borderIndexRight: 2, elements: [{
            kind: "row", border: "rectangle", borderIndexRight: 1, elements: [{
                kind: "node", borderIndexRight: 0
            }]
        }, {
            kind: "row", border: "rectangle", borderIndexRight: 1, elements: [{
                kind: "node", borderIndexRight: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with a border and two nested rows, not all with border, has borderIndexRight 2', () => {
    let element: InputType = {
        kind: "column", border: "rectangle", elements: [{
            kind: "row", elements: [{kind: "node"}]
        }, {
            kind: "row", border: "rectangle", elements: [{kind: "node"}]
        }]
    };

    addBorderIndexRight(element);

    let expected: OutputType = {
        kind: "column", border: "rectangle", borderIndexRight: 2, elements: [{
            kind: "row", borderIndexRight: 0, elements: [{
                kind: "node", borderIndexRight: 0
            }]
        }, {
            kind: "row", border: "rectangle", borderIndexRight: 1, elements: [{
                kind: "node", borderIndexRight: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});