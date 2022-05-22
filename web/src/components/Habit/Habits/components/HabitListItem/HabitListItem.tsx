import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { Toast, Button, ProgressBar, Tag } from 'antd-mobile'
import { useState } from 'react'
import { QUERY } from 'src/components/Habit/HabitsCell'
import userStore from 'src/stores/user.store'
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
        content: 'Mini Habits Completed',
      })
    },
    onError: (error) => {
      setAchieveLoading(false)

      Toast.show({
        icon: 'fail',
        content: error.message,
      })
    },
    refetchQueries: [
      { query: QUERY, variables: { userId: userStore.userInfo.id } },
    ],
    awaitRefetchQueries: true,
  })

  const onAchieveTarget = (id: string) => {
    setAchieveLoading(true)

    achieveTarget({ variables: { id } })
  }

  const targetDays = 20
  const leftDays = targetDays - habit.achieveCount
  const finishedPercent = Math.ceil((1 - leftDays / targetDays) * 100)

  return (
    <div
      className={styles.habitContainer}
      key={habit.id}
      onClick={() => {
        navigate(routes.habit({ id: habit.id }))
      }}
      aria-hidden="true"
    >
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.description}>
            <div className={styles.title}>{habit.name}</div>
          </div>
          <div className={styles.description}>
            <div className={styles.text}>
              {habit.minimumCompletionRequirement}
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Button
            block
            shape="rounded"
            size="small"
            color="primary"
            onClick={(e) => {
              e.stopPropagation()

              onAchieveTarget(habit.id)
            }}
            loading={achieveLoading}
            disabled={habit.isCompletedToday}
          >
            {habit.isCompletedToday ? 'Finished Today' : 'Achieve the goal'}
          </Button>
        </div>
      </div>

      <div className={styles.finishInfo}>
        <Tag
          round
          color="primary"
        >{`${habit.achieveCount} / ${targetDays}`}</Tag>
        <span className={styles.text}>{leftDays} days to upgrade</span>
      </div>
      <div className={styles.progressBar}>
        <ProgressBar
          percent={finishedPercent}
          style={{
            '--track-width': '5px',
          }}
        />
      </div>
    </div>
  )
}

export default HabitListItem
