import type { HistoryItem } from '../types'
import { TopBar } from '../components/TopBar'
import { HistoryRow } from '../components/HistoryRow'

type Props = { history: HistoryItem[]; onBack: () => void; onOpen: (id: string) => void }

export function History({ history, onBack, onOpen }: Props) {
  return (
    <div className="screen">
      <TopBar title="История" onBack={onBack} />
      <div className="scroll">
        <div className="list">
          {history.map((h) => (
            <HistoryRow key={h.id} item={h} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </div>
  )
}
