import {Coordinates, Node, Rect} from "./App";

test('coordinates are just passed through', () => {
  let props: Node & Coordinates = {
    x: 10,
    y: 10,
    name: "element 1",
    key: "0_0",
    layerIndex: 0
  };

  let actual = Rect(props);

  let rect = actual?.props["children"][0];
  expect(rect?.props["x"]).toBe(10);
  expect(rect?.props["y"]).toBe(10);
});
