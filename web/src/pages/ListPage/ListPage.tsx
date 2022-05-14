import { MetaTags } from '@redwoodjs/web'
import { Button } from 'antd-mobile'
import HabitsCell from 'src/components/Habit/HabitsCell'
import styles from './ListPage.module.scss'

const ListPage = () => {
  const userName = 'Peter'

  return (
    <div className={styles.container}>
      <MetaTags title="List" description="List page" />

      {/* Icon */}
      <div className={styles.icon}>Mini Habits</div>

      {/* welcome part */}
      <span className={styles.welcome}>Welcome {userName}! 👋🏻</span>

      {/* today goal */}
      <div className={styles.goal}>goal part</div>

      {/* list */}
      <HabitsCell />
    </div>
  )
}

export default ListPage
