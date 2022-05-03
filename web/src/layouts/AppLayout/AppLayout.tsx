import { isMobile } from 'src/utils/ua'
import styles from './AppLayout.module.scss'

type AppLayoutProps = {
  children?: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const appLayout = (
    <div className={styles.app}>
      <div className={styles.content}>{children}</div>
      <div className={styles.navBar}></div>
    </div>
  )

  return isMobile ? (
    <>{appLayout}</>
  ) : (
    <div className={styles.container}>
      <div className={styles.mobileImg}>{appLayout}</div>
    </div>
  )
}

export default AppLayout
