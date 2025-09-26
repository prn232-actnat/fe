import { useAppStore } from '@/stores'

export const Dashboard = () => {
  const { count: accountCount, increase: incAccount } = useAppStore((s) => s.account)
  const { count: quizCount, increase: incQuiz } = useAppStore((s) => s.quiz)

  return (
    <div>
      <h2>Account: {accountCount}</h2>
      <button onClick={incAccount}>+ Account</button>

      <h2>Quiz: {quizCount}</h2>
      <button onClick={incQuiz}>+ Quiz</button>
    </div>
  )
}
