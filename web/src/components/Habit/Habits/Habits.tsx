// import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/Habit/HabitsCell'
import styles from './Habits.module.scss'
import { FindHabits } from 'types/graphql'
import { Button, Toast } from 'antd-mobile'
import { useState } from 'react'

const ACHIEVE_HABIT_MUTATION = gql`
  mutation AchieveHabitMutation($id: String!) {
    achieveHabit(id: $id) {
      id
    }
  }
`

// const MAX_STRING_LENGTH = 150

// const formatEnum = (values: string | string[] | null | undefined) => {
//   if (values) {
//     if (Array.isArray(values)) {
//       const humanizedValues = values.map((value) => humanize(value))
//       return humanizedValues.join(', ')
//     } else {
//       return humanize(values as string)
//     }
//   }
// }

// const truncate = (text) => {
//   let output = text
//   if (text && text.length > MAX_STRING_LENGTH) {
//     output = output.substring(0, MAX_STRING_LENGTH) + '...'
//   }
//   return output
// }

// const jsonTruncate = (obj) => {
//   return truncate(JSON.stringify(obj, null, 2))
// }

// const timeTag = (datetime) => {
//   return (
//     datetime && (
//       <time dateTime={datetime} title={datetime}>
//         {new Date(datetime).toUTCString()}
//       </time>
//     )
//   )
// }

// const checkboxInputTag = (checked) => {
//   return <input type="checkbox" checked={checked} disabled />
// }

const HabitsList = ({ habits }: FindHabits) => {
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
    <div className={styles.container}>
      {/* title */}
      <span className={styles.title}>Today&apos;s Tasks</span>
      {/* list */}
      <div className={styles.list}>
        {habits.map((habit) => (
          <div className={styles.habitContainer} key={habit.id}>
            <div className={styles.description}>
              <span className={styles.label}>微习惯名称: </span>
              <span>{habit.name}</span>
            </div>
            <div className={styles.description}>
              <span className={styles.label}>最小完成标准: </span>
              <span>{habit.minimumCompletionRequirement}</span>
            </div>
            <div className={styles.description}>
              <span className={styles.label}>已完成次数: </span>
              <span className={styles.label}>{habit.achieveCount}</span>
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
              {/* <Link
                    to={routes.editHabit({ id: habit.id })}
                    title={'Edit habit ' + habit.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete habit ' + habit.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(habit.id)}
                  >
                    Delete
                  </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HabitsList
