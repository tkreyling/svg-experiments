import {NodeShape} from "./NodeShape";
import {Key, Node, X, Y} from "./graphModel";

test('coordinates are just passed through', () => {
  let props: Node & X & Y & Key = {
    kind: "node",
    x: 10,
    y: 10,
    name: "element 1",
    key: "0_0"
  };

  let actual = NodeShape(props);

  let rect = actual?.props["children"][0];
  expect(rect?.props["x"]).toBe(10);
  expect(rect?.props["y"]).toBe(10);
});
