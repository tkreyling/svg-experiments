import {Element} from "./newGraphModel";
import {addOffsetXBorders, OffsetXBorder} from "./addOffsetXBorders";

type InputType = Element<unknown>;
type OutputType = Element<OffsetXBorder>;

test('a single node has offsetXBorders 0', () => {
    let element: InputType = {kind: "node"};

    addOffsetXBorders(element);

    let expected: OutputType = {kind: "node", offsetXBorders: 0};
    expect(element).toStrictEqual(expected)
});

test('a row without elements receives offsetXBorders 0 itself', () => {
    let element: InputType = {kind: "row", elements: []};

    addOffsetXBorders(element);

    let expected: OutputType = {kind: "row", offsetXBorders: 0, elements: []};
    expect(element).toStrictEqual(expected)
});

test('a single node in a row without border has offsetXBorders 0', () => {
    let element: InputType = {kind: "row", elements: [{kind: "node"}]};

    addOffsetXBorders(element);

    let expected: OutputType = {
        kind: "row", offsetXBorders: 0, elements: [{kind: "node", offsetXBorders: 0}]
    };
    expect(element).toStrictEqual(expected)
});

test('a single node in a row with border has offsetXBorders 1', () => {
    let element: InputType = {kind: "row", border: "solid", elements: [{kind: "node"}]};

    addOffsetXBorders(element);

    let expected: OutputType = {
        kind: "row", border: "solid", offsetXBorders: 0, elements: [{kind: "node", offsetXBorders: 1}]
    };
    expect(element).toStrictEqual(expected)
});

test('a single node in a column with border has offsetXBorders 1', () => {
    let element: InputType = {kind: "column", border: "solid", elements: [{kind: "node"}]};

    addOffsetXBorders(element);

    let expected: OutputType = {
        kind: "column", border: "solid", offsetXBorders: 0, elements: [{kind: "node", offsetXBorders: 1}]
    };
    expect(element).toStrictEqual(expected)
});

test('a node in a row after a column with border has offsetXBorders 2', () => {
    let element: InputType = {
        kind: "row", elements: [{
            kind: "column", border: "solid", elements: [{kind: "node"}]
        }, {
            kind: "node"
        }]
    };

    addOffsetXBorders(element);

    let expected: OutputType =  {
        kind: "row", offsetXBorders: 0, elements: [{
            kind: "column", border: "solid", offsetXBorders: 0, elements: [{kind: "node", offsetXBorders: 1}]
        }, {
            kind: "node", offsetXBorders: 2
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a node in a row after a row with border has offsetXBorders 2', () => {
    let element: InputType = {
        kind: "row", elements: [{
            kind: "row", border: "solid", elements: [{kind: "node"}]
        }, {
            kind: "node"
        }]
    };

    addOffsetXBorders(element);

    let expected: OutputType =  {
        kind: "row", offsetXBorders: 0, elements: [{
            kind: "row", border: "solid", offsetXBorders: 0, elements: [{kind: "node", offsetXBorders: 1}]
        }, {
            kind: "node", offsetXBorders: 2
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a node in column below a row with border has offsetXBorders 0', () => {
    let element: InputType = {
        kind: "column", elements: [{
            kind: "row", border: "solid", elements: [{kind: "node"}]
        }, {
            kind: "node"
        }]
    };

    addOffsetXBorders(element);

    let expected: OutputType =  {
        kind: "column", offsetXBorders: 0, elements: [{
            kind: "row", border: "solid", offsetXBorders: 0, elements: [{kind: "node", offsetXBorders: 1}]
        }, {
            kind: "node", offsetXBorders: 0
        }]
    };
    expect(element).toStrictEqual(expected)
});