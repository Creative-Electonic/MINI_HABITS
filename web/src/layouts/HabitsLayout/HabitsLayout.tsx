import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type HabitLayoutProps = {
  children: React.ReactNode
}

const HabitsLayout = ({ children }: HabitLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.habits()}
            className="rw-link"
          >
            Habits
          </Link>
        </h1>
        <Link
          to={routes.newHabit()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New Habit
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default HabitsLayout
