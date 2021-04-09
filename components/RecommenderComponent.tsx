import { SyntheticEvent, useState } from "react";
import {
  ChildTableRow,
  MinMax,
  Recommendation,
  Recommender,
  Sizes,
} from "../model/types";

interface RecommenderComponentProps {
  recommender: Recommender;
}

export const RecommenderComponent = (
  props: RecommenderComponentProps
): JSX.Element => {
  const [lengthStr, setLengthStr] = useState<string>("");
  const length = parseInt(lengthStr, 10);

  const recommendation = !isNaN(length) ? props.recommender(length) : undefined;

  const onInputChanged = (e: SyntheticEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setLengthStr(value);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Pituus"
        /**  
           TODO pattern of only numbers
           TODO min/max values?
        */
        maxLength={3}
        onChange={onInputChanged}
        value={lengthStr}
      />
      {recommendation && renderRecommendation(recommendation)}
    </>
  );
};

const renderRecommendation = (recommendation: Recommendation): JSX.Element => {
  switch (recommendation.type) {
    case "only-sizes":
      return renderSizes(recommendation.sizes);
    case "only-table-rows":
      return renderTableRows(recommendation.rows);
    case "both":
      return (
        <>
          {renderTableRows(recommendation.rows)}
          {renderSizes(recommendation.sizes)}
        </>
      );
  }
  return <>{JSON.stringify(recommendation)}</>;
};

const renderSizes = ({ classic, skating }: Sizes): JSX.Element => {
  return (
    <>
      <span>Sukset</span>
      <ul>
        <li>Perinteinen: {rangeToString(classic.skis)}</li>
        <li>Luistelu: {rangeToString(skating.skis)}</li>
      </ul>
      <span>Sauvat</span>
      <ul>
        <li>Perinteinen: {rangeToString(classic.poles)}</li>
        <li>Luistelu: {rangeToString(skating.poles)}</li>
      </ul>
    </>
  );
};

const renderTableRows = (rows: ChildTableRow[]): JSX.Element => {
  return (
    <table>
      <thead>
        <tr>
          <th>Lapsen pituus</th>
          <th>Sukset (cm)</th>
          <th>Sauvat (cm)</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.childLength}>
            <td>{row.childLength}</td>
            <td>{row.skiLength}</td>
            <td>{row.poleLength}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const rangeToString = (range: MinMax): string =>
  `${Math.round(range.min)} - ${Math.round(range.max)}`;
