import {stringsToNodes} from "./App";

test('one string results in one node', () => {
    expect(stringsToNodes([[["node"]]]))
        .toStrictEqual([
            [{name: "group", nodes: [{name: "node"}]}]
        ]);
});

test('empty array element result in undefined node', () => {
    // noinspection JSConsecutiveCommasInArrayLiteral
    expect(stringsToNodes([[["a", ,"b"] as any]]))
        .toStrictEqual([
            [{name: "group", nodes: [{name: "a"}, undefined, {name: "b"}]}]
        ]);
});