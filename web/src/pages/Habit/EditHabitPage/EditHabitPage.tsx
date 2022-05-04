import EditHabitCell from 'src/components/Habit/EditHabitCell'

type HabitPageProps = {
  id: string
}

const EditHabitPage = ({ id }: HabitPageProps) => {
  return <EditHabitCell id={id} />
}

export default EditHabitPage
