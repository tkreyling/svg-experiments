import {Node, Group, stringsToNodes, Stack} from "./App";

test('one string results in one node', () => {
    let input: Group<string | Node, unknown>[][] = [[{name: "group 1", kind: 'group', elements: ["node"]}]];

    let expected: Stack<Node, unknown> = {
        kind: 'stack', elements: [
            {kind: 'layer', elements: [{name: "group 1", kind: 'group', elements: [{name: "node", kind: 'node'}]}]}
        ]
    };
    expect(stringsToNodes(input)).toStrictEqual(expected);
});

test('empty array element result in undefined node', () => {
    // noinspection JSConsecutiveCommasInArrayLiteral
    let input: Group<string | Node, unknown>[][] = [[{name: "group 1", kind: 'group', elements: ["a", , "b"] as any}]];

    try {
        stringsToNodes(input);
        fail("Exception must be thrown");
    } catch (e) {
        expect(e.message).toStrictEqual("Empty array elements are not allowed.");
    }
});

test('an element with symbol is passed through', () => {
    let input: Group<string | Node, unknown>[][] = [[{
        name: "group 1",
        kind: 'group',
        elements: [{name: "node", kind: 'node', symbol: "component"}]
    }]];

    let expected: Stack<Node, unknown> = {
        kind: 'stack', elements: [
            {
                kind: 'layer',
                elements: [{name: "group 1", kind: 'group', elements: [{name: "node", kind: 'node', symbol: "component"}]}]
            }
        ]
    };
    expect(stringsToNodes(input)).toStrictEqual(expected);
});