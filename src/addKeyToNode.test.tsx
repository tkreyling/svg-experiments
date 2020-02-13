import {Key, Node, Stack} from "./graphModel";
import {addKeyToNode} from "./addKeyToNode";

test('no nodes need no key', () => {
    addKeyToNode({kind: 'stack', elements: []});
});

test('one node in one layer ', () => {
    let elements: Stack<Node, unknown> = {
        kind: 'stack', elements: [{
            kind: 'layer', elements: [{
                kind: 'group', name: "group 1", elements: [{
                    kind: "node", name: "node 1"
                }]
            }]
        }]
    };

    addKeyToNode(elements);

    let expectedElements: Stack<Node & Key, Key> = {
        kind: 'stack', elements: [{
            kind: 'layer', elements: [{
                kind: 'group', name: "group 1", key: "0", elements: [{
                    kind: "node", name: "node 1", key: "1"
                }]
            }]
        }]
    };
    expect(elements).toStrictEqual(expectedElements);
});