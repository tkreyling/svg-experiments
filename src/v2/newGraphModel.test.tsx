import {node} from "./newGraphModel";

test('visible defaults to true', () => {
    expect(node()).toStrictEqual({kind: "node", shape: "rectangle", visible: true});
});

test('given property visible overrides default', () => {
    expect(node({visible: false})).toStrictEqual({kind: "node", shape: "rectangle", visible: false});
});
