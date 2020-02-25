import {Element} from "../newGraphModel";
import {
    addBorderIndexMaxBottomG,
    BorderIndexMaxBottom,
    BorderIndexMaxPreviousBottom,
    EmbeddedBorderIndexMaxBottom
} from "./BorderIndexMaxBottom";
import {OffsetElementsY} from "./OffsetElementsY";
import {BorderIndexBottom} from "./BorderIndexBottom";

type InputType = Element<OffsetElementsY & BorderIndexBottom>;
type OutputType = Element<OffsetElementsY & BorderIndexBottom &
    BorderIndexMaxBottom & BorderIndexMaxPreviousBottom & EmbeddedBorderIndexMaxBottom>;

test('a single node has borderIndexMaxBottom 0', () => {
    let element: InputType = {kind: "node", offsetElementsY: 0, borderIndexBottom: 0};

    addBorderIndexMaxBottomG(element);

    let expected: OutputType = {
        kind: "node", offsetElementsY: 0, borderIndexBottom: 0, 
        borderIndexMaxBottom: 0, borderIndexMaxPreviousBottom: 0, embeddedBorderIndexMaxBottom: 0,
    };
    expect(element).toStrictEqual(expected)
});

test('a row without elements receives borderIndexMaxBottom 0 itself', () => {
    let element: InputType = {kind: "row", offsetElementsY: 0, borderIndexBottom: 0, elements: []};

    addBorderIndexMaxBottomG(element);

    let expected: OutputType = {
        kind: "row", offsetElementsY: 0, borderIndexBottom: 0,
        borderIndexMaxBottom: 0, borderIndexMaxPreviousBottom: 0, embeddedBorderIndexMaxBottom: 0,
        elements: []
    };
    expect(element).toStrictEqual(expected)
});

