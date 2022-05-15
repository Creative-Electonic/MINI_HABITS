import styles from './Habits.module.scss'
import { FindTodayHabits } from 'types/graphql'
import HabitListItem from './components/HabitListItem/HabitListItem'
import { ArrayElement } from 'src/utils/types'

export type HabitItem = ArrayElement<FindTodayHabits['todayHabits']>

const HabitsList = ({ todayHabits }: FindTodayHabits) => {
  return (
    <>
      {/* list */}
      <div className={styles.list}>
        {todayHabits.map((habit) => (
          <HabitListItem key={habit.id} habit={habit} />
        ))}
      </div>
    </>
  )
}

export default HabitsList
