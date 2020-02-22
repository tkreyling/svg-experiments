import {EdgeShape} from "./EdgeShape";
import {
    ConnectionIndex,
    Edge,
    LayerDimensions,
    LayerIndex,
    LayerPosition,
    Node,
    NumberOfEdges,
    X,
    Y
} from "./graphModel";

test('coordinates are just passed through', () => {
    let edge: Edge<Node & LayerIndex & X & Y & LayerDimensions & NumberOfEdges> & LayerPosition & ConnectionIndex = {
        key: "0",
        index: 0,
        layerIndex: 0,
        fromIndex: 0,
        toIndex: 0,
        from: {
            kind: "node",
            name: "element 1",
            layerIndex: 0,
            x: 10,
            y: 10,
            belowLayerY: 80,
            upperSideEdges: 0,
            lowerSideEdges: 1
        },
        to: {
            kind: "node",
            name: "element 2",
            layerIndex: 1,
            x: 20,
            y: 100,
            belowLayerY: 150,
            upperSideEdges: 1,
            lowerSideEdges: 0
        }
    };

    let actual = EdgeShape(edge);

    expect(actual?.props["d"]).toBe("M 85 50 L 85 70 L 95 70 L 95 100");
});
