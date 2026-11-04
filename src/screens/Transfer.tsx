import { useMemo, useState } from 'react'
import { people, recent } from '../data'
import type { Person } from '../types'
import { TopBar } from '../components/TopBar'
import { Icon } from '../components/Icon'
import { Avatar } from '../components/Avatar'
import { PeopleStrip } from '../components/PeopleStrip'

type Props = { onBack: () => void; onPick: (p: Person) => void }

export function Transfer({ onBack, onPick }: Props) {
  const [query, setQuery] = useState('')

  const contacts = useMemo(() => {
    const q = query.trim().toLowerCase()
    const digits = q.replace(/\D/g, '')
    return [...people]
      .sort((a, b) => a.name.localeCompare(b.name, 'ru'))
      .filter((p) => !q || p.name.toLowerCase().includes(q) || (digits && p.phone.replace(/\D/g, '').includes(digits)))
  }, [query])

  return (
    <div className="screen">
      <TopBar title="Перевод" onBack={onBack} />
      <div className="scroll">
        <label className="field" htmlFor="q">
          <Icon name="search" />
          <input id="q" placeholder="Имя или номер телефона" autoComplete="off" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
        <div className="sec">Недавние</div>
        <PeopleStrip people={recent} onPick={onPick} />
        <div className="sec">Контакты телефона</div>
        <div className="list">
          {contacts.length === 0 && <div className="row row--empty">Никого не нашли</div>}
          {contacts.map((p) => (
            <button key={p.phone} className="row" onClick={() => onPick(p)}>
              <Avatar name={p.name} color={p.color} size={40} />
              <div className="row__text">
                <div>{p.name}</div>
                <div className="num">{p.phone}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
