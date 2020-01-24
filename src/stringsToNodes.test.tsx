import {Node, Group, stringsToNodes, Stack} from "./App";

test('one string results in one node', () => {
    let input: Group<string | Node>[][] = [[{name: "group 1", kind: 'columns', elements: ["node"]}]];

    let expected: Stack<Node, unknown> = {
        kind: 'rows', elements: [
            {kind: 'columns', elements: [{name: "group 1", kind: 'columns', elements: [{name: "node"}]}]}
        ]
    };
    expect(stringsToNodes(input)).toStrictEqual(expected);
});

test('empty array element result in undefined node', () => {
    // noinspection JSConsecutiveCommasInArrayLiteral
    let input: Group<string | Node>[][] = [[{name: "group 1", kind: 'columns', elements: ["a", , "b"] as any}]];

    let expected: Stack<Node | undefined, unknown> = {
        kind: 'rows', elements: [
            {
                kind: 'columns',
                elements: [{name: "group 1", kind: 'columns', elements: [{name: "a"}, undefined, {name: "b"}]}]
            }
        ]
    };
    expect(stringsToNodes(input)).toStrictEqual(expected);
});

test('an element with symbol is passed through', () => {
    let input: Group<string | Node>[][] = [[{
        name: "group 1",
        kind: 'columns',
        elements: [{name: "node", symbol: "component"}]
    }]];

    let expected: Stack<Node, unknown> = {
        kind: 'rows', elements: [
            {
                kind: 'columns',
                elements: [{name: "group 1", kind: 'columns', elements: [{name: "node", symbol: "component"}]}]
            }
        ]
    };
    expect(stringsToNodes(input)).toStrictEqual(expected);
});