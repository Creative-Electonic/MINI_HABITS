import { MetaTags } from '@redwoodjs/web'
import { Button, ProgressCircle } from 'antd-mobile'
import HabitsCell from 'src/components/Habit/HabitsCell'
import styles from './ListPage.module.scss'
import logo from 'src/assets/favicon.png'

import GoalDescriptionCell from 'src/components/GoalDescriptionCell'

const ListPage = () => {
  const userName = 'Peter'

  return (
    <div className={styles.container}>
      <MetaTags title="List" description="List page" />

      {/* Icon */}
      <div className={styles.icon}>
        <img className={styles.iconLogo} src={logo} alt="Logo" />
        <span>Mini Habits</span>
      </div>

      {/* welcome part */}
      <div className={styles.welcome}>Welcome {userName}! 👋🏻</div>

      {/* today goal */}
      <div className={styles.goal}>
        <GoalDescriptionCell />
      </div>

      {/* list */}
      <HabitsCell />
    </div>
  )
}

export default ListPage
