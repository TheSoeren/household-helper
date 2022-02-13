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
import dayjs, { Dayjs } from "dayjs";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { DayjsDateAdapter, RRule } from "@/setups/rschedule";

const RRulePattern = new RegExp("(?<=RRULE:).*", "gm");

export default function CalendarPage() {
  const { locale } = useRouter();
  const { t } = useTranslation("calendar-page");
  const { choresThisMonth } = useChores();

  const startOfMonth = dayjs().startOf("M");

  const calendarEntries = choresThisMonth.map(({ title, vEvent }) => {
    const startDate = vEvent.start.date;

    // vEvent.duration is either of type number, or DayjsDateAdapter. This forces me to
    // assume the type, since there is no shared way of transforming the value to string.
    const adapterDate = (vEvent.duration as DayjsDateAdapter).date;
    const millis = vEvent.duration as number;

    let duration = vEvent.duration ? millis : 0;
    if (DayjsDateAdapter.isDate(adapterDate)) {
      duration = adapterDate.diff(vEvent.start.date);
    }

    return {
      title,
      startDate: startDate.toISOString(),
      endDate: startDate.add(duration, "millis").toISOString(),
      rRule: vEvent.toICal().match(RRulePattern)?.[0] ?? "",
    };
  });

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
