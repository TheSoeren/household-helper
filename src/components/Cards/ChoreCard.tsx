import useChores from "@/hooks/useChores";
import useHttp from "@/hooks/useHttp";
import Chore from "@/models/Chore";
import toast from "react-hot-toast";
import BasicREventCard from "./OccurrenceCard";

export default function ChoreCard(chore: Chore) {
  const { deleteRequest } = useHttp();
  const { chores, mutateChores } = useChores();

  const deleteChoreHandler = async () => {
    if (!chore.id) {
      toast.error("Keine ID hinterlegt!");
      return;
    }

    mutateChores(
      chores.filter((c) => c.id !== chore.id),
      false
    );

    await deleteRequest(`/api/chore?id=${chore.id}`);
    mutateChores();
  };

  return <BasicREventCard occurrence={chore} onDelete={deleteChoreHandler} />;
}
