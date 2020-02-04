import {LayerPosition, Node, X, Y} from "./App";
import {NodeShape} from "./NodeShape";

test('coordinates are just passed through', () => {
  let props: Node & LayerPosition & X & Y = {
    kind: "node",
    x: 10,
    y: 10,
    name: "element 1",
    key: "0_0",
    index: 0,
    layerIndex: 0
  };

  let actual = NodeShape(props);

  let rect = actual?.props["children"][0];
  expect(rect?.props["x"]).toBe(10);
  expect(rect?.props["y"]).toBe(10);
});
