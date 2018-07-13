import Link from '../link'
import styles from './index.css'

export default class Playground extends React.PureComponent {
  state = {
    isShown: false
  }

  render() {
    if (this.state.isShown) {
      return (
        <div className={[styles.container]}>
          <Link className={[styles.link]} href="/static/playground/index.html" target="_blank">
            🔗 Open in new full screen window
          </Link>
          <div className={[styles.iframeWrapper]}>
            <iframe src="/static/playground/index.html" className={[styles.iframe]}/>
          </div>
        </div>
      )
    }

    return (
      <button className={[styles.button]} onClick={() => { this.setState({ isShown: true })}}>
        Try DSS! Start the Playground 🎮
      </button>
    )
  }
}
