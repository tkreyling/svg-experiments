import {addEdgeIndex, EdgeIndex} from "./EdgeIndex";
import {Edge} from "../newGraphModel";

type InputType = Edge<unknown, unknown>[];
type OutputType = Edge<unknown, EdgeIndex>[];

test('no edges need no EdgeIndex', () => {
    addEdgeIndex([]);
});

test('one edge gets EdgeIndex 0', () => {
    let edges: InputType = [
        {from: {}, to: {}}
    ];

    addEdgeIndex(edges);

    let expected: OutputType = [
        {edgeIndex: 0, from: {}, to: {}}
    ];
    expect(edges).toStrictEqual(expected);
});

test('the second edge gets EdgeIndex 1', () => {
    let edges: InputType = [
        {from: {}, to: {}},
        {from: {}, to: {}}
    ];

    addEdgeIndex(edges);

    let expected: OutputType = [
        {edgeIndex: 0, from: {}, to: {}},
        {edgeIndex: 1, from: {}, to: {}}
    ];
    expect(edges).toStrictEqual(expected);
});