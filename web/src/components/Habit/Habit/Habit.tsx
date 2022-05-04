import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_HABIT_MUTATION = gql`
  mutation DeleteHabitMutation($id: String!) {
    deleteHabit(id: $id) {
      id
    }
  }
`

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const Habit = ({ habit }) => {
  const [deleteHabit] = useMutation(DELETE_HABIT_MUTATION, {
    onCompleted: () => {
      toast.success('Habit deleted')
      navigate(routes.habits())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete habit ' + id + '?')) {
      deleteHabit({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Habit {habit.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{habit.id}</td>
            </tr><tr>
              <th>Name</th>
              <td>{habit.name}</td>
            </tr><tr>
              <th>Minimum completion requirement</th>
              <td>{habit.minimumCompletionRequirement}</td>
            </tr><tr>
              <th>Achieve count</th>
              <td>{habit.achieveCount}</td>
            </tr><tr>
              <th>User id</th>
              <td>{habit.userId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editHabit({ id: habit.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(habit.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Habit
