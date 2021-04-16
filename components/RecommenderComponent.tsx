import { SyntheticEvent, useState } from "react";
import {
  ChildTableRow,
  MinMax,
  Recommendation,
  Recommender,
  Sizes,
} from "../model/types";
import styles from "../styles/RecommenderComponent.module.css";
interface RecommenderComponentProps {
  recommender: Recommender;
}

export const RecommenderComponent = ({
  recommender,
}: RecommenderComponentProps): JSX.Element => {
  const [lengthStr, setLengthStr] = useState<string>("");
  const length = parseInt(lengthStr, 10);

  const recommendation = !isNaN(length)
    ? recommender.getRecommendation(length)
    : undefined;

  const onInputChanged = (e: SyntheticEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setLengthStr(value);
  };

  return (
    <>
      <p>
        Syötä hiihtäjän pituus ({rangeToString(recommender.applicableFor)} cm)
      </p>
      <input
        className={styles.lengthInput}
        type="text"
        /**  
           TODO pattern of only numbers
           TODO min/max values?
        */
        maxLength={3}
        onChange={onInputChanged}
        value={lengthStr}
      />
      {recommendation && (
        <>
          <hr className={styles.recommendationDivider} />
          {renderRecommendation(recommendation)}
        </>
      )}
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
};

const renderSizes = ({ classic, skating }: Sizes): JSX.Element => {
  return (
    <div className={styles.adults}>
      <div className={styles.adultsTitle}>
        Aikuisille ja isommille lapsille:
      </div>
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
    </div>
  );
};

const renderTableRows = (rows: ChildTableRow[]): JSX.Element => {
  return (
    <div className={styles.children}>
      <div className={styles.childrenTitle}>
        Pienempien hiihtäjien taulukosta:
      </div>
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
              <td>{rangeToString(row.skiLength)}</td>
              <td>{rangeToString(row.poleLength)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const rangeToString = (range: number | MinMax): string => {
  if (typeof range === "number") {
    return `${range}`;
  }
  const min = Math.round(range.min);
  const max = Math.round(range.max);
  return `${min} - ${max}`;
};
