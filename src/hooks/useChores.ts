import AuthContext from "@/contexts/AuthContext";
import Chore from "@/models/Chore";
import { dbChoresToChores } from "@/utils/dataConverter";
import { isThisMonth, isToday } from "@/utils/rschedule";
import { useContext } from "react";
import useSWR from "swr";
import useHttp from "./useHttp";

export default function useChores(initialValues?: Chore[]) {
  const { getRequest } = useHttp();
  const { user, authenticated } = useContext(AuthContext);

  const fetcher = (url: string) =>
    getRequest(url).then((json) => dbChoresToChores(json));

  const { data = initialValues || [], mutate } = useSWR<Chore[]>(
    "/api/chore",
    fetcher
  );

  const getOwnChores = (chores = data) => {
    if (!authenticated || !user) return [];
    return chores.filter((chore) => chore.responsible === user.name);
  };

  const getChoresToday = () => data.filter(({ vEvent }) => isToday(vEvent));

  const getChoresThisMonth = () =>
    data.filter(({ vEvent }) => isThisMonth(vEvent));

  const ownChores = getOwnChores();
  const choresToday = getChoresToday();
  const ownChoresToday = getOwnChores(choresToday);
  const choresThisMonth = getChoresThisMonth();

  return {
    chores: data,
    ownChores,
    choresToday,
    ownChoresToday,
    choresThisMonth,
    mutateChores: mutate,
  };
}
