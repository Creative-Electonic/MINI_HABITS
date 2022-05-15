import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { Toast, Button } from 'antd-mobile'
import { useState } from 'react'
import { QUERY } from 'src/components/Habit/HabitsCell'
import { HabitItem } from '../../Habits'
import styles from './HabitListItem.module.scss'

const ACHIEVE_HABIT_MUTATION = gql`
  mutation AchieveHabitMutation($id: String!) {
    achieveHabit(id: $id) {
      id
    }
  }
`

const HabitListItem = ({ habit }: { habit: HabitItem }) => {
  const [achieveLoading, setAchieveLoading] = useState(false)
  const [achieveTarget] = useMutation(ACHIEVE_HABIT_MUTATION, {
    onCompleted: () => {
      setAchieveLoading(false)

      Toast.show({
        icon: 'success',
        content: '微习惯打卡成功',
      })
    },
    onError: (error) => {
      setAchieveLoading(false)

      Toast.show({
        icon: 'fail',
        content: error.message,
      })
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onAchieveTarget = (id: string) => {
    setAchieveLoading(true)

    achieveTarget({ variables: { id } })
  }

  return (
    <div className={styles.habitContainer} key={habit.id}>
      <div className={styles.description}>
        <span className={styles.label}>微习惯名称: </span>
        <span className={styles.text}>{habit.name}</span>
      </div>
      <div className={styles.description}>
        <span className={styles.label}>最小完成标准: </span>
        <span className={styles.text}>
          {habit.minimumCompletionRequirement}
        </span>
      </div>
      <div className={styles.description}>
        <span className={styles.label}>已完成次数: </span>
        <span className={styles.text}>{habit.achieveCount}</span>
      </div>
      <div className={styles.actions}>
        <Button
          block
          shape="rounded"
          size="mini"
          color="primary"
          onClick={() => onAchieveTarget(habit.id)}
          loading={achieveLoading}
          disabled={habit.isCompletedToday}
        >
          {habit.isCompletedToday ? '今日已完成' : '完成今日目标'}
        </Button>

        <Link to={routes.habit({ id: habit.id })}>
          <Button block shape="rounded" size="mini">
            查看详情
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default HabitListItem
