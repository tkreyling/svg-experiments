import {stringsToNodes} from "./App";

test('one string results in one node', () => {
    expect(stringsToNodes([[{name: "group 1", elements: ["node"]}]]))
        .toStrictEqual([
            {orientation: 'columns', elements: [{name: "group 1", elements: [{name: "node"}]}]}
        ]);
});

test('empty array element result in undefined node', () => {
    // noinspection JSConsecutiveCommasInArrayLiteral
    expect(stringsToNodes([[{name: "group 1", elements: ["a", ,"b"] as any}]]))
        .toStrictEqual([
            {orientation: 'columns', elements: [{name: "group 1", elements: [{name: "a"}, undefined, {name: "b"}]}]}
        ]);
});

test('an element with symbol is passed through', () => {
    expect(stringsToNodes([[{name: "group 1", elements: [{name: "node", symbol: "component"}]}]]))
        .toStrictEqual([
            {orientation: 'columns', elements: [{name: "group 1", elements: [{name: "node", symbol: "component"}]}]}
        ]);
});