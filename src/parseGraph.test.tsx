import {parseGraph} from "./App";

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
        layers: []
    };
    g
    `;
    expect(parseGraph(text)).toStrictEqual("Property edges is missing in graph object!");
});

test('reports undefined nodes', () => {
    let text = `
    var layers = [
        [[{name: "element 1"},, {name: "element 2"}]]
    ];
    var g = {
        layers: layers,
        edges: []
    };
    g
    `;
    expect(parseGraph(text)).toStrictEqual("Every node must be defined!");
});

test('returns valid graph', () => {
    let text = `
    var layers = [
        [[{name: "element 1"}, {name: "element 2"}]]
    ];
    var g = {
        layers: layers,
        edges: []
    };
    g
    `;
    expect(parseGraph(text)).toStrictEqual({
        layers: [
            [[{name: "element 1"}, {name: "element 2"}]]
        ],
        edges: []
    });
});