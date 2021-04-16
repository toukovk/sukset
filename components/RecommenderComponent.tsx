import { SyntheticEvent, useState } from "react";
import {
  ChildTableRow,
  MinMax,
  Recommendation,
  Recommender,
  Sizes,
} from "../model/types";
import styles from "../styles/RecommenderComponent.module.css";
import { i18n, I18nForLang, Language } from "./i18n";
interface RecommenderComponentProps {
  lang: Language;
  recommender: Recommender;
}

export const RecommenderComponent = ({
  lang,
  recommender,
}: RecommenderComponentProps): JSX.Element => {
  const [lengthStr, setLengthStr] = useState<string>("");

  const i: I18nForLang = i18n[lang];

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
        {i.enterSkierHeight} ({rangeToString(recommender.applicableFor)} cm){" "}
      </p>
      <input
        className={styles.lengthInput}
        type="text"
        maxLength={3}
        onChange={onInputChanged}
        value={lengthStr}
      />
      {recommendation && (
        <>
          <hr className={styles.recommendationDivider} />
          {renderRecommendation(i, recommendation)}
        </>
      )}
    </>
  );
};

const renderRecommendation = (
  i: I18nForLang,
  recommendation: Recommendation
): JSX.Element => {
  switch (recommendation.type) {
    case "only-sizes":
      return renderSizes(i, recommendation.sizes);
    case "only-table-rows":
      return renderTableRows(i, recommendation.rows);
    case "both":
      return (
        <>
          {renderTableRows(i, recommendation.rows)}
          {renderSizes(i, recommendation.sizes)}
        </>
      );
  }
};

const renderSizes = (
  i: I18nForLang,
  { classic, skating }: Sizes
): JSX.Element => {
  return (
    <div className={styles.adults}>
      <div className={styles.adultsTitle}>{i.adultsTitle}:</div>
      <span>{i.skis}</span>
      <ul>
        <li>
          {i.styles.traditional}: {rangeToString(classic.skis)}
        </li>
        <li>
          {i.styles.skating}: {rangeToString(skating.skis)}
        </li>
      </ul>
      <span>{i.poles}</span>
      <ul>
        <li>
          {i.styles.traditional}: {rangeToString(classic.poles)}
        </li>
        <li>
          {i.styles.skating}: {rangeToString(skating.poles)}
        </li>
      </ul>
    </div>
  );
};

const renderTableRows = (
  i: I18nForLang,
  rows: ChildTableRow[]
): JSX.Element => {
  return (
    <div className={styles.children}>
      <div className={styles.childrenTitle}>{i.children.title}:</div>
      <table>
        <thead>
          <tr>
            <th>{i.children.childHeight}</th>
            <th>{i.skis} (cm)</th>
            <th>{i.poles} (cm)</th>
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
