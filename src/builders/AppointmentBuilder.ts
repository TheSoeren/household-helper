import AuthContext from "@/contexts/AuthContext";
import Appointment from "@/models/Appointment";
import { Dayjs, OpUnitType } from "dayjs";
import { useContext } from "react";

class AppointmentBuilder {
  data: Appointment[];
  isAtMonth: any;

  constructor(data: Appointment[]) {
    this.data = data;
  }

  ownAppointments() {
    const { user, authenticated } = useContext(AuthContext);
    if (!authenticated || !user) {
      return new AppointmentBuilder([]);
    }

    const result = this.data.filter((a) => a.responsible === user.name);
    return new AppointmentBuilder(result);
  }

  private appointmentsBetween(date: Dayjs, timeUnit: OpUnitType) {
    return this.data.filter(({ vEvent }) =>
      vEvent.occursBetween(date.startOf(timeUnit), date.endOf(timeUnit))
    );
  }

  appointmentsInDay(date: Dayjs) {
    return new AppointmentBuilder(this.appointmentsBetween(date, "d"));
  }

  appointmentsInMonth(date: Dayjs) {
    return new AppointmentBuilder(this.appointmentsBetween(date, "M"));
  }

  build() {
    return this.data;
  }
}

export default AppointmentBuilder;
