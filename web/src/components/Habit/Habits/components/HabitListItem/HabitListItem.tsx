import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { Toast, Button, ProgressBar, Tag } from 'antd-mobile'
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
            {/* <span className={styles.label}>微习惯名称: </span> */}
            <div className={styles.title}>{habit.name}</div>
          </div>
          <div className={styles.description}>
            {/* <div className={styles.label}>最小完成标准: </div> */}
            <div className={styles.text}>
              {habit.minimumCompletionRequirement}
            </div>
          </div>
          {/* <div className={styles.description}>
          <div className={styles.label}>已完成次数: </div>
          <div className={styles.text}>{habit.achieveCount}</div>
        </div> */}
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
            {habit.isCompletedToday ? '今日已完成' : '完成此目标'}
          </Button>

          {/* <Link to={routes.habit({ id: habit.id })}>
          <Button block shape="rounded" size="mini">
            查看详情
          </Button>
        </Link> */}
        </div>
      </div>

      <div className={styles.finishInfo}>
        <Tag
          round
          color="primary"
        >{`${habit.achieveCount} / ${targetDays}`}</Tag>
        <span className={styles.text}>还剩 {leftDays} 天晋升</span>
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
