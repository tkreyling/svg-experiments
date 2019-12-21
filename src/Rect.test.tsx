import {Rect} from "./App";

test('coordinates are just passed through', () => {
  let actual = Rect({x: 10, y: 10});

  expect(actual?.props["x"]).toBe(10);
  expect(actual?.props["y"]).toBe(10);
});
