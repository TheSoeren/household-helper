import ChoreList from "@/components/Lists/ChoreList";
import Chore from "@/models/Chore";
import { DateAdapter, RRule, VEvent } from "@/setups/rschedule";
import dayjs from "dayjs";
import useHttp from "@/hooks/useHttp";
import ChoresPageSkeleton from "@/components/Skeletons/ChoresPageSkeleton";
import useChores from "@/hooks/useChores";
import Icon from "@/models/Icon";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Chores() {
  const { postRequest } = useHttp();
  const { chores, ownChores, mutateChores } = useChores([]);
  const { t } = useTranslation("chores-page");

  if (!chores) {
    return <ChoresPageSkeleton />;
  }

  const createChoreHandler = async () => {
    const start = dayjs().subtract(1, "month");
    const rule = new RRule({
      frequency: "WEEKLY",
      byDayOfWeek: ["MO"],
      byHourOfDay: [dayjs().hour() as DateAdapter.Hour],
      start,
    });

    const icon = new Icon("fas fa-calendar", "bg-slate-500");
    const vevent = new VEvent({
      start,
      rrules: [rule],
      duration: 2 * 60 * 60 * 1000,
    });
    const chore = new Chore("Fabian", "Abstauben", "description", icon, vevent);

    // https://swr.vercel.app/docs/mutation#mutation-and-post-request
    mutateChores([...chores, chore], false);

    await postRequest("/api/chore", chore.toString());
    mutateChores();
  };

  return (
    <>
      <ChoreList title={t("my-chores")} chores={ownChores} />
      <ChoreList title={t("all-chores")} chores={chores} />
      <button
        className="bg-slate-50 hover:text-stone-500 shadow-lg h-10 w-10 items-center justify-center align-center rounded-full focus:outline-none mx-3"
        type="button"
        onClick={createChoreHandler}
      >
        <i className="fas fa-plus"></i>
      </button>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  let translations = {};

  if (locale) {
    translations = await serverSideTranslations(locale, [
      "sidebar",
      "chores-page",
    ]);
  }

  return {
    props: {
      ...translations,
    },
  };
};
