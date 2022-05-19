import { PropsWithChildren } from 'react'

interface Props {
  open: boolean
  onHide: () => void
}

export default function DefaultModal({
  open,
  onHide,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className={
        (!open ? 'hidden ' : '') +
        'overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[2000] w-full md:inset-0 h-modal md:h-full'
      }
      onClick={onHide}
    >
      <div className="relative p-4 max-w-md h-full md:h-auto m-auto">
        <div className="relative bg-white rounded-lg shadow border-2 border-slate-300">
          {children}
        </div>
      </div>
    </div>
  )
}
