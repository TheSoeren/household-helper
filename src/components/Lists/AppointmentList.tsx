import AppointmentCard from "@/components/Cards/AppointmentCard";
import Appointment from "@/models/Appointment";

type AppointmentListProps = {
  appointments: Appointment[];
  title?: string;
};

export default function AppointmentList({
  appointments,
  title,
}: AppointmentListProps) {
  return (
    <>
      <div className="text-center flex px-3 pt-6">
        <h6 className="text-slate-700 text-xl font-bold">{title}</h6>
      </div>
      <div className="flex flex-wrap py-6">
        {appointments.map((appointment) => (
          <div className="w-full xl:w-3/12 mb-2 px-3" key={appointment.id}>
            <AppointmentCard appointment={appointment} />
          </div>
        ))}
      </div>
    </>
  );
}
