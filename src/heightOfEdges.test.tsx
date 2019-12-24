import {EDGE_SPACING, heightOfEdges} from "./App";

test('no edges need no additional space after a layer', () => {
  expect(heightOfEdges([], 1))
      .toStrictEqual([0])
});

test('no edges need no space between layers', () => {
  expect(heightOfEdges([], 3))
      .toStrictEqual([0, 0, 0])
});

test('one edge between two consecutive layers requires no additional space', () => {
    expect(heightOfEdges([
        {
            from: {key: "0_0", index: 0, layerIndex: 0},
            to: {key: "1_0", index: 0, layerIndex: 1}
        }
    ], 2))
        .toStrictEqual([0, 0])
});

test('two edges between two consecutive layers require additional spacing', () => {
    expect(heightOfEdges([
        {
            from: {key: "0_0", index: 0, layerIndex: 0},
            to: {key: "1_0", index: 0, layerIndex: 1}
        },
        {
            from: {key: "0_1", index: 1, layerIndex: 0},
            to: {key: "1_1", index: 1, layerIndex: 1}
        }
    ], 2))
        .toStrictEqual([EDGE_SPACING, 0])
});

test('an edge from a lower layer to an upper layer requires space below the upper layer', () => {
  expect(heightOfEdges([
    {
      from: {key: "1_0", index: 0, layerIndex: 1},
      to: {key: "0_0", index: 0, layerIndex: 0}
    },
    {
      from: {key: "1_1", index: 1, layerIndex: 1},
      to: {key: "0_1", index: 1, layerIndex: 0}
    }
  ], 2))
      .toStrictEqual([EDGE_SPACING, 0])
});

test('edges from the bottom layer to the bottom layer requires space below the bottom layer', () => {
  expect(heightOfEdges([
    {
      from: {key: "0_0", index: 0, layerIndex: 0},
      to: {key: "0_1", index: 1, layerIndex: 0}
    },
    {
      from: {key: "0_2", index: 2, layerIndex: 0},
      to: {key: "0_3", index: 3, layerIndex: 0}
    }
  ], 1))
      .toStrictEqual([EDGE_SPACING])
});

test('layers without edges do not require additional height, but will result in an 0 entry', () => {
    expect(heightOfEdges([
    ], 4))
        .toStrictEqual([0, 0, 0, 0])
});