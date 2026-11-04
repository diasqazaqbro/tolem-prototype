import { useState } from 'react'
import { MY_PHONE } from '../data'
import type { Draft } from '../types'
import { tenge } from '../lib/format'
import { TopBar } from '../components/TopBar'
import { Icon } from '../components/Icon'

type Props = { onBack: () => void; onContinue: (d: Draft) => void }

const presets = [500, 1000, 2000, 5000]

export function TopUp({ onBack, onContinue }: Props) {
  const [phone, setPhone] = useState(MY_PHONE)
  const [amount, setAmount] = useState(0)

  return (
    <div className="screen">
      <TopBar title="Пополнить телефон" onBack={onBack} />
      <div className="scroll">
        <div className="sec sec--first">Номер</div>
        <label className="field" htmlFor="ph">
          <Icon name="phone" />
          <input id="ph" value={phone} inputMode="tel" onChange={(e) => setPhone(e.target.value)} />
        </label>
        <div className="hint hint--left">Мой номер · оператор определён автоматически</div>
        <div className="sec">Сумма</div>
        <div className="chips">
          {presets.map((v) => (
            <button key={v} className={`chip${amount === v ? ' chip--on' : ''}`} onClick={() => setAmount(v)}>
              {tenge(v)}
            </button>
          ))}
        </div>
      </div>
      <div className="bottom">
        <button className="btn" disabled={!amount} onClick={() => onContinue({ kind: 'topup', phone, amount })}>
          Продолжить
        </button>
      </div>
    </div>
  )
}
