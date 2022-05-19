interface CardDeleteButtonProps {
  onClick: () => void
  className?: string
}

export default function CardDeleteButton({
  onClick,
  className,
}: CardDeleteButtonProps) {
  return (
    <button
      className={
        'absolute md:opacity-0 md:group-hover:opacity-100 -left-4 top-3 bg-red-500 border-2 border-slate-100 text-white text-xs' +
        ' items-center justify-center align-center rounded-full focus:outline-none h-7 w-7 ease-in duration-200 ' +
        className
      }
      onClick={onClick}
    >
      <i className="fa-solid fa-trash"></i>
    </button>
  )
}
