import {width} from "./App";

test('no rectangle has no width', () => {
  expect(width([])).toBe(0)
});

test('one rectangle has the general fixed width', () => {
  expect(width(["rect"])).toBe(100)
});

test('two rectangles has the width of both of them and a additional spacing', () => {
  expect(width(["rect", "rect"])).toBe(100+10+100)
});

test('three rectangles has the width of them three of them and two additional spacings', () => {
  expect(width(["rect", "rect", "rect"])).toBe(100+10+100+10+100)
});
