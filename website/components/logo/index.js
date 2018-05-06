import classNames from '@dss/classnames'
import styles from './index.css'

const __html = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 800 800" xml:space="preserve">
  <g>
    <polygon style="fill: currentColor" points="400,0.3 45.1,0.3 111,719.2 400,799.7 689,719.2 754.9,0.3  "/>
    <path style="fill: #fff" d="M188.9,145.7l6.2,88.9h102.2v0.2h223.2l-20.4,290.4L402.5,555l-97.7-29.9l-12-170.4h-89.3l16.7,237.6
      l182.2,55.8l182.2-55.8l31.4-446.7H188.9z"/>
  </g>
</svg>`

export default ({ size = undefined, color = undefined }) => (
  <div
    className={classNames(styles.root)}
    style={{ fontSize: size, color }}
    dangerouslySetInnerHTML={{ __html }}
  />
)
