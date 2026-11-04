export type Condition = 'A' | 'B'

export type Scenario = {
  title: string
  /** Steps in Kaspi (Condition A): the usual path, the student knows it. */
  kaspi: string[]
  /** Steps in Tölem (Condition B): the fastest path in the prototype. */
  tolem: string[]
  /** Where to stop the stopwatch. */
  stop: { A: string; B: string }
  /** Screens in Tölem along the fastest path (home not counted, final counted). */
  tolemScreens: number
}

export const scenarios: Record<string, Scenario> = {
  S1: {
    title: 'Перевод 5 000 ₸ другу из «Недавних»',
    kaspi: ['Переводы', 'друг, которому недавно переводил', 'ввести 5 000'],
    tolem: ['Айдос в блоке «Недавние»', 'ввести 5 000', '«Продолжить»'],
    stop: { A: 'видна кнопка «Перевести» с суммой 5 000 (не жать)', B: 'экран «Подтверждение» (Face ID не жать)' },
    tolemScreens: 2,
  },
  S2: {
    title: 'Перевод 1 500 ₸ контакту из телефонной книги, комментарий «обед»',
    kaspi: ['Переводы', 'найти контакт, которого нет в недавних', 'ввести 1 500', 'комментарий «обед»'],
    tolem: ['«Перевести»', 'Дана Ахметова (пролистать или найти)', 'ввести 1 500', 'комментарий «обед»', '«Продолжить»'],
    stop: { A: 'сумма и комментарий введены, видна кнопка «Перевести» (не жать)', B: 'экран «Подтверждение» (Face ID не жать)' },
    tolemScreens: 3,
  },
  S3: {
    title: 'Пополнение своего номера на 2 000 ₸',
    kaspi: ['Платежи', 'Мобильная связь', 'свой номер', 'ввести 2 000'],
    tolem: ['«Пополнить телефон»', 'чип «2 000 ₸»', '«Продолжить»'],
    stop: { A: 'видна кнопка оплаты с суммой 2 000 (не жать)', B: 'экран «Подтверждение» (Face ID не жать)' },
    tolemScreens: 2,
  },
  S4: {
    title: 'Повторить последний исходящий перевод',
    kaspi: ['самый быстрый путь, который знаешь: та же сумма тому же человеку', 'если кнопки «Повторить» нет, напиши в заметке, как сделал'],
    tolem: ['верхний перевод в «Последних операциях» на главной', '«Повторить»'],
    stop: { A: 'последний экран перед отправкой (не жать)', B: 'экран «Подтверждение» (Face ID не жать)' },
    tolemScreens: 2,
  },
  S5: {
    title: 'Открыть квитанцию последнего перевода',
    kaspi: ['история операций', 'последний перевод', 'детали или квитанция'],
    tolem: ['верхний перевод в «Последних операциях» на главной'],
    stop: { A: 'открыты детали/квитанция перевода', B: 'открыта «Квитанция»' },
    tolemScreens: 1,
  },
}

/** A/B order alternates between scenarios to spread the learning effect. */
export const plannedOrder: Array<[string, Condition]> = [
  ['S1', 'A'], ['S1', 'B'],
  ['S2', 'B'], ['S2', 'A'],
  ['S3', 'A'], ['S3', 'B'],
  ['S4', 'B'], ['S4', 'A'],
  ['S5', 'A'], ['S5', 'B'],
]

export const conditionName: Record<Condition, string> = { A: 'A · Kaspi', B: 'B · Tölem' }
