import {Element} from "./newGraphModel";
import {addBorderIndexMaxTopG, BorderIndexMaxTop} from "./BorderIndexMaxTop";
import {OffsetElementsY} from "./OffsetElementsY";
import {BorderIndexTop} from "./BorderIndexTop";

type InputType = Element<OffsetElementsY & BorderIndexTop>;
type OutputType = Element<OffsetElementsY & BorderIndexTop & BorderIndexMaxTop>;

test('a single node has borderIndexMaxTop 0', () => {
    let element: InputType = {kind: "node", offsetElementsY: 0, borderIndexTop: 0};

    addBorderIndexMaxTopG(element);

    let expected: OutputType = {kind: "node", offsetElementsY: 0, borderIndexTop: 0, borderIndexMaxTop: 0};
    expect(element).toStrictEqual(expected)
});

test('a row without elements receives borderIndexMaxTop 0 itself', () => {
    let element: InputType = {kind: "row", offsetElementsY: 0, borderIndexTop: 0, elements: []};

    addBorderIndexMaxTopG(element);

    let expected: OutputType = {kind: "row", offsetElementsY: 0, borderIndexTop: 0, borderIndexMaxTop: 0, elements: []};
    expect(element).toStrictEqual(expected)
});

test('a row with a border has borderIndexMaxTop 1', () => {
    let element: InputType = {
        kind: "row", offsetElementsY: 0, borderIndexTop: 1, elements: [{
            kind: "node", offsetElementsY: 0, borderIndexTop: 0
        }]
    };

    addBorderIndexMaxTopG(element);

    let expected: OutputType = {
        kind: "row", offsetElementsY: 0, borderIndexTop: 1, borderIndexMaxTop: 1, elements: [{
            kind: "node", offsetElementsY: 0, borderIndexTop: 0, borderIndexMaxTop: 1
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a row with a border and a nested row with a border has borderIndexMaxTop 2', () => {
    let element: InputType = {
        kind: "row", offsetElementsY: 0, borderIndexTop: 2, elements: [{
            kind: "row", offsetElementsY: 0, borderIndexTop: 1, elements: [{
                kind: "node", offsetElementsY: 0, borderIndexTop: 0
            }]
        }]
    };

    addBorderIndexMaxTopG(element);

    let expected: OutputType = {
        kind: "row", offsetElementsY: 0, borderIndexTop: 2, borderIndexMaxTop: 2, elements: [{
            kind: "row", offsetElementsY: 0, borderIndexTop: 1, borderIndexMaxTop: 2, elements: [{
                kind: "node", offsetElementsY: 0, borderIndexTop: 0, borderIndexMaxTop: 2
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a row with a border and two nested rows with border has borderIndexMaxTop 2', () => {
    let element: InputType = {
        kind: "row", offsetElementsY: 0, borderIndexTop: 2, elements: [{
            kind: "row", offsetElementsY: 0, borderIndexTop: 1, elements: [{
                kind: "node", offsetElementsY: 0, borderIndexTop: 0
            }]
        }, {
            kind: "row", offsetElementsY: 0, borderIndexTop: 1, elements: [{
                kind: "node", offsetElementsY: 0, borderIndexTop: 0
            }]
        }]
    };

    addBorderIndexMaxTopG(element);

    let expected: OutputType = {
        kind: "row", offsetElementsY: 0, borderIndexTop: 2, borderIndexMaxTop: 2, elements: [{
            kind: "row", offsetElementsY: 0, borderIndexTop: 1, borderIndexMaxTop: 2, elements: [{
                kind: "node", offsetElementsY: 0, borderIndexTop: 0, borderIndexMaxTop: 2
            }]
        }, {
            kind: "row", offsetElementsY: 0, borderIndexTop: 1, borderIndexMaxTop: 2, elements: [{
                kind: "node", offsetElementsY: 0, borderIndexTop: 0, borderIndexMaxTop: 2
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a row with a border and two nested rows, first one without border, has borderIndexMaxTop 2', () => {
    let element: InputType = {
        kind: "row", offsetElementsY: 0, borderIndexTop: 2, elements: [{
            kind: "row", offsetElementsY: 0, borderIndexTop: 0, elements: [{
                kind: "node", offsetElementsY: 0, borderIndexTop: 0
            }]
        }, {
            kind: "row", offsetElementsY: 0, borderIndexTop: 1, elements: [{
                kind: "node", offsetElementsY: 0, borderIndexTop: 0
            }]
        }]
    };

    addBorderIndexMaxTopG(element);

    let expected: OutputType = {
        kind: "row", offsetElementsY: 0, borderIndexTop: 2, borderIndexMaxTop: 2, elements: [{
            kind: "row", offsetElementsY: 0, borderIndexTop: 0, borderIndexMaxTop: 2, elements: [{
                kind: "node", offsetElementsY: 0, borderIndexTop: 0, borderIndexMaxTop: 2
            }]
        }, {
            kind: "row", offsetElementsY: 0, borderIndexTop: 1, borderIndexMaxTop: 2, elements: [{
                kind: "node", offsetElementsY: 0, borderIndexTop: 0, borderIndexMaxTop: 2
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with a border has borderIndexMaxTop 1', () => {
    let element: InputType = {
        kind: "column", offsetElementsY: 0, borderIndexTop: 1, elements: [{
            kind: "node", offsetElementsY: 0, borderIndexTop: 0
        }]
    };

    addBorderIndexMaxTopG(element);

    let expected: OutputType = {
        kind: "column", offsetElementsY: 0, borderIndexTop: 1, borderIndexMaxTop: 1, elements: [{
            kind: "node", offsetElementsY: 0, borderIndexTop: 0, borderIndexMaxTop: 1
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with a border and a nested row with a border has borderIndexMaxTop 2', () => {
    let element: InputType = {
        kind: "column", offsetElementsY: 0, borderIndexTop: 2, elements: [{
            kind: "row", offsetElementsY: 0, borderIndexTop: 1, elements: [{
                kind: "node", offsetElementsY: 0, borderIndexTop: 0
            }]
        }]
    };

    addBorderIndexMaxTopG(element);

    let expected: OutputType = {
        kind: "column", offsetElementsY: 0, borderIndexTop: 2, borderIndexMaxTop: 2, elements: [{
            kind: "row", offsetElementsY: 0, borderIndexTop: 1, borderIndexMaxTop: 2, elements: [{
                kind: "node", offsetElementsY: 0, borderIndexTop: 0, borderIndexMaxTop: 2
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with a border and two nested rows with border has borderIndexMaxTop 2', () => {
    let element: InputType = {
        kind: "column", offsetElementsY: 0, borderIndexTop: 2, elements: [{
            kind: "row", offsetElementsY: 0, borderIndexTop: 1, elements: [{
                kind: "node", offsetElementsY: 0, borderIndexTop: 0
            }]
        }, {
            kind: "row", offsetElementsY: 1, borderIndexTop: 1, elements: [{
                kind: "node", offsetElementsY: 1, borderIndexTop: 0
            }]
        }]
    };

    addBorderIndexMaxTopG(element);

    let expected: OutputType = {
        kind: "column", offsetElementsY: 0, borderIndexTop: 2, borderIndexMaxTop: 2, elements: [{
            kind: "row", offsetElementsY: 0, borderIndexTop: 1, borderIndexMaxTop: 2, elements: [{
                kind: "node", offsetElementsY: 0, borderIndexTop: 0, borderIndexMaxTop: 2
            }]
        }, {
            kind: "row", offsetElementsY: 1, borderIndexTop: 1, borderIndexMaxTop: 1, elements: [{
                kind: "node", offsetElementsY: 1, borderIndexTop: 0, borderIndexMaxTop: 1
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with a border and two nested rows, not all with border, has borderIndexMaxTop 1', () => {
    let element: InputType = {
        kind: "column", offsetElementsY: 0, borderIndexTop: 1, elements: [{
            kind: "row", offsetElementsY: 0, borderIndexTop: 0, elements: [{
                kind: "node", offsetElementsY: 0, borderIndexTop: 0
            }]
        }, {
            kind: "row", offsetElementsY: 1, borderIndexTop: 1, elements: [{
                kind: "node", offsetElementsY: 1, borderIndexTop: 0
            }]
        }]
    };

    addBorderIndexMaxTopG(element);

    let expected: OutputType = {
        kind: "column", offsetElementsY: 0, borderIndexTop: 1, borderIndexMaxTop: 1, elements: [{
            kind: "row", offsetElementsY: 0, borderIndexTop: 0, borderIndexMaxTop: 1, elements: [{
                kind: "node", offsetElementsY: 0, borderIndexTop: 0, borderIndexMaxTop: 1
            }]
        }, {
            kind: "row", offsetElementsY: 1, borderIndexTop: 1, borderIndexMaxTop: 1, elements: [{
                kind: "node", offsetElementsY: 1, borderIndexTop: 0, borderIndexMaxTop: 1
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});