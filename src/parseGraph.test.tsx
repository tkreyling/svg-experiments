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