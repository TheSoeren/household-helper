import Brand from './Brand'

interface CollapseHeaderProps {
  onClick: (value: string) => void
}

export default function CollapseHeader({ onClick }: CollapseHeaderProps) {
  return (
    <div className="flex justify-between md:hidden">
      <Brand />
      <button
        type="button"
        className="px-3 py-1 text-xl leading-none text-black bg-transparent rounded opacity-50 cursor-pointer"
        onClick={() => onClick('hidden')}
      >
        <i className="fa-solid fa-times"></i>
      </button>
    </div>
  )
}
