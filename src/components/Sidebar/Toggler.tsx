interface TogglerProps {
  onClick: (value: string) => void
}

export default function Toggler({ onClick }: TogglerProps) {
  return (
    <button
      className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
      type="button"
      onClick={() => onClick('bg-white m-2 py-3 px-6')}
    >
      <i className="fa-solid fa-bars"></i>
    </button>
  )
}
