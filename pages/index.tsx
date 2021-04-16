import fs from "fs";
import { GetStaticProps } from "next";
import Head from "next/head";
import path from "path";
import { RecommenderComponent } from "../components/RecommenderComponent";
import { getRecommender } from "../model/logic";
import { Config } from "../model/types";
import styles from "../styles/Home.module.css";

interface HomeProps {
  config: Config;
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const fileContent = fs.readFileSync(
    path.join(process.cwd(), "example-config.json"),
    "utf8"
  );
  const config = JSON.parse(fileContent);

  return Promise.resolve({
    props: {
      config,
    },
    revalidate: false,
  });
};

export default function Home(props: HomeProps): JSX.Element {
  const recommender = getRecommender(props.config);

  return (
    <div className={styles.container}>
      <Head>
        <title>🎿 Suksilaskuri 🎿</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Suksilaskuri</h1>

        <RecommenderComponent recommender={recommender} />
      </main>

      <footer className={styles.footer}>
        <p>
          Pohjautuu Suomen Ladun{" "}
          <a
            href="https://www.suomenlatu.fi/ulkoile/lajit/hiihto/varusteet-kuntoon.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Varusteet&nbsp;kuntoon
          </a>{" "}
          -sivuun, joka sisältää hyödyllistä tietoa hiihtovälineiden valinnasta.
        </p>
      </footer>
    </div>
  );
}
