// All numbers centimeters
export interface ChildTableRow {
  childLength: number;
  skiLength: number;
  poleLength: number;
}

export interface MinMax {
  min: number;
  max: number;
}
export interface SkiAndPoleSizes {
  skis: MinMax;
  poles: MinMax;
}
export interface Sizes {
  classic: SkiAndPoleSizes;
  skating: SkiAndPoleSizes;
}

export type GetRecommendation = (length: number) => Recommendation | undefined;

export interface Recommender {
  getRecommendation: GetRecommendation;
  applicableFor: MinMax;
}

export type Recommendation =
  | {
      type: "only-sizes";
      sizes: Sizes;
    }
  | {
      type: "only-table-rows";
      rows: ChildTableRow[];
    }
  | {
      type: "both";
      sizes: Sizes;
      rows: ChildTableRow[];
    };

export interface MinxMaxPerStyle {
  classic: MinMax;
  skating: MinMax;
}

export interface ChildConfig {
  applicableFor: MinMax;
  tableRows: ChildTableRow[];
}

export interface AdultConfig {
  applicableFor: MinMax;
  skiAdditions: MinxMaxPerStyle;
  poleMultipliers: MinxMaxPerStyle;
}

export interface Config {
  childConfig: ChildConfig;
  adultConfig: AdultConfig;
}
