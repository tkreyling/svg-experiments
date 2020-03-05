import {node} from "./newGraphModel";

test('visible defaults to true', () => {
    expect(node()).toStrictEqual({kind: "node", visible: true});
});

test('given property visible overrides default', () => {
    expect(node({visible: false})).toStrictEqual({kind: "node", visible: false});
});
