import { useState } from 'react'
import type { Draft, Person } from '../types'
import { tenge } from '../lib/format'
import { TopBar } from '../components/TopBar'
import { Avatar } from '../components/Avatar'
import { Icon } from '../components/Icon'

type Props = { to: Person; onBack: () => void; onContinue: (d: Draft) => void }

const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫']

export function Amount({ to, onBack, onContinue }: Props) {
  const [amount, setAmount] = useState(0)
  const [comment, setComment] = useState('')

  const press = (k: string) => {
    setAmount((prev) => {
      const s = String(prev || '')
      const next = k === '⌫' ? s.slice(0, -1) : s.length < 7 ? s + k : s
      return Number(next) || 0
    })
  }

  return (
    <div className="screen">
      <TopBar title="Сумма перевода" onBack={onBack} />
      <div className="scroll">
        <div className="recip">
          <Avatar name={to.name} color={to.color} size={44} />
          <div>
            <div className="recip__name">{to.name}</div>
            <small>{to.phone}</small>
          </div>
        </div>
        <div className="bigamt num">{amount ? tenge(amount) : <span>0 ₸</span>}</div>
        <div className="hint">
          Комиссия <b>0 ₸</b> · зачисление сразу
        </div>
        <label className="field field--gap" htmlFor="cmt">
          <Icon name="note" />
          <input id="cmt" placeholder="Комментарий (необязательно)" maxLength={60} value={comment} onChange={(e) => setComment(e.target.value)} />
        </label>
        <div className="pad">
          {keys.map((k, i) =>
            k === '' ? (
              <span key={i} />
            ) : (
              <button key={i} onClick={() => press(k)} aria-label={k === '⌫' ? 'Стереть' : k}>
                {k}
              </button>
            ),
          )}
        </div>
      </div>
      <div className="bottom">
        <button className="btn" disabled={!amount} onClick={() => onContinue({ kind: 'p2p', to, amount, comment })}>
          Продолжить
        </button>
      </div>
    </div>
  )
}
