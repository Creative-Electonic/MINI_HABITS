// import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/Habit/HabitsCell'
import styles from './Habits.module.scss'
import { FindHabits } from 'types/graphql'

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
  const [achieveTarget] = useMutation(ACHIEVE_HABIT_MUTATION, {
    onCompleted: () => {
      toast.success('Habit Achieved')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onAchieveTarget = (id: string) => {
    console.log(id)
    achieveTarget({ variables: { id } })
  }

  return (
    <div className={styles.container}>
      {habits.map((habit) => (
        <div className={styles.habitContainer} key={habit.id}>
          <div>
            <span>微习惯名称: </span>
            <span>{habit.name}</span>
          </div>
          <div>
            <span>最小完成标准: </span>
            <span>{habit.minimumCompletionRequirement}</span>
          </div>
          <div>
            <span>已完成次数: </span>
            <span>{habit.achieveCount}</span>
          </div>
          <div>
            <button
              className="rw-button rw-button-small rw-button-blue"
              onClick={() => onAchieveTarget(habit.id)}
            >
              完成今日目标
            </button>
            {/* <Link
              to={routes.habit({ id: habit.id })}
              className="rw-button rw-button-small"
            >
              查看详情
            </Link> */}
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
  )
}

export default HabitsList
