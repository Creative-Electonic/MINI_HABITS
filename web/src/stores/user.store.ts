import { User } from '@authing/react-ui-components'
import { autorun, makeObservable, observable } from 'mobx'

class UserStore {
  userInfo: User | undefined = undefined

  get isLogin() {
    return !!this.userInfo
  }

  constructor() {
    const userInfo = localStorage.getItem('USER_INFO')
    this.userInfo = JSON.parse(userInfo)

    makeObservable(this, {
      userInfo: observable,
    })

    autorun(() => console.log(this.userInfo))
  }
}

export default new UserStore()
