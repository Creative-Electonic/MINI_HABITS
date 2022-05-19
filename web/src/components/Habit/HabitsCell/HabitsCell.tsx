import type { FindTodayHabits } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Habits from 'src/components/Habit/Habits'
import styles from './HabitsCell.module.scss'
import { SpinLoading } from 'antd-mobile'

export const QUERY = gql`
  query FindTodayHabits {
    todayHabits {
      id
      name
      minimumCompletionRequirement
      achieveCount
      userId
      isCompletedToday
    }
  }
`

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      {/* title */}
      <div className={styles.title}>Habits List</div>

      {children}
    </>
  )
}

export const Loading = () => (
  <Layout>
    <div className={styles.loadingContainer}>
      <SpinLoading />
      <div>数据正从美国西海岸飞奔回来</div>
    </div>
  </Layout>
)

export const Empty = () => (
  <Layout>
    <span>没有已创建的任务</span>
  </Layout>
)

export const Failure = ({ error }: CellFailureProps) => (
  <Layout>
    <span>{error.message}</span>
  </Layout>
)

export const Success = ({ todayHabits }: CellSuccessProps<FindTodayHabits>) => (
  <Layout>
    <Habits todayHabits={todayHabits} />
  </Layout>
)
