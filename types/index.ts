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

// TODO Recommendation
