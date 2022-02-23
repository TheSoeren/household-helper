interface GenericAlertProps {
  badgeText?: string
  text: string
  onClick?: () => void
}

export default function GenericAlert({
  badgeText,
  text,
  onClick,
}: GenericAlertProps) {
  return (
    <div
      className={
        onClick ? 'cursor-pointer' : ' text-center py-4 lg:px-4 relative z-10'
      }
      onClick={onClick}
    >
      <div
        className="p-2 bg-slate-900 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
        role="alert"
      >
        {badgeText ? (
          <span className="flex rounded-full bg-slate-50 uppercase px-2 py-1 text-xs font-bold text-slate-700">
            {badgeText}
          </span>
        ) : null}
        <span className="font-semibold mx-3 text-left flex-auto">{text}</span>
        {onClick ? (
          <svg
            className="fill-current opacity-75 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
          </svg>
        ) : null}
      </div>
    </div>
  )
}
