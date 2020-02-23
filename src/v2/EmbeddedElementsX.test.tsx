import {Element} from "./newGraphModel";
import {addEmbeddedElementsX, EmbeddedElementsX} from "./EmbeddedElementsX";

type InputType = Element<unknown>;
type OutputType = Element<EmbeddedElementsX>;

test('a single node has embeddedElementsX 1', () => {
    let element: InputType = {kind: "node"};

    addEmbeddedElementsX(element);

    let expected: OutputType = {kind: "node", embeddedElementsX: 1};
    expect(element).toStrictEqual(expected)
});

test('a row without elements receives embeddedElementsX 0 itself', () => {
    let element: InputType = {kind: "row", elements: []};

    addEmbeddedElementsX(element);

    let expected: OutputType = {kind: "row", embeddedElementsX: 0, elements: []};
    expect(element).toStrictEqual(expected)
});

test('a row with one node has embeddedElementsX 1', () => {
    let element: InputType = {kind: "row", elements: [{kind: "node"}]};

    addEmbeddedElementsX(element);

    let expected: OutputType = {
        kind: "row", embeddedElementsX: 1, elements: [{kind: "node", embeddedElementsX: 1}]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with one node has embeddedElementsX 1', () => {
    let element: InputType = {kind: "column", elements: [{kind: "node"}]};

    addEmbeddedElementsX(element);

    let expected: OutputType = {
        kind: "column", embeddedElementsX: 1, elements: [{kind: "node", embeddedElementsX: 1}]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with multiple nodes has embeddedElementsX 1', () => {
    let element: InputType = {
        kind: "column", elements: [{kind: "node"}, {kind: "node"}]
    };

    addEmbeddedElementsX(element);

    let expected: OutputType = {
        kind: "column", embeddedElementsX: 1, elements: [{
            kind: "node", embeddedElementsX: 1
        }, {
            kind: "node", embeddedElementsX: 1
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a row with two nodes has embeddedElementsX 2', () => {
    let element: InputType = {
        kind: "row", elements: [{kind: "node"}, {kind: "node"}]
    };

    addEmbeddedElementsX(element);

    let expected: OutputType = {
        kind: "row", embeddedElementsX: 2, elements: [{
            kind: "node", embeddedElementsX: 1
        }, {
            kind: "node", embeddedElementsX: 1
        }]
    };
    expect(element).toStrictEqual(expected)
});