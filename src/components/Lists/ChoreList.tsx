import Chore from "@/models/Chore";
import ChoreCard from "@/components/Cards/ChoreCard";

type ChoreListProps = {
  chores: Chore[];
  title?: string;
};

export default function ChoreList({ chores, title }: ChoreListProps) {
  return (
    <>
      <div className="text-center flex px-3 pt-6">
        <h6 className="text-slate-700 text-xl font-bold">{title}</h6>
      </div>
      <div className="flex flex-wrap py-6">
        {chores.map((chore) => (
          <div className="w-full xl:w-3/12 mb-2 px-3" key={chore.id}>
            <ChoreCard {...chore} />
          </div>
        ))}
      </div>
    </>
  );
}
