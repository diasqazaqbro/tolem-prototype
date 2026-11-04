import { useCallback, useEffect, useRef, useState } from 'react'
import { conditionName, plannedOrder, scenarios, type Condition } from './scenarios'

type Trial = { scenario: string; condition: Condition; time: number | null; screens: string; failed: boolean; note: string }
type State = { trials: Trial[]; current: number }

const KEY = 'tolem-pilot-v2'

const fresh = (): State => ({
  trials: plannedOrder.map(([scenario, condition]) => ({
    scenario,
    condition,
    time: null,
    screens: condition === 'B' ? String(scenarios[scenario].tolemScreens) : '',
    failed: false,
    note: '',
  })),
  current: 0,
})

function load(): State {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as State
      if (Array.isArray(parsed.trials)) return parsed
    }
  } catch {
    /* storage unavailable */
  }
  return fresh()
}

const toTsv = (trials: Trial[]) =>
  'scenario\tcond\ttime_s\tscreens\tfailed\tnote\n' +
  trials.map((t) => [t.scenario, t.condition, t.time?.toFixed(1) ?? '', t.screens, t.failed ? 'yes' : '', t.note].join('\t')).join('\n')

export function Recorder() {
  const [state, setState] = useState<State>(load)
  const [startedAt, setStartedAt] = useState<number | null>(null)
  const [elapsed, setElapsed] = useState(0)
  const [copied, setCopied] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)
  const outRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* storage unavailable */
    }
  }, [state])

  useEffect(() => {
    if (startedAt === null) return
    let raf = 0
    const tick = () => {
      setElapsed((performance.now() - startedAt) / 1000)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [startedAt])

  const trial = state.trials[state.current]

  const toggle = useCallback(() => {
    if (!state.trials[state.current]) return
    if (startedAt === null) {
      setElapsed(0)
      setStartedAt(performance.now())
      return
    }
    const time = (performance.now() - startedAt) / 1000
    setStartedAt(null)
    setState((s) => ({
      trials: s.trials.map((t, i) => (i === s.current ? { ...t, time } : t)),
      current: Math.min(s.trials.length, s.current + 1),
    }))
  }, [startedAt, state])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (e.code === 'Space' && !target.matches('input, textarea')) {
        e.preventDefault()
        toggle()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggle])

  const move = (d: number) => {
    if (startedAt !== null) return
    setState((s) => ({ ...s, current: Math.max(0, Math.min(s.trials.length, s.current + d)) }))
  }
  const redo = () => {
    if (startedAt !== null || !trial) return
    setState((s) => ({ ...s, trials: s.trials.map((t, i) => (i === s.current ? { ...t, time: null } : t)) }))
  }
  const update = (i: number, patch: Partial<Trial>) =>
    setState((s) => ({ ...s, trials: s.trials.map((t, j) => (j === i ? { ...t, ...patch } : t)) }))

  const tsv = toTsv(state.trials)
  const copy = () => {
    navigator.clipboard.writeText(tsv).then(
      () => setCopied(true),
      () => outRef.current?.select(),
    )
  }

  const shown = startedAt !== null ? elapsed : (trial?.time ?? 0)

  return (
    <div className="rec">
      <h1>Регистратор пилотного замера</h1>
      <p className="small">A = Kaspi.kz (текущее приложение), B = прототип Tölem. Порядок A/B чередуется, чтобы сгладить эффект обучения.</p>

      <details className="setup">
        <summary>Подготовка и правила (прочитать один раз)</summary>
        <ol>
          <li>На маке запущен <code>pnpm dev --host</code>. На телефоне в Safari открыт адрес из строки «Network», телефон в той же Wi-Fi сети.</li>
          <li>На телефоне включён «Не беспокоить».</li>
          <li>Пройди все 5 сценариев в Tölem 1–2 раза без замера. На «Подтвердить Face ID» не жми. После пробы обнови страницу.</li>
          <li>Перед каждым замером: Kaspi на главном экране; Tölem обнови страницу (история вернётся к исходной).</li>
          <li>Space = старт, сразу начинаешь тапать. Space = стоп, как только открылся финальный экран. Регистратор сам перейдёт к следующей строке.</li>
          <li>Финальный экран: следующий тап отправил бы деньги. Эту кнопку не нажимать.</li>
          <li>Экраны: главный не считается, финальный считается, шторка снизу считается, клавиатура нет. Для Tölem уже вписано.</li>
          <li>Ошибся: исправь, дойди до конца, напиши в заметке. Перемеривать только при технической проблеме (случайный Space, зависание). Плохое время не повод перемеривать.</li>
        </ol>
      </details>

      <div className={`clock num${startedAt !== null ? ' clock--run' : ''}`}>{shown.toFixed(1)} с</div>
      <div className="now">
        {trial ? (
          <>
            <div>
              Замер {state.current + 1} из {state.trials.length}: <b>{trial.scenario}</b> ·{' '}
              <span className={`tag tag--${trial.condition}`}>{conditionName[trial.condition]}</span> — {scenarios[trial.scenario].title}
            </div>
            <ol className="steps">
              <li>{trial.condition === 'A' ? 'Kaspi на главном экране' : 'Tölem: обнови страницу, ты на главной'}</li>
              <li>Space и сразу первый тап</li>
              {(trial.condition === 'A' ? scenarios[trial.scenario].kaspi : scenarios[trial.scenario].tolem).map((st, i) => (
                <li key={i}>{st}</li>
              ))}
              <li>
                <b>Space, когда {scenarios[trial.scenario].stop[trial.condition]}</b>
              </li>
              {trial.condition === 'A' && <li>Впиши число экранов в таблицу</li>}
            </ol>
          </>
        ) : (
          'Все замеры сделаны. Скопируй результаты ниже и отправь в чат.'
        )}
      </div>
      <div className="rbtns">
        <button className="main" onClick={toggle}>
          {startedAt !== null ? 'Стоп (Space)' : 'Старт (Space)'}
        </button>
        <button onClick={() => move(-1)}>← Предыдущий</button>
        <button onClick={() => move(1)}>Следующий →</button>
        <button onClick={redo}>Перемерить текущий</button>
      </div>

      <div className="tablewrap">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Сценарий</th>
              <th>Условие</th>
              <th>Время, с</th>
              <th>Экранов</th>
              <th>Не выполнено</th>
              <th>Заметка</th>
            </tr>
          </thead>
          <tbody>
            {state.trials.map((t, i) => (
              <tr key={i} className={i === state.current ? 'cur' : ''}>
                <td>{i + 1}</td>
                <td>{t.scenario}</td>
                <td>
                  <span className={`tag tag--${t.condition}`}>{t.condition}</span>
                </td>
                <td className="num">{t.time?.toFixed(1) ?? '—'}</td>
                <td>
                  <input type="number" min={1} max={20} id={`scr${i}`} value={t.screens} onChange={(e) => update(i, { screens: e.target.value })} />
                </td>
                <td>
                  <input type="checkbox" id={`fl${i}`} checked={t.failed} onChange={(e) => update(i, { failed: e.target.checked })} />
                </td>
                <td>
                  <input type="text" id={`nt${i}`} value={t.note} onChange={(e) => update(i, { note: e.target.value })} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rbtns">
        <button className="main" onClick={copy}>
          {copied ? 'Скопировано' : 'Скопировать результаты'}
        </button>
        <button
          onClick={() => {
            if (!confirmReset) return setConfirmReset(true)
            setState(fresh())
            setConfirmReset(false)
          }}
        >
          {confirmReset ? 'Точно очистить? Нажми ещё раз' : 'Очистить всё'}
        </button>
      </div>
      <textarea ref={outRef} readOnly value={tsv} aria-label="Результаты" />
    </div>
  )
}
