import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  MonthView,
  DateNavigator,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
import useChores from "@/hooks/useChores";
import dayjs from "dayjs";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export default function CalendarPage() {
  const { locale } = useRouter();
  const { t } = useTranslation("calendar-page");
  const { choresThisMonth } = useChores();

  const now = dayjs();

  const calendarEntries = choresThisMonth.map((chore) => ({
    title: chore.title,
    startDate: now.startOf("month").toISOString(),
    endDate: now.endOf("month").toISOString(),
    rrules: chore.vEvent.map((e) => e.toICal()).join(";"),
  }));

  return (
    <Scheduler data={calendarEntries} firstDayOfWeek={1} locale={locale}>
      <Toolbar />
      <ViewState />
      <ViewSwitcher />
      <DateNavigator />
      <TodayButton messages={{ today: t("today") }} />
      <MonthView displayName={t("month-view.label")} />
      <WeekView displayName={t("week-view.label")} />
      <Appointments />
    </Scheduler>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  let translations = {};

  if (locale) {
    translations = await serverSideTranslations(locale, [
      "sidebar",
      "calendar-page",
    ]);
  }

  return {
    props: {
      ...translations,
    },
  };
};
