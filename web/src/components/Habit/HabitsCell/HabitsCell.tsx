import type { FindTodayHabits } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Habits from 'src/components/Habit/Habits'
import styles from './HabitsCell.module.scss'
import { Button, SpinLoading } from 'antd-mobile'
import { navigate, routes } from '@redwoodjs/router'

export const QUERY = gql`
  query FindTodayHabits($userId: String!) {
    todayHabits(userId: $userId) {
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
      <div>Data is rushing back from United States</div>
    </div>
  </Layout>
)

export const Empty = () => (
  <Layout>
    <div className={styles.container}>
      <span className={styles.tips}>No created habits</span>
      <Button
        shape="rounded"
        size="small"
        color="primary"
        onClick={() => navigate(routes.newHabit())}
      >
        Create
      </Button>
    </div>
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

    <div className={styles.container}>
      <Button
        shape="rounded"
        size="small"
        color="primary"
        onClick={() => navigate(routes.newHabit())}
      >
        Create
      </Button>
    </div>
  </Layout>
)
