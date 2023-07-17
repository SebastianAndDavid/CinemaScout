import { render, test, expect } from "@testing-library/react";
import DummyComponent from "../DummyComponent";

test('should render "DummyComponent" in a div', () => {
  const { getByText } = render(<DummyComponent />);
  const dummyText = getByText("DummyComponent");
  expect(dummyText).toBeInTheDocument();
});
