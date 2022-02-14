import Appointment from "@/models/Appointment";
import useEvents from "@/hooks/useEvents";
import useChores from "@/hooks/useChores";
import { useState } from "react";
import AppointmentList from "@/components/Lists/AppointmentList";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home() {
  const { t } = useTranslation("home-page");
  const { choresToday, ownChoresToday } = useChores([]);
  const { eventsToday, ownEventsToday } = useEvents([]);

  const [ownAppointmentsToday] = useState<Appointment[]>([
    ...ownChoresToday,
    ...ownEventsToday,
  ]);
  const [appointmentsToday] = useState<Appointment[]>([
    ...choresToday,
    ...eventsToday,
  ]);

  return (
    <>
      <AppointmentList
        title={t("my-appointments-today")}
        appointments={ownAppointmentsToday}
      />
      <AppointmentList
        title={t("appointments-today")}
        appointments={appointmentsToday}
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
