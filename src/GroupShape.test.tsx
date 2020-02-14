import {GroupShape} from "./GroupShape";
import {Group, Height, Key, Node, X, Y} from "./graphModel";

test('coordinates are just passed through', () => {
  let props: Group<Node, unknown> & X & Y & Key & Height = {
    kind: "group",
    x: 10,
    y: 10,
    height: 100,
    name: "group 1",
    key: "0_0",
    elements: []
  };

  let actual = GroupShape(props);

  let rect = actual?.props["children"][0];
  expect(rect?.props["x"]).toBe(10);
  expect(rect?.props["y"]).toBe(10);
});
