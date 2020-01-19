import {stringsToNodes} from "./App";

test('one string results in one node', () => {
    expect(stringsToNodes([[{name: "group 1", nodes: ["node"]}]]))
        .toStrictEqual([
            [{name: "group 1", nodes: [{name: "node"}]}]
        ]);
});

test('empty array element result in undefined node', () => {
    // noinspection JSConsecutiveCommasInArrayLiteral
    expect(stringsToNodes([[{name: "group 1", nodes: ["a", ,"b"] as any}]]))
        .toStrictEqual([
            [{name: "group 1", nodes: [{name: "a"}, undefined, {name: "b"}]}]
        ]);
});