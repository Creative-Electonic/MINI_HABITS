import { MetaTags } from '@redwoodjs/web'
import HabitsCell from 'src/components/Habit/HabitsCell'
import styles from './ListPage.module.scss'

const ListPage = () => {
  return (
    <div className={styles.container}>
      <MetaTags title="List" description="List page" />
      <h1>List</h1>
      <HabitsCell />
    </div>
  )
}

export default ListPage
