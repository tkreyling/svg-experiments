import {Graph, Node} from "./App";
import {parseGraph} from "./parseGraph";

test('reports unexpected token \;', () => {
    expect(parseGraph("var g = {;")).toStrictEqual("Unexpected token ';'");
});

test('reports unexpected token \"', () => {
    expect(parseGraph(`var nodes = ["node 1", "`)).toStrictEqual("Invalid or unexpected token");
});

test('reports missing return value graph', () => {
    expect(parseGraph(`var nodes = ["node 1"];`)).toStrictEqual("Script is not returning a graph object!");
});

test('reports missing property layers', () => {
    let text = `
    var g = {
        edges: []
    };
    g
    `;
    expect(parseGraph(text)).toStrictEqual("Property layers is missing in graph object!");
});

test('reports missing property edges', () => {
    let text = `
    var g = {
        stack: {kind: 'stack'}
    };
    g
    `;
    expect(parseGraph(text)).toStrictEqual("Property edges is missing in graph object!");
});

test('returns valid graph', () => {
    let text = `
    var stack = {
        kind: 'stack',
        elements: [{
            kind: 'layer',
            elements: [{
                kind: 'group', name: 'group 1',
                elements: [
                    {kind: 'node', name: "element 1"}, 
                    {kind: 'node', name: "element 2"}
                ]
            }]
        }]
    };
    var g = {
        stack: stack,
        edges: []
    };
    g
    `;
    let expected: Graph<Node, unknown, unknown> = {
        stack: {
            kind: 'stack',
            elements: [{
                kind: 'layer',
                elements: [{
                    kind: 'group', name: 'group 1',
                    elements: [
                        {kind: 'node', name: "element 1"},
                        {kind: 'node', name: "element 2"}
                    ]
                }]
            }]
        },
        edges: []
    };
    expect(parseGraph(text)).toStrictEqual(expected);
});

test('reports undefined property from', () => {
    let text = `
    var stack = {
        kind: 'stack',
        elements: [{
            kind: 'layer',
            elements: [{
                kind: 'group', name: 'group 1',
                elements: [{name: "element 1"}, {name: "element 2"}]
            }]
        }]
    };
    var layers = stack.elements;
    var g = {
        stack: stack,
        edges: [{from: layers[0].elements[0].elements[3], to: layers[0].elements[0].elements[1]}]
    };
    g
    `;
    expect(parseGraph(text)).toStrictEqual("Property from must be defined on every edge!");
});

test('reports undefined property to', () => {
    let text = `
    var stack = {
        kind: 'stack',
        elements: [{
            kind: 'layer',
            elements: [{
                kind: 'group', name: 'group 1',
                elements: [{name: "element 1"}, {name: "element 2"}]
            }]
        }]
    };
    var layers = stack.elements;
    var g = {
        stack: stack,
        edges: [{from: layers[0].elements[0].elements[0], to: layers[0].elements[0].elements[3]}]
    };
    g
    `;
    expect(parseGraph(text)).toStrictEqual("Property to must be defined on every edge!");
});

test('returns valid graph with edges', () => {
    let text = `
    var stack = {
        kind: 'stack',
        elements: [{
            kind: 'layer',
            elements: [{
                kind: 'group', name: 'group 1',
                elements: [{name: "element 1"}, {name: "element 2"}]
            }]
        }]
    };
    var layers = stack.elements;
    var g = {
        stack: stack,
        edges: [{from: layers[0].elements[0].elements[0], to: layers[0].elements[0].elements[1]}]
    };
    g
    `;
    expect(parseGraph(text)).toStrictEqual({
        stack: {
            kind: 'stack',
            elements: [{
                kind: 'layer',
                elements: [{
                    kind: 'group', name: 'group 1',
                    elements: [{name: "element 1"}, {name: "element 2"}]
                }]
            }]
        },
        edges: [{from: {name: "element 1"}, to: {name: "element 2"}}]
    });
});