type Props = { title: string; onBack: () => void; dark?: boolean }

export function TopBar({ title, onBack, dark }: Props) {
  return (
    <div className={`top${dark ? ' top--dark' : ''}`}>
      <button className="back" onClick={onBack} aria-label="Назад">
        ‹
      </button>
      <h1>{title}</h1>
    </div>
  )
}
