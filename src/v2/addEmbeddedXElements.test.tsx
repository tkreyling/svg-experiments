import {Element} from "./newGraphModel";
import {addEmbeddedXElements, EmbeddedXElements} from "./addEmbeddedXElements";

type InputType = Element<unknown>;
type OutputType = Element<EmbeddedXElements>;

test('a single node has embeddedXElements 1', () => {
    let element: InputType = {kind: "node"};

    addEmbeddedXElements(element);

    let expected: OutputType = {kind: "node", embeddedXElements: 1};
    expect(element).toStrictEqual(expected)
});

test('a row without elements receives embeddedXElements 0 itself', () => {
    let element: InputType = {kind: "row", elements: []};

    addEmbeddedXElements(element);

    let expected: OutputType = {kind: "row", embeddedXElements: 0, elements: []};
    expect(element).toStrictEqual(expected)
});

test('a row with one node has embeddedXElements 1', () => {
    let element: InputType = {kind: "row", elements: [{kind: "node"}]};

    addEmbeddedXElements(element);

    let expected: OutputType = {
        kind: "row", embeddedXElements: 1, elements: [{kind: "node", embeddedXElements: 1}]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with one node has embeddedXElements 1', () => {
    let element: InputType = {kind: "column", elements: [{kind: "node"}]};

    addEmbeddedXElements(element);

    let expected: OutputType = {
        kind: "column", embeddedXElements: 1, elements: [{kind: "node", embeddedXElements: 1}]
    };
    expect(element).toStrictEqual(expected)
});

test('a column with multiple nodes has embeddedXElements 1', () => {
    let element: InputType = {
        kind: "column", elements: [{kind: "node"}, {kind: "node"}]
    };

    addEmbeddedXElements(element);

    let expected: OutputType = {
        kind: "column", embeddedXElements: 1, elements: [{
            kind: "node", embeddedXElements: 1
        }, {
            kind: "node", embeddedXElements: 1
        }]
    };
    expect(element).toStrictEqual(expected)
});

test('a row with two nodes has embeddedXElements 2', () => {
    let element: InputType = {
        kind: "row", elements: [{kind: "node"}, {kind: "node"}]
    };

    addEmbeddedXElements(element);

    let expected: OutputType = {
        kind: "row", embeddedXElements: 2, elements: [{
            kind: "node", embeddedXElements: 1
        }, {
            kind: "node", embeddedXElements: 1
        }]
    };
    expect(element).toStrictEqual(expected)
});