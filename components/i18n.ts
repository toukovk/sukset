export type Language = "fi" | "en";

export const i18n = {
  fi: {
    adultsTitle: "Aikuisille ja isommille lapsille\u200b(laskettu pituudesta)",
    children: {
      childHeight: "Lapsen pituus",
      title: "Pienemmille hiihtäjille (taulukosta)",
    },
    enterSkierHeight: "Syötä hiihtäjän pituus",
    footer: {
      beforeLink: "Pohjautuu Suomen Ladun",
      linkTitle: "Varusteet kuntoon",
      afterLink:
        "-sivuun, joka sisältää hyödyllistä tietoa hiihtovälineiden valinnasta.",
    },
    poles: "Sauvat",
    skis: "Sukset",
    styles: {
      skating: "Luistelu",
      traditional: "Perinteinen",
    },
    title: "Suksilaskuri",
  },
  en: {
    adultsTitle: "Adults and bigger children \u200b(calculated from heigth)",
    children: {
      childHeight: "Child heigth",
      title: "Smaller skiers (from table)",
    },
    enterSkierHeight: "Enter skier's height",
    footer: {
      beforeLink: "Based on Suomen Latu's page",
      linkTitle: "Varusteet kuntoon",
      afterLink: "that contains useful information on ski equipment.",
    },
    poles: "Poles",
    skis: "Skis",
    styles: {
      skating: "Skating",
      traditional: "Traditional",
    },
    title: "Ski sizes",
  },
};

export const languageNames = {
  en: "English",
  fi: "Suomi",
};

export type I18nForLang = typeof i18n.fi;
