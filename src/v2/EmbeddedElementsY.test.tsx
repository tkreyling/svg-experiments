import {Element} from "./newGraphModel";
import {addEmbeddedElementsY, EmbeddedElementsY} from "./EmbeddedElementsY";

type InputType = Element<unknown>;
type OutputType = Element<EmbeddedElementsY>;

test('a single node has embeddedElementsY 1', () => {
    let element: InputType = {kind: "node"};

    addEmbeddedElementsY(element);

    let expected: OutputType = {kind: "node", embeddedElementsY: 1};
    expect(element).toStrictEqual(expected)
});

test('a row without elements receives embeddedElementsY 0 itself', () => {
    let element: InputType = {kind: "row", elements: []};

    addEmbeddedElementsY(element);

    let expected: OutputType = {kind: "row", embeddedElementsY: 0, elements: []};
    expect(element).toStrictEqual(expected)
});

test('a row with one node has embeddedElementsY 1', () => {
    let element: InputType = {kind: "row", elements: [{kind: "node"}]};

    addEmbeddedElementsY(element);

    let expected: OutputType = {
        kind: "row", embeddedElementsY: 1, elements: [{kind: "node", embeddedElementsY: 1}]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with one node has embeddedElementsY 1', () => {
    let element: InputType = {kind: "column", elements: [{kind: "node"}]};

    addEmbeddedElementsY(element);

    let expected: OutputType = {
        kind: "column", embeddedElementsY: 1, elements: [{kind: "node", embeddedElementsY: 1}]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with two nodes has embeddedElementsY 2', () => {
    let element: InputType = {
        kind: "column", elements: [{kind: "node"}, {kind: "node"}]
    };

    addEmbeddedElementsY(element);

    let expected: OutputType = {
        kind: "column", embeddedElementsY: 2, elements: [{
            kind: "node", embeddedElementsY: 1
        }, {
            kind: "node", embeddedElementsY: 1
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a row with two nodes has embeddedElementsY 1', () => {
    let element: InputType = {
        kind: "row", elements: [{kind: "node"}, {kind: "node"}]
    };

    addEmbeddedElementsY(element);

    let expected: OutputType = {
        kind: "row", embeddedElementsY: 1, elements: [{
            kind: "node", embeddedElementsY: 1
        }, {
            kind: "node", embeddedElementsY: 1
        }]
    };
    expect(element).toStrictEqual(expected)
});