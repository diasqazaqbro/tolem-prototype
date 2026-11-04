import type { Person } from '../types'
import { Avatar } from './Avatar'

type Props = { people: Person[]; onPick: (p: Person) => void }

export function PeopleStrip({ people, onPick }: Props) {
  return (
    <div className="people">
      {people.map((p) => (
        <button key={p.phone} className="person" onClick={() => onPick(p)}>
          <Avatar name={p.name} color={p.color} />
          {p.short}
        </button>
      ))}
    </div>
  )
}
