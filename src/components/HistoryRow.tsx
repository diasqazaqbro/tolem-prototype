import type { HistoryItem } from '../types'
import { kindLabel } from '../data'
import { tenge } from '../lib/format'
import { Avatar } from './Avatar'

type Props = { item: HistoryItem; onOpen: (id: string) => void }

export function HistoryRow({ item, onOpen }: Props) {
  const incoming = item.kind === 'incoming'
  return (
    <button className="row" onClick={() => onOpen(item.id)}>
      <Avatar name={item.party.name} color={item.party.color} size={40} />
      <div className="row__text">
        <div>{item.party.name}</div>
        <div>
          {kindLabel[item.kind]} · {item.date}
        </div>
      </div>
      <div className={`row__amount num${incoming ? ' plus' : ''}`}>
        {incoming ? '+' : '−'}
        {tenge(item.amount)}
      </div>
    </button>
  )
}
