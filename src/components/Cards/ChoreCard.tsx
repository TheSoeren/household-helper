import useChores from "@/hooks/useChores";
import { deleteRequest } from "@/utils/httpRequests";
import Chore from "@/models/Chore";
import toast from "react-hot-toast";
import AppointmentCard from "./AppointmentCard";

export default function ChoreCard(chore: Chore) {
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

  return <AppointmentCard appointment={chore} onDelete={deleteChoreHandler} />;
}
