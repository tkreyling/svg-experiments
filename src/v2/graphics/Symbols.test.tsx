import {ComponentSymbol, Symbol} from "./Symbols";

test('coordinates are just passed through', () => {
  let props: Symbol = {
    symbolKey: "0_0",
    x: 10,
    y: 10,
    width: 30
  };

  let actual = ComponentSymbol(props);

  let rect = actual?.props["children"][0];
  expect(rect?.props["x"]).toBe(10 + 30 * 0.4 / 2);
  expect(rect?.props["y"]).toBe(10);
});