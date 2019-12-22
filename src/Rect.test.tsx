import {Rect} from "./App";

test('coordinates are just passed through', () => {
  let props = {
    x: 10,
    y: 10,
    element: {name: "element 1"},
    key: "0_0",
    layerIndex: 0
  };

  let actual = Rect(props);

  let rect = actual?.props["children"][0];
  expect(rect?.props["x"]).toBe(10);
  expect(rect?.props["y"]).toBe(10);
});
