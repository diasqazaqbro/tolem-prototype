import { useState } from 'react'
import { initialHistory, topupParty } from './data'
import type { Draft, HistoryItem, Route } from './types'
import { receiptNumber } from './lib/format'
import { Home } from './screens/Home'
import { Transfer } from './screens/Transfer'
import { Amount } from './screens/Amount'
import { TopUp } from './screens/TopUp'
import { Qr } from './screens/Qr'
import { History } from './screens/History'
import { Receipt } from './screens/Receipt'
import { Confirm } from './screens/Confirm'
import { Success } from './screens/Success'
import { Sidebar, type Section } from './components/Sidebar'

const HOME: Route = { name: 'home' }

export function Prototype() {
  const [stack, setStack] = useState<Route[]>([HOME])
  const [history, setHistory] = useState<HistoryItem[]>(initialHistory)
  const route = stack[stack.length - 1]

  const push = (r: Route) => setStack((s) => [...s, r])
  const back = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s))
  const reset = (r: Route = HOME) => setStack(r === HOME ? [HOME] : [HOME, r])
  const openReceipt = (id: string) => push({ name: 'receipt', id })
  const confirm = (draft: Draft) => push({ name: 'confirm', draft })

  const pay = (draft: Draft) => {
    const item: HistoryItem = {
      id: crypto.randomUUID(),
      kind: draft.kind,
      party: draft.kind === 'topup' ? topupParty : draft.to,
      amount: draft.amount,
      comment: draft.kind === 'p2p' ? draft.comment || undefined : undefined,
      date: 'Сегодня, сейчас',
    }
    setHistory((h) => [item, ...h])
    reset({ name: 'success', draft, receiptNo: receiptNumber() })
  }

  const section: Section = (() => {
    const root = stack[1]?.name
    return root === 'transfer' || root === 'qr' || root === 'topup' || root === 'history' ? root : 'home'
  })()

  const navigate = (s: Section) => (s === 'home' ? reset() : reset({ name: s }))

  return (
    <div className="shell">
      <Sidebar active={section} onNavigate={navigate} />
      <main className="main" key={stack.length + route.name}>
        {renderScreen()}
      </main>
    </div>
  )

  function renderScreen() {
  switch (route.name) {
    case 'home':
      return (
        <Home
          history={history}
          onAction={(a) => push({ name: a })}
          onPick={(to) => push({ name: 'amount', to })}
          onOpen={openReceipt}
        />
      )
    case 'transfer':
      return <Transfer onBack={back} onPick={(to) => push({ name: 'amount', to })} />
    case 'amount':
      return <Amount to={route.to} onBack={back} onContinue={confirm} />
    case 'topup':
      return <TopUp onBack={back} onContinue={confirm} />
    case 'qr':
      return <Qr onBack={back} onScanned={confirm} />
    case 'history':
      return <History history={history} onBack={back} onOpen={openReceipt} />
    case 'receipt': {
      const index = history.findIndex((h) => h.id === route.id)
      if (index < 0) return null
      return <Receipt item={history[index]} index={index} onBack={back} onHome={() => reset()} onRepeat={confirm} />
    }
    case 'confirm':
      return <Confirm draft={route.draft} onBack={back} onPay={() => pay(route.draft)} />
    case 'success':
      return <Success draft={route.draft} receiptNo={route.receiptNo} onHome={() => reset()} />
  }
  }
}
