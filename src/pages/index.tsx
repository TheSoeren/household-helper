import Occurrence from "@/models/Occurrence";
import useEvents from "@/hooks/useEvents";
import useChores from "@/hooks/useChores";
import { useState } from "react";
import OccurrenceList from "@/components/Lists/OccurrenceList";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home() {
  const { t } = useTranslation("home-page");
  const { choresToday, ownChoresToday } = useChores([]);
  const { eventsToday, ownEventsToday } = useEvents([]);

  const [vEventsToday] = useState<Occurrence[]>([
    ...choresToday,
    ...eventsToday,
  ]);
  const [ownVEventsToday] = useState<Occurrence[]>([
    ...ownChoresToday,
    ...ownEventsToday,
  ]);

  return (
    <>
      <OccurrenceList
        title={t("my-occurrences-today")}
        occurrences={ownVEventsToday}
      />
      <OccurrenceList
        title={t("occurrences-today")}
        occurrences={vEventsToday}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  let translations = {};

  if (locale) {
    translations = await serverSideTranslations(locale, [
      "sidebar",
      "home-page",
    ]);
  }

  return {
    props: {
      ...translations,
    },
  };
};
