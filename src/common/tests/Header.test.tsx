import renderer from "react-test-renderer";

import Header from "common/Header";

describe("Header snapshot test", () => {
  it("should match snapshot", () => {
    const component = renderer.create(<Header />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
