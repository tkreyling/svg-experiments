import {Group, GroupPosition, Height, Node, X, Y} from "./App";
import {GroupShape} from "./GroupShape";

test('coordinates are just passed through', () => {
  let props: Group<Node, unknown> & GroupPosition & X & Y & Height = {
    kind: "group",
    x: 10,
    y: 10,
    height: 100,
    name: "group 1",
    key: "0_0",
    index: 0,
    layerIndex: 0,
    elements: []
  };

  let actual = GroupShape(props);

  let rect = actual?.props["children"][0];
  expect(rect?.props["x"]).toBe(10);
  expect(rect?.props["y"]).toBe(10);
});
