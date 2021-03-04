import { getRecommendation } from "./logic";

describe("Calculation logic", () => {
  it("should return something", () => {
    const recommendation = getRecommendation(150);

    expect(recommendation).toBeTruthy();
  });
});
