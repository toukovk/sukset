import * as exampleConfig from "../example-config.json";
import { getRecommender } from "./logic";
import { Recommendation } from "./types";

const recommend = getRecommender(exampleConfig).getRecommendation;

const childTableRow90 = {
  childLength: 90,
  skiLength: 91,
  poleLength: 92,
};
const childTableRow100 = {
  childLength: 100,
  skiLength: 101,
  poleLength: 102,
};
const childTableRow110 = {
  childLength: 110,
  skiLength: 111,
  poleLength: 112,
};
const childTableRow120 = {
  childLength: 120,
  skiLength: {
    min: 121,
    max: 125,
  },
  poleLength: {
    min: 122,
    max: 126,
  },
};

describe("getRecommendation", () => {
  describe("for lengths outside applicable ranges", () => {
    it("should return undefined for too small length", () => {
      const recommendation = recommend(50);

      expect(recommendation).toBeUndefined();
    });

    it("should return undefined for too big length", () => {
      const recommendation = recommend(300);

      expect(recommendation).toBeUndefined();
    });
  });

  describe("for adult lengths", () => {
    it("should return right results", () => {
      const recommendation = recommend(150);

      const expected: Recommendation = {
        type: "only-sizes",
        sizes: {
          classic: {
            poles: {
              min: 150,
              max: 150 * 1.1,
            },
            skis: {
              min: 150 + 5,
              max: 150 + 6,
            },
          },
          skating: {
            poles: {
              min: 150 * 1.1,
              max: 150 * 1.2,
            },
            skis: {
              min: 150 + 7,
              max: 150 + 8,
            },
          },
        },
      };
      expect(recommendation).toEqual(expected);
    });
  });

  describe("for children lengths", () => {
    it("should return right row for an exact length match", () => {
      const recommendation = recommend(100);

      const expected: Recommendation = {
        type: "only-table-rows",
        rows: [childTableRow100],
      };
      expect(recommendation).toEqual(expected);
    });

    it("should return row with smallest length for an exact lowest length", () => {
      const recommendation = recommend(90);

      const expected: Recommendation = {
        type: "only-table-rows",
        rows: [childTableRow90],
      };
      expect(recommendation).toEqual(expected);
    });

    it("should return the row with smallest length for a length lower than lowest row", () => {
      const recommendation = recommend(89);

      const expected: Recommendation = {
        type: "only-table-rows",
        rows: [childTableRow90],
      };
      expect(recommendation).toEqual(expected);
    });

    it("should return upper and lower row for a length in between", () => {
      const recommendation101 = recommend(101);
      const recommendation109 = recommend(109);

      const expected: Recommendation = {
        type: "only-table-rows",
        rows: [childTableRow100, childTableRow110],
      };
      expect(recommendation101).toEqual(expected);
      expect(recommendation109).toEqual(expected);
    });
  });

  describe("for lengths using both adult & children lengths", () => {
    it("should return both rows and calculated lengths", () => {
      const recommendation = recommend(120);

      const expected: Recommendation = {
        type: "both",
        rows: [childTableRow120],
        sizes: {
          classic: {
            poles: {
              min: 120,
              max: 120 * 1.1,
            },
            skis: {
              min: 120 + 5,
              max: 120 + 6,
            },
          },
          skating: {
            poles: {
              min: 120 * 1.1,
              max: 120 * 1.2,
            },
            skis: {
              min: 120 + 7,
              max: 120 + 8,
            },
          },
        },
      };
      expect(recommendation).toEqual(expected);
    });

    it('should return both rows and calculated lengths also at the upper limit of "both"', () => {
      const recommendation = recommend(125);

      const expected: Recommendation = {
        type: "both",
        rows: [childTableRow120],
        sizes: {
          classic: {
            poles: {
              min: 125,
              max: 125 * 1.1,
            },
            skis: {
              min: 125 + 5,
              max: 125 + 6,
            },
          },
          skating: {
            poles: {
              min: 125 * 1.1,
              max: 125 * 1.2,
            },
            skis: {
              min: 125 + 7,
              max: 125 + 8,
            },
          },
        },
      };
      expect(recommendation).toEqual(expected);
    });

    it('should return both rows and calculated lengths also at the lower limit of "both"', () => {
      const recommendation = recommend(115);

      const expected: Recommendation = {
        type: "both",
        rows: [childTableRow110, childTableRow120],
        sizes: {
          classic: {
            poles: {
              min: 115,
              max: 115 * 1.1,
            },
            skis: {
              min: 115 + 5,
              max: 115 + 6,
            },
          },
          skating: {
            poles: {
              min: 115 * 1.1,
              max: 115 * 1.2,
            },
            skis: {
              min: 115 + 7,
              max: 115 + 8,
            },
          },
        },
      };
      expect(recommendation).toEqual(expected);
    });
  });
});

describe("applicableFor", () => {
  it("should get min from childConfig and max from adultConfig", () => {
    const applicableFor = getRecommender(exampleConfig).applicableFor;

    expect(applicableFor).toEqual({
      min: 60,
      max: 250,
    });
  });
});