test('a row with a border has borderIndexMaxBottom 1', () => {
    let element: InputType = {
        kind: "row", offsetElementsY: 0, borderIndexBottom: 1, elements: [{
            kind: "node", offsetElementsY: 0, borderIndexBottom: 0
        }]
    };

    addBorderIndexMaxBottomG(element);

    let expected: OutputType = {
        kind: "row", offsetElementsY: 0, borderIndexBottom: 1,
        borderIndexMaxBottom: 1, borderIndexMaxPreviousBottom: 0, embeddedBorderIndexMaxBottom: 0,
        elements: [{
            kind: "node", offsetElementsY: 0, borderIndexBottom: 0,
            borderIndexMaxBottom: 1, borderIndexMaxPreviousBottom: 0, embeddedBorderIndexMaxBottom: 0
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a row with a border and a nested row with a border has borderIndexMaxBottom 2', () => {
    let element: InputType = {
        kind: "row", offsetElementsY: 0, borderIndexBottom: 2, elements: [{
            kind: "row", offsetElementsY: 0, borderIndexBottom: 1, elements: [{
                kind: "node", offsetElementsY: 0, borderIndexBottom: 0
            }]
        }]
    };

    addBorderIndexMaxBottomG(element);

    let expected: OutputType = {
        kind: "row", offsetElementsY: 0, borderIndexBottom: 2,
        borderIndexMaxBottom: 2, borderIndexMaxPreviousBottom: 0, embeddedBorderIndexMaxBottom: 0,
        elements: [{
            kind: "row", offsetElementsY: 0, borderIndexBottom: 1,
            borderIndexMaxBottom: 2, borderIndexMaxPreviousBottom: 0, embeddedBorderIndexMaxBottom: 0,
            elements: [{
                kind: "node", offsetElementsY: 0, borderIndexBottom: 0,
                borderIndexMaxBottom: 2, borderIndexMaxPreviousBottom: 0, embeddedBorderIndexMaxBottom: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a row with a border and two nested rows with border has borderIndexMaxBottom 2', () => {
    let element: InputType = {
        kind: "row", offsetElementsY: 0, borderIndexBottom: 2, elements: [{
            kind: "row", offsetElementsY: 0, borderIndexBottom: 1, elements: [{
                kind: "node", offsetElementsY: 0, borderIndexBottom: 0
            }]
        }, {
            kind: "row", offsetElementsY: 0, borderIndexBottom: 1, elements: [{
                kind: "node", offsetElementsY: 0, borderIndexBottom: 0
            }]
        }]
    };

    addBorderIndexMaxBottomG(element);

    let expected: OutputType = {
        kind: "row", offsetElementsY: 0, borderIndexBottom: 2,
        borderIndexMaxBottom: 2, borderIndexMaxPreviousBottom: 0, embeddedBorderIndexMaxBottom: 0,
        elements: [{
            kind: "row", offsetElementsY: 0, borderIndexBottom: 1,
            borderIndexMaxBottom: 2, borderIndexMaxPreviousBottom: 0, embeddedBorderIndexMaxBottom: 0,
            elements: [{
                kind: "node", offsetElementsY: 0, borderIndexBottom: 0,
                borderIndexMaxBottom: 2, borderIndexMaxPreviousBottom: 0, embeddedBorderIndexMaxBottom: 0
            }]
        }, {
            kind: "row", offsetElementsY: 0, borderIndexBottom: 1,
            borderIndexMaxBottom: 2, borderIndexMaxPreviousBottom: 0, embeddedBorderIndexMaxBottom: 0,
            elements: [{
                kind: "node", offsetElementsY: 0, borderIndexBottom: 0,
                borderIndexMaxBottom: 2, borderIndexMaxPreviousBottom: 0, embeddedBorderIndexMaxBottom: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a row with a border and two nested rows, first one without border, has borderIndexMaxBottom 2', () => {
    let element: InputType = {
        kind: "row", offsetElementsY: 0, borderIndexBottom: 2, elements: [{
            kind: "row", offsetElementsY: 0, borderIndexBottom: 0, elements: [{
                kind: "node", offsetElementsY: 0, borderIndexBottom: 0
            }]
        }, {
            kind: "row", offsetElementsY: 0, borderIndexBottom: 1, elements: [{
                kind: "node", offsetElementsY: 0, borderIndexBottom: 0
            }]
        }]
    };

    addBorderIndexMaxBottomG(element);

    let expected: OutputType = {
        kind: "row", offsetElementsY: 0, borderIndexBottom: 2,
        borderIndexMaxBottom: 2, borderIndexMaxPreviousBottom: 0, embeddedBorderIndexMaxBottom: 0,
        elements: [{
            kind: "row", offsetElementsY: 0, borderIndexBottom: 0,
            borderIndexMaxBottom: 2, borderIndexMaxPreviousBottom: 0, embeddedBorderIndexMaxBottom: 0,
            elements: [{
                kind: "node", offsetElementsY: 0, borderIndexBottom: 0,
                borderIndexMaxBottom: 2, borderIndexMaxPreviousBottom: 0, embeddedBorderIndexMaxBottom: 0
            }]
        }, {
            kind: "row", offsetElementsY: 0, borderIndexBottom: 1,
            borderIndexMaxBottom: 2, borderIndexMaxPreviousBottom: 0, embeddedBorderIndexMaxBottom: 0,
            elements: [{
                kind: "node", offsetElementsY: 0, borderIndexBottom: 0,
                borderIndexMaxBottom: 2, borderIndexMaxPreviousBottom: 0, embeddedBorderIndexMaxBottom: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with a border has borderIndexMaxBottom 1', () => {
    let element: InputType = {
        kind: "column", offsetElementsY: 0, borderIndexBottom: 1, elements: [{
            kind: "node", offsetElementsY: 0, borderIndexBottom: 0
        }]
    };

    addBorderIndexMaxBottomG(element);

    let expected: OutputType = {
        kind: "column", offsetElementsY: 0, borderIndexBottom: 1,
        borderIndexMaxBottom: 1, borderIndexMaxPreviousBottom: 0, embeddedBorderIndexMaxBottom: 0,
        elements: [{
            kind: "node", offsetElementsY: 0, borderIndexBottom: 0,
            borderIndexMaxBottom: 1, borderIndexMaxPreviousBottom: 0, embeddedBorderIndexMaxBottom: 0
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with a border and a nested row with a border has borderIndexMaxBottom 2', () => {
    let element: InputType = {
        kind: "column", offsetElementsY: 0, borderIndexBottom: 2, elements: [{
            kind: "row", offsetElementsY: 0, borderIndexBottom: 1, elements: [{
                kind: "node", offsetElementsY: 0, borderIndexBottom: 0
            }]
        }]
    };

    addBorderIndexMaxBottomG(element);

    let expected: OutputType = {
        kind: "column", offsetElementsY: 0, borderIndexBottom: 2,
        borderIndexMaxBottom: 2, borderIndexMaxPreviousBottom: 0, embeddedBorderIndexMaxBottom: 0,
        elements: [{
            kind: "row", offsetElementsY: 0, borderIndexBottom: 1,
            borderIndexMaxBottom: 2, borderIndexMaxPreviousBottom: 0, embeddedBorderIndexMaxBottom: 0,
            elements: [{
                kind: "node", offsetElementsY: 0, borderIndexBottom: 0,
                borderIndexMaxBottom: 2, borderIndexMaxPreviousBottom: 0, embeddedBorderIndexMaxBottom: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with a border and two nested rows with border has borderIndexMaxBottom 2', () => {
    let element: InputType = {
        kind: "column", offsetElementsY: 0, borderIndexBottom: 2, elements: [{
            kind: "row", offsetElementsY: 0, borderIndexBottom: 1, elements: [{
                kind: "node", offsetElementsY: 0, borderIndexBottom: 0
            }]
        }, {
            kind: "row", offsetElementsY: 1, borderIndexBottom: 1, elements: [{
                kind: "node", offsetElementsY: 1, borderIndexBottom: 0
            }]
        }]
    };

    addBorderIndexMaxBottomG(element);

    let expected: OutputType = {
        kind: "column", offsetElementsY: 0, borderIndexBottom: 2,
        borderIndexMaxBottom: 2, borderIndexMaxPreviousBottom: 0, embeddedBorderIndexMaxBottom: 1,
        elements: [{
            kind: "row", offsetElementsY: 0, borderIndexBottom: 1,
            borderIndexMaxBottom: 1, borderIndexMaxPreviousBottom: 0, embeddedBorderIndexMaxBottom: 0,
            elements: [{
                kind: "node", offsetElementsY: 0, borderIndexBottom: 0,
                borderIndexMaxBottom: 1, borderIndexMaxPreviousBottom: 0, embeddedBorderIndexMaxBottom: 0
            }]
        }, {
            kind: "row", offsetElementsY: 1, borderIndexBottom: 1,
            borderIndexMaxBottom: 2, borderIndexMaxPreviousBottom: 1, embeddedBorderIndexMaxBottom: 0,
            elements: [{
                kind: "node", offsetElementsY: 1, borderIndexBottom: 0,
                borderIndexMaxBottom: 2, borderIndexMaxPreviousBottom: 1, embeddedBorderIndexMaxBottom: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with a border and two nested rows, last one without border, has borderIndexMaxBottom 1', () => {
    let element: InputType = {
        kind: "column", offsetElementsY: 0, borderIndexBottom: 1, elements: [{
            kind: "row", offsetElementsY: 0, borderIndexBottom: 1, elements: [{
                kind: "node", offsetElementsY: 0, borderIndexBottom: 0
            }]
        }, {
            kind: "row", offsetElementsY: 1, borderIndexBottom: 0, elements: [{
                kind: "node", offsetElementsY: 1, borderIndexBottom: 0
            }]
        }]
    };

    addBorderIndexMaxBottomG(element);

    let expected: OutputType = {
        kind: "column", offsetElementsY: 0, borderIndexBottom: 1,
        borderIndexMaxBottom: 1, borderIndexMaxPreviousBottom: 0, embeddedBorderIndexMaxBottom: 1,
        elements: [{
            kind: "row", offsetElementsY: 0, borderIndexBottom: 1,
            borderIndexMaxBottom: 1, borderIndexMaxPreviousBottom: 0, embeddedBorderIndexMaxBottom: 0,
            elements: [{
                kind: "node", offsetElementsY: 0, borderIndexBottom: 0,
                borderIndexMaxBottom: 1, borderIndexMaxPreviousBottom: 0, embeddedBorderIndexMaxBottom: 0
            }]
        }, {
            kind: "row", offsetElementsY: 1, borderIndexBottom: 0,
            borderIndexMaxBottom: 1, borderIndexMaxPreviousBottom: 1, embeddedBorderIndexMaxBottom: 0,
            elements: [{
                kind: "node", offsetElementsY: 1, borderIndexBottom: 0,
                borderIndexMaxBottom: 1, borderIndexMaxPreviousBottom: 1, embeddedBorderIndexMaxBottom: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});