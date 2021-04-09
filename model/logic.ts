import {
  AdultConfig,
  ChildTableRow,
  Config,
  GetRecommendation,
  MinMax,
  Recommender,
  Sizes,
} from "./types";

type ResultType = "children" | "adults" | "both";

export const getRecommender = (config: Config): Recommender => ({
  applicableFor: applicableeFor(config),
  getRecommendation: getRecommendation(config),
});

const getRecommendation = (config: Config): GetRecommendation => {
  const { adultConfig, childConfig } = config;

  const childRowsSorted = [...childConfig.tableRows].sort(
    (r1, r2) => r1.childLength - r2.childLength
  );

  return (length: number) => {
    const type = determineResultType(config, length);

    if (!type) {
      return undefined;
    }

    if (type === "children") {
      return {
        type: "only-table-rows",
        rows: findChildRows(childRowsSorted, length),
      };
    }
    if (type === "both") {
      return {
        type: "both",
        rows: findChildRows(childRowsSorted, length),
        sizes: calculateSizes(adultConfig, length),
      };
    }
    return {
      type: "only-sizes",
      sizes: calculateSizes(adultConfig, length),
    };
  };
};

const applicableeFor = ({ adultConfig, childConfig }: Config): MinMax => {
  return {
    min: childConfig.applicableFor.min,
    max: adultConfig.applicableFor.max,
  };
};

const determineResultType = (
  { adultConfig, childConfig }: Config,
  length: number
): ResultType | undefined => {
  const withinChild = isWithin(length, childConfig.applicableFor);
  const withinAdult = isWithin(length, adultConfig.applicableFor);
  if (withinAdult && withinChild) {
    return "both";
  } else if (withinChild) {
    return "children";
  } else if (withinAdult) {
    return "adults";
  } else {
    return undefined;
  }
};

const isWithin = (length: number, applicableFor: MinMax) =>
  length >= applicableFor.min && length <= applicableFor.max;

const calculateSizes = (adultConfig: AdultConfig, length: number): Sizes => ({
  classic: {
    poles: {
      min: length * adultConfig.poleMultipliers.classic.min,
      max: length * adultConfig.poleMultipliers.classic.max,
    },
    skis: {
      min: length + adultConfig.skiAdditions.classic.min,
      max: length + adultConfig.skiAdditions.classic.max,
    },
  },
  skating: {
    poles: {
      min: length * adultConfig.poleMultipliers.skating.min,
      max: length * adultConfig.poleMultipliers.skating.max,
    },
    skis: {
      min: length + adultConfig.skiAdditions.skating.min,
      max: length + adultConfig.skiAdditions.skating.max,
    },
  },
});

const findChildRows = (
  tableRowsSorted: ChildTableRow[],
  length: number
): ChildTableRow[] => {
  const firstLargerOrEqIndex = tableRowsSorted.findIndex(
    (row) => row.childLength >= length
  );
  if (firstLargerOrEqIndex === -1) {
    // All rows have length smaller than given length -> return last
    return [tableRowsSorted[tableRowsSorted.length - 1]];
  }

  const firstLargerOrEq = tableRowsSorted[firstLargerOrEqIndex];
  if (firstLargerOrEqIndex === 0) {
    // Length smaller or eq to row with smallest length
    return [firstLargerOrEq];
  }

  if (firstLargerOrEq.childLength === length) {
    // Exact match -> only matching row
    return [firstLargerOrEq];
  }

  // In between two rows -> return those
  return [tableRowsSorted[firstLargerOrEqIndex - 1], firstLargerOrEq];
};
