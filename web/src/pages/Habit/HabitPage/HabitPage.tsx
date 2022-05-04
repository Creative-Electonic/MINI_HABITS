import HabitCell from 'src/components/Habit/HabitCell'

type HabitPageProps = {
  id: string
}

const HabitPage = ({ id }: HabitPageProps) => {
  return <HabitCell id={id} />
}

export default HabitPage
