export type Condition = 'A' | 'B'

export const scenarios: Record<string, string> = {
  S1: 'Перевод 5 000 ₸ другу из «Недавних»',
  S2: 'Перевод 1 500 ₸ контакту из телефонной книги + комментарий «обед»',
  S3: 'Пополнение своего телефона на 2 000 ₸',
  S4: 'Повтор последнего исходящего перевода из истории',
  S5: 'Открыть квитанцию последнего перевода',
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
