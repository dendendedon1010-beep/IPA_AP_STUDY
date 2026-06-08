import type { AnswerHistory, Question, ReviewPriority, ReviewScheduleItem } from '../types'

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/
const DAY_MS = 24 * 60 * 60 * 1000

const isValidDateString = (value: unknown): value is string => {
  if (typeof value !== 'string' || !DATE_PATTERN.test(value)) return false
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
}

const toLocalDateString = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const answeredDateString = (value: unknown) => {
  if (typeof value !== 'string') return null
  if (isValidDateString(value)) return value
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : toLocalDateString(date)
}

const safeHistory = (history: unknown): AnswerHistory[] => Array.isArray(history)
  ? history.filter((answer): answer is AnswerHistory => Boolean(answer)
    && typeof answer === 'object'
    && typeof answer.questionId === 'string'
    && typeof answer.isCorrect === 'boolean'
    && (answer.confidence === 'high' || answer.confidence === 'normal' || answer.confidence === 'low')
    && answeredDateString(answer.answeredAt) !== null)
  : []

export const getTodayDateString = () => toLocalDateString(new Date())

export const addDays = (dateString: string, days: number) => {
  if (!isValidDateString(dateString) || !Number.isFinite(days)) return dateString
  const [year, month, day] = dateString.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  date.setDate(date.getDate() + Math.trunc(days))
  return toLocalDateString(date)
}

const getQuestionAnswers = (questionId: string, history: unknown) => safeHistory(history)
  .filter(answer => answer.questionId === questionId)
  .sort((a, b) => new Date(a.answeredAt).getTime() - new Date(b.answeredAt).getTime())

const getStreaks = (answers: AnswerHistory[]) => {
  let wrongStreak = 0
  let correctStreak = 0
  for (let index = answers.length - 1; index >= 0; index -= 1) {
    if (answers[index].isCorrect) {
      if (wrongStreak) break
      correctStreak += 1
    } else {
      if (correctStreak) break
      wrongStreak += 1
    }
  }
  return { wrongStreak, correctStreak }
}

export const getReviewPriorityForQuestion = (questionId: string, history: unknown): ReviewPriority | null => {
  const answers = getQuestionAnswers(questionId, history)
  if (!answers.length) return null
  const latest = answers[answers.length - 1]
  const { wrongStreak } = getStreaks(answers)
  if (!latest.isCorrect || wrongStreak >= 2) return 'high'
  if (latest.confidence === 'low') return 'medium'
  return 'low'
}

export const getReviewReason = (questionId: string, history: unknown) => {
  const answers = getQuestionAnswers(questionId, history)
  if (!answers.length) return '未回答'
  const latest = answers[answers.length - 1]
  const { wrongStreak, correctStreak } = getStreaks(answers)
  if (!latest.isCorrect && wrongStreak >= 2) return '2回連続不正解'
  if (!latest.isCorrect) return '前回不正解'
  if (correctStreak >= 3) return '3回連続正解'
  if (correctStreak >= 2) return '2回連続正解'
  if (latest.confidence === 'low') return '正解・自信なし'
  if (latest.confidence === 'normal') return '正解・自信ふつう'
  return '正解・自信あり'
}

export const buildReviewSchedule = (questions: unknown, history: unknown): ReviewScheduleItem[] => {
  if (!Array.isArray(questions)) return []
  const answers = safeHistory(history)
  return questions.flatMap(question => {
    if (!question || typeof question !== 'object' || typeof (question as Partial<Question>).id !== 'string') return []
    const questionId = (question as Question).id
    const questionAnswers = getQuestionAnswers(questionId, answers)
    if (!questionAnswers.length) return []
    const latest = questionAnswers[questionAnswers.length - 1]
    const lastAnsweredDate = answeredDateString(latest.answeredAt)
    if (!lastAnsweredDate) return []
    const { wrongStreak, correctStreak } = getStreaks(questionAnswers)
    const interval = !latest.isCorrect ? (wrongStreak >= 2 ? 0 : 1)
      : correctStreak >= 3 ? 30
        : correctStreak >= 2 ? 14
          : latest.confidence === 'low' ? 3
            : latest.confidence === 'normal' ? 5 : 7
    return [{
      questionId,
      nextReviewDate: addDays(lastAnsweredDate, interval),
      priority: getReviewPriorityForQuestion(questionId, questionAnswers) ?? 'low',
      reason: getReviewReason(questionId, questionAnswers),
      lastAnsweredAt: latest.answeredAt,
      wrongStreak,
      correctStreak,
    }]
  })
}

const priorityOrder: Record<ReviewPriority, number> = { high: 0, medium: 1, low: 2 }
const sortSchedule = (items: ReviewScheduleItem[]) => [...items].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  || a.nextReviewDate.localeCompare(b.nextReviewDate)
  || a.questionId.localeCompare(b.questionId))

export const getDueReviewItems = (schedule: unknown, today = getTodayDateString()) => {
  if (!Array.isArray(schedule) || !isValidDateString(today)) return []
  return sortSchedule(schedule.filter((item): item is ReviewScheduleItem => Boolean(item)
    && typeof item === 'object'
    && typeof item.questionId === 'string'
    && isValidDateString(item.nextReviewDate)
    && (item.priority === 'high' || item.priority === 'medium' || item.priority === 'low')
    && item.nextReviewDate <= today))
}

export const getUpcomingReviewItems = (schedule: unknown, today = getTodayDateString()) => {
  if (!Array.isArray(schedule) || !isValidDateString(today)) return []
  const endDate = addDays(today, 7)
  return sortSchedule(schedule.filter((item): item is ReviewScheduleItem => Boolean(item)
    && typeof item === 'object'
    && typeof item.questionId === 'string'
    && isValidDateString(item.nextReviewDate)
    && (item.priority === 'high' || item.priority === 'medium' || item.priority === 'low')
    && item.nextReviewDate > today
    && item.nextReviewDate <= endDate))
}

export const getReviewDayDistance = (dateString: string, today = getTodayDateString()) => {
  if (!isValidDateString(dateString) || !isValidDateString(today)) return null
  const [todayYear, todayMonth, todayDay] = today.split('-').map(Number)
  const [year, month, day] = dateString.split('-').map(Number)
  return Math.round((Date.UTC(year, month - 1, day) - Date.UTC(todayYear, todayMonth - 1, todayDay)) / DAY_MS)
}
