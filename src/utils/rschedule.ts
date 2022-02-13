import { VEvent } from "@/setups/rschedule";
import dayjs from "dayjs";

function isToday(vEvent: VEvent) {
  const now = dayjs();
  return vEvent.occursBetween(now.startOf("d"), now.endOf("d"));
}

function isThisMonth(vEvent: VEvent) {
  const now = dayjs();
  return vEvent.occursBetween(now.startOf("d"), now.endOf("d"));
}

export { isToday, isThisMonth };
