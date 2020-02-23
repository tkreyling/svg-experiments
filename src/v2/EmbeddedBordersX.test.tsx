import {Element} from "./newGraphModel";
import {embeddedBordersX, EmbeddedBordersX} from "./EmbeddedBordersX";

type InputType = Element<unknown>;
type OutputType = Element<EmbeddedBordersX>;

test('a single node has embeddedBordersX 0', () => {
    let element: InputType = {kind: "node"};

    embeddedBordersX(element);

    let expected: OutputType = {kind: "node", embeddedBordersX: 0};
    expect(element).toStrictEqual(expected)
});

test('a row without elements receives embeddedBordersX 0 itself', () => {
    let element: InputType = {kind: "row", elements: []};

    embeddedBordersX(element);

    let expected: OutputType = {kind: "row", embeddedBordersX: 0, elements: []};
    expect(element).toStrictEqual(expected)
});

test('a row without border has embeddedBordersX 0', () => {
    let element: InputType = {kind: "row", elements: [{kind: "node"}]};

    embeddedBordersX(element);

    let expected: OutputType = {
        kind: "row", embeddedBordersX: 0, elements: [{kind: "node", embeddedBordersX: 0}]
    };
    expect(element).toStrictEqual(expected)
});

test('a row with border has embeddedBordersX 1', () => {
    let element: InputType = {kind: "row", border: "solid", elements: [{kind: "node"}]};

    embeddedBordersX(element);

    let expected: OutputType = {
        kind: "row", border: "solid", embeddedBordersX: 1, elements: [{kind: "node", embeddedBordersX: 0}]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with border has embeddedBordersX 1', () => {
    let element: InputType = {kind: "column", border: "solid", elements: [{kind: "node"}]};

    embeddedBordersX(element);

    let expected: OutputType = {
        kind: "column", border: "solid", embeddedBordersX: 1, elements: [{kind: "node", embeddedBordersX: 0}]
    };
    expect(element).toStrictEqual(expected)
});

test('a row containing a column with border has embeddedBordersX 1', () => {
    let element: InputType = {
        kind: "row", elements: [{
            kind: "column", border: "solid", elements: [{kind: "node"}]
        }]
    };

    embeddedBordersX(element);

    let expected: OutputType =  {
        kind: "row", embeddedBordersX: 1, elements: [{
            kind: "column", border: "solid", embeddedBordersX: 1, elements: [{kind: "node", embeddedBordersX: 0}]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a row containing a row with border has embeddedBordersX 1', () => {
    let element: InputType = {
        kind: "row", elements: [{
            kind: "row", border: "solid", elements: [{kind: "node"}]
        }]
    };

    embeddedBordersX(element);

    let expected: OutputType =  {
        kind: "row", embeddedBordersX: 1, elements: [{
            kind: "row", border: "solid", embeddedBordersX: 1, elements: [{kind: "node", embeddedBordersX: 0}]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a row containing two rows with border has embeddedBordersX 2', () => {
    let element: InputType = {
        kind: "row", elements: [{
            kind: "row", border: "solid", elements: [{kind: "node"}]
        }, {
            kind: "row", border: "solid", elements: [{kind: "node"}]
        }]
    };

    embeddedBordersX(element);

    let expected: OutputType =  {
        kind: "row", embeddedBordersX: 2, elements: [{
            kind: "row", border: "solid", embeddedBordersX: 1, elements: [{kind: "node", embeddedBordersX: 0}]
        }, {
            kind: "row", border: "solid", embeddedBordersX: 1, elements: [{kind: "node", embeddedBordersX: 0}]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a column containing two rows with border has embeddedBordersX 2', () => {
    let element: InputType = {
        kind: "column", elements: [{
            kind: "row", border: "solid", elements: [{kind: "node"}]
        }, {
            kind: "row", border: "solid", elements: [{kind: "node"}]
        }]
    };

    embeddedBordersX(element);

    let expected: OutputType =  {
        kind: "column", embeddedBordersX: 1, elements: [{
            kind: "row", border: "solid", embeddedBordersX: 1, elements: [{kind: "node", embeddedBordersX: 0}]
        }, {
            kind: "row", border: "solid", embeddedBordersX: 1, elements: [{kind: "node", embeddedBordersX: 0}]
        }]
    };
    expect(element).toStrictEqual(expected)
});