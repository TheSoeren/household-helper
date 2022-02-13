import { VEvent } from "@/setups/rschedule";
import dayjs from "dayjs";

function isToday(vEvent: VEvent) {
  const now = dayjs();
  return vEvent.occursBetween(now.startOf("day"), now.endOf("day"));
}

function isThisMonth(vEvent: VEvent) {
  const now = dayjs();
  return vEvent.occursBetween(now.startOf("day"), now.endOf("day"));
}

export { isToday, isThisMonth };
