import Event from "@/models/Event";
import toast from "react-hot-toast";
import AppointmentCard from "./AppointmentCard";

export default function EventCard(event: Event) {
  const deleteDeleteHandler = async () => {
    if (!event.id) {
      toast.error("Keine ID hinterlegt!");
      return;
    }

    // ToDo: Delete Event
  };

  return <AppointmentCard appointment={event} onDelete={deleteDeleteHandler} />;
}

EventCard.defaultProps = {
  iconColor: "bg-red-500",
};
