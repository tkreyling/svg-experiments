import {addOffsetXElements, Element, OffsetXElements} from "./addOffsetXElements";

type InputType = Element<unknown>;
type OutputType = Element<OffsetXElements>;

test('a single node has offsetXElements 0', () => {
    let element: InputType = {kind: "node"};

    addOffsetXElements(element);

    let expected: OutputType = {kind: "node", offsetXElements: 0};
    expect(element).toStrictEqual(expected)
});

test('a row without elements receives no offsetXElements', () => {
    let element: InputType = {kind: "row", elements: []};

    addOffsetXElements(element);

    let expected: OutputType = {kind: "row", elements: []};
    expect(element).toStrictEqual(expected)
});

test('a single node in a row has offsetXElements 0', () => {
    let element: InputType = {kind: "row", elements: [{kind: "node"}]};

    addOffsetXElements(element);

    let expected: OutputType = {
        kind: "row", elements: [{kind: "node", offsetXElements: 0}]
    };
    expect(element).toStrictEqual(expected)
});

test('the second node in a row has offsetXElements 1', () => {
    let element: InputType = {kind: "row", elements: [{kind: "node"}, {kind: "node"}]};

    addOffsetXElements(element);

    let expected: OutputType = {
        kind: "row", elements: [{
            kind: "node", offsetXElements: 0
        }, {
            kind: "node", offsetXElements: 1
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a node nested twice in rows has offsetXElements 0', () => {
    let element: InputType = {
        kind: "row", elements: [{
            kind: "row", elements: [{
                kind: "node"
            }]
        }]
    };

    addOffsetXElements(element);

    let expected: OutputType = {
        kind: "row", elements: [{
            kind: "row", elements: [{
                kind: "node", offsetXElements: 0
            }]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a node after an row has an increased offsetXElements', () => {
    let element: InputType = {
        kind: "row", elements: [{
            kind: "row", elements: [{
                kind: "node"
            }]
        }, {
            kind: "node"
        }]
    };

    addOffsetXElements(element);

    let expected: OutputType = {
        kind: "row", elements: [{
            kind: "row", elements: [{
                kind: "node", offsetXElements: 0
            }]
        }, {
            kind: "node", offsetXElements: 1
        }]
    };
    expect(element).toStrictEqual(expected)
});