import React from 'react'
import ReactGA from 'react-ga'

export default class Analytics extends React.Component {
  track = () => {
    ReactGA.set({ page: this.props.route + window.location.hash })
    ReactGA.pageview(this.props.route + window.location.hash)
  }
  componentDidMount() {
    ReactGA.initialize(this.props.id)
    this.track()
    window.addEventListener('hashchange', this.track)
  }
  componentDidUpdate(prevProps) {
    if (prevProps.route !== this.props.route) {
      this.track()
    }
  }
  componentWillUnmount() {
    window.removeEventListener('hashchange', this.track)
  }
  render() {
    return this.props.children
  }
}
