import type { FindTodayHabits } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { DotLoading, ProgressCircle } from 'antd-mobile'
import styles from './GoalDescriptionCell.module.scss'

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

const Layout = ({
  percent = 0,
  children,
}: {
  percent: number
  children?: React.ReactNode
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.progressCircle}>
        <ProgressCircle
          percent={percent}
          style={{
            '--fill-color': '#00b578',
            '--size': '110px',
            '--track-width': '10px',
          }}
        >
          <span className={styles.progressText}>{percent}%</span>
        </ProgressCircle>
      </div>

      {children}
    </div>
  )
}

export const Loading = () => (
  <Layout>
    <DotLoading />
  </Layout>
)

export const Empty = () => (
  <Layout>
    <div className={styles.info}>
      <div className={styles.description}>No Goals Info</div>
    </div>
  </Layout>
)

export const Failure = ({ error }: CellFailureProps) => (
  <Layout>
    <span>{error.message}</span>
  </Layout>
)

export const Success = ({ todayHabits }: CellSuccessProps<FindTodayHabits>) => {
  const totalCount = todayHabits.length
  const finishedCount = todayHabits.filter(
    (habit) => habit.isCompletedToday
  ).length

  const percent = totalCount ? Math.ceil((finishedCount / totalCount) * 100) : 0

  const isCompletedToday = totalCount === finishedCount

  return (
    <Layout percent={percent}>
      <div className={styles.info}>
        <div className={styles.description}>
          {isCompletedToday
            ? 'Wow! You have achieved all your goals!'
            : 'Your daily goals is almost done!'}
        </div>
        <div className={styles.textCount}>
          {`${finishedCount} of
        ${totalCount} completed`}
        </div>
      </div>
    </Layout>
  )
}
