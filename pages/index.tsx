import fs from "fs";
import { GetStaticProps, GetStaticPropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import path from "path";
import { i18n, Language, languageNames } from "../components/i18n";
import { RecommenderComponent } from "../components/RecommenderComponent";
import { getRecommender } from "../model/logic";
import { Config } from "../model/types";
import styles from "../styles/Home.module.css";

interface HomeProps {
  config: Config;
  lang: Language;
}

export const getStaticProps: GetStaticProps<HomeProps> = async (context) => {
  const fileContent = fs.readFileSync(
    path.join(process.cwd(), "config.json"),
    "utf8"
  );

  const config = JSON.parse(fileContent);

  return Promise.resolve({
    props: {
      config,
      lang: determineLanguage(context),
    },
    revalidate: false,
  });
};

const determineLanguage = ({
  locale,
  defaultLocale,
}: GetStaticPropsContext): Language => {
  // TODO use type assertion
  if (locale && (locale === "fi" || locale === "en")) {
    return locale;
  }
  if (defaultLocale && (defaultLocale === "fi" || defaultLocale === "en")) {
    return defaultLocale;
  }
  return "fi";
};

export default function Home(props: HomeProps): JSX.Element {
  const recommender = getRecommender(props.config);
  const i = i18n[props.lang];
  const renderLanguage = createRenderLanguage(props.lang);

  return (
    <div className={styles.container}>
      <Head>
        <title>🎿 {i.title} 🎿</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{i.title}</h1>

        <RecommenderComponent lang={props.lang} recommender={recommender} />
      </main>

      <footer className={styles.footer}>
        <p className={styles.languageSelector}>
          {renderLanguage("fi")} | {renderLanguage("en")}
        </p>
        <p>
          {i.footer.beforeLink + " "}
          <a
            href="https://www.suomenlatu.fi/ulkoile/lajit/hiihto/varusteet-kuntoon.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            {i.footer.linkTitle.replace(/ /g, "\u00a0")}
          </a>{" "}
          {i.footer.afterLink}
        </p>
      </footer>
    </div>
  );
}

const createRenderLanguage = (activeLanguage: Language) => (
  languageToRender: Language
): JSX.Element | string => {
  const languageName = languageNames[languageToRender];

  if (activeLanguage === languageToRender) {
    return languageName;
  } else {
    return (
      <Link href="/" locale={languageToRender}>
        <a>{languageName}</a>
      </Link>
    );
  }
};
