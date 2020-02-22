import {Element} from "./newGraphModel";
import {addEmbeddedXBorders, EmbeddedXBorders} from "./addEmbeddedXBorders";

type InputType = Element<unknown>;
type OutputType = Element<EmbeddedXBorders>;

test('a single node has embeddedXBorders 0', () => {
    let element: InputType = {kind: "node"};

    addEmbeddedXBorders(element);

    let expected: OutputType = {kind: "node", embeddedXBorders: 0};
    expect(element).toStrictEqual(expected)
});

test('a row without elements receives embeddedXBorders 0 itself', () => {
    let element: InputType = {kind: "row", elements: []};

    addEmbeddedXBorders(element);

    let expected: OutputType = {kind: "row", embeddedXBorders: 0, elements: []};
    expect(element).toStrictEqual(expected)
});

test('a row without border has embeddedXBorders 0', () => {
    let element: InputType = {kind: "row", elements: [{kind: "node"}]};

    addEmbeddedXBorders(element);

    let expected: OutputType = {
        kind: "row", embeddedXBorders: 0, elements: [{kind: "node", embeddedXBorders: 0}]
    };
    expect(element).toStrictEqual(expected)
});

test('a row with border has embeddedXBorders 1', () => {
    let element: InputType = {kind: "row", border: "solid", elements: [{kind: "node"}]};

    addEmbeddedXBorders(element);

    let expected: OutputType = {
        kind: "row", border: "solid", embeddedXBorders: 1, elements: [{kind: "node", embeddedXBorders: 0}]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with border has embeddedXBorders 1', () => {
    let element: InputType = {kind: "column", border: "solid", elements: [{kind: "node"}]};

    addEmbeddedXBorders(element);

    let expected: OutputType = {
        kind: "column", border: "solid", embeddedXBorders: 1, elements: [{kind: "node", embeddedXBorders: 0}]
    };
    expect(element).toStrictEqual(expected)
});

test('a row containing a column with border has embeddedXBorders 1', () => {
    let element: InputType = {
        kind: "row", elements: [{
            kind: "column", border: "solid", elements: [{kind: "node"}]
        }]
    };

    addEmbeddedXBorders(element);

    let expected: OutputType =  {
        kind: "row", embeddedXBorders: 1, elements: [{
            kind: "column", border: "solid", embeddedXBorders: 1, elements: [{kind: "node", embeddedXBorders: 0}]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a row containing a row with border has embeddedXBorders 1', () => {
    let element: InputType = {
        kind: "row", elements: [{
            kind: "row", border: "solid", elements: [{kind: "node"}]
        }]
    };

    addEmbeddedXBorders(element);

    let expected: OutputType =  {
        kind: "row", embeddedXBorders: 1, elements: [{
            kind: "row", border: "solid", embeddedXBorders: 1, elements: [{kind: "node", embeddedXBorders: 0}]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a row containing two rows with border has embeddedXBorders 2', () => {
    let element: InputType = {
        kind: "row", elements: [{
            kind: "row", border: "solid", elements: [{kind: "node"}]
        }, {
            kind: "row", border: "solid", elements: [{kind: "node"}]
        }]
    };

    addEmbeddedXBorders(element);

    let expected: OutputType =  {
        kind: "row", embeddedXBorders: 2, elements: [{
            kind: "row", border: "solid", embeddedXBorders: 1, elements: [{kind: "node", embeddedXBorders: 0}]
        }, {
            kind: "row", border: "solid", embeddedXBorders: 1, elements: [{kind: "node", embeddedXBorders: 0}]
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a column containing two rows with border has embeddedXBorders 2', () => {
    let element: InputType = {
        kind: "column", elements: [{
            kind: "row", border: "solid", elements: [{kind: "node"}]
        }, {
            kind: "row", border: "solid", elements: [{kind: "node"}]
        }]
    };

    addEmbeddedXBorders(element);

    let expected: OutputType =  {
        kind: "column", embeddedXBorders: 1, elements: [{
            kind: "row", border: "solid", embeddedXBorders: 1, elements: [{kind: "node", embeddedXBorders: 0}]
        }, {
            kind: "row", border: "solid", embeddedXBorders: 1, elements: [{kind: "node", embeddedXBorders: 0}]
        }]
    };
    expect(element).toStrictEqual(expected)
});