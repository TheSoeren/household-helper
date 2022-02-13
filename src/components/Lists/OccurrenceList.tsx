import OccurrenceCard from "@/components/Cards/OccurrenceCard";
import Occurrence from "@/models/Occurrence";

type OccurrenceListProps = {
  occurrences: Occurrence[];
  title?: string;
};

export default function OccurrenceList({
  occurrences,
  title,
}: OccurrenceListProps) {
  return (
    <>
      <div className="text-center flex px-3 pt-6">
        <h6 className="text-slate-700 text-xl font-bold">{title}</h6>
      </div>
      <div className="flex flex-wrap py-6">
        {occurrences.map((occurrence) => (
          <div className="w-full xl:w-3/12 mb-2 px-3" key={occurrence.id}>
            <OccurrenceCard occurrence={occurrence} />
          </div>
        ))}
      </div>
    </>
  );
}
