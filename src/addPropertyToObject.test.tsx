export {}

type Node = {
    name: string
}

type Coordinates = {
    x: number
    y: number
}

test('extending an object by attributes does not affect object identity', () => {
    let node: Node = {
        name: "node"
    };
    let node2: Node = {
        name: "node"
    };

    let nodes = [node, node2];

    let nodeWithCoordinates: Node & Coordinates = Object.assign(node, {
        x: 5,
        y: 5
    });

    expect(node).toBe(nodeWithCoordinates);
    expect(nodes.indexOf(nodeWithCoordinates)).toBe(0);
});