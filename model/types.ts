// All numbers centimeters
export interface ChildTableRow {
  childLength: number;
  skiLength: number;
  poleLength: number;
}

export interface LengthRange {
  min: number;
  max: number;
}

export interface SkiAndPoleSizes {
  skis: LengthRange;
  poles: LengthRange;
}

export interface Sizes {
  classic: SkiAndPoleSizes;
  skating: SkiAndPoleSizes;
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
