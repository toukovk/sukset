import { Recommendation } from "./types";

export const getRecommendation = (length: number): Recommendation => ({
  type: "only-sizes",
  sizes: {
    classic: {
      poles: {
        min: length + 1,
        max: length + 2,
      },
      skis: {
        min: 1,
        max: 2,
      },
    },
    skating: {
      poles: {
        min: length + 1,
        max: length + 2,
      },
      skis: {
        min: 1,
        max: 2,
      },
    },
  },
});
