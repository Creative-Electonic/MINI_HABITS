// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'
import HabitsLayout from 'src/layouts/HabitsLayout'
import AppLayout from './layouts/AppLayout/AppLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={HabitsLayout}>
        <Route path="/habits/new" page={HabitNewHabitPage} name="newHabit" />
        <Route path="/habits/{id}/edit" page={HabitEditHabitPage} name="editHabit" />
        <Route path="/habits/{id}" page={HabitHabitPage} name="habit" />
        <Route path="/habits" page={HabitHabitsPage} name="habits" />
      </Set>
      <Set wrap={AppLayout}>
        {/* <Route path="/users/new" page={UserNewUserPage} name="newUser" />
          <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
          <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
          <Route path="/users" page={UserUsersPage} name="users" /> */}
        <Route path="/list" page={ListPage} name="list" />
      </Set>

      <Route path="/" redirect="/list" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
