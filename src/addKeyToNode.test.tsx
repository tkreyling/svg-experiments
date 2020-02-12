import {Index, Key, LayerIndex, Node, Stack} from "./graphModel";
import {addKeyToNode} from "./addKeyToNode";

test('no nodes need no key', () => {
    addKeyToNode({kind: 'stack', elements: []});
});

test('one node in one layer ', () => {
    let elements: Stack<Node & LayerIndex & Index, LayerIndex & Index> = {
        kind: 'stack', elements: [{
            kind: 'layer', elements: [{
                kind: 'group', name: "group 1", layerIndex: 0, index: 0, elements: [{
                    kind: "node", name: "node 1", layerIndex: 0, index: 0
                }]
            }]
        }]
    };

    addKeyToNode(elements);

    let expectedElements: Stack<Node & Key & LayerIndex & Index, Key & LayerIndex & Index> = {
        kind: 'stack', elements: [{
            kind: 'layer', elements: [{
                kind: 'group', name: "group 1", layerIndex: 0, index: 0, key: "G_0_0", elements: [{
                    kind: "node", name: "node 1", layerIndex: 0, index: 0, key: "0_0"
                }]
            }]
        }]
    };
    expect(elements).toStrictEqual(expectedElements);
});