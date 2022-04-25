interface CardDeleteButtonProps {
  onClick: () => void
}

export default function CardDeleteButton({ onClick }: CardDeleteButtonProps) {
  return (
    <button
      className={
        'absolute opacity-0 group-hover:opacity-100 -left-4 top-1/3 bg-red-500 border-4 border-slate-100 text-white text-xs' +
        ' items-center justify-center align-center rounded-full focus:outline-none h-8 w-8 ease-in duration-200'
      }
      type="button"
      onClick={onClick}
    >
      <i className="fa-solid fa-trash"></i>
    </button>
  )
}
