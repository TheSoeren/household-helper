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

export default function CalendarPage() {
  const { choresThisMonth } = useChores();

  const now = dayjs();

  const calendarEntries = choresThisMonth.map((chore) => ({
    title: chore.title,
    startDate: now.startOf("month").toISOString(),
    endDate: now.endOf("month").toISOString(),
    rrules: chore.vEvent.map((e) => e.toICal()).join(";"),
  }));

  return (
    <Scheduler data={calendarEntries} firstDayOfWeek={1} locale="de">
      <Toolbar />
      <ViewState />
      <ViewSwitcher />
      <DateNavigator />
      <TodayButton messages={{ today: "Heute" }} />
      <MonthView displayName="Monat" />
      <WeekView displayName="Woche" />
      <Appointments />
    </Scheduler>
  );
}
