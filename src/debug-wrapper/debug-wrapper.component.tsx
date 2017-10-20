import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'
import { IDebugInfo } from 'dob'

import * as S from './debug-wrapper.style'
import { globalState } from 'dob-react'
import { Props, State } from './debug-wrapper.type'
import { RenderTo } from '../components/render-to/src'

import { DebugBox } from './debug-box/debug-box.component'

export class DebugWrapper extends React.PureComponent<Props, State>{
  static defaultProps = new Props()
  static contextTypes = {
    dyDebug: PropTypes.object
  }

  static childContextTypes = {
    dyDebug: PropTypes.object
  }

  public state = new State()

  private isMount = false

  /**
   * 当前 dom 元素
   */
  private realChildDOM: HTMLElement = undefined

  /**
   * debugBox 实例
   */
  private debugBox: DebugBox = null

  public componentWillMount() {
    this.isMount = true
  }

  public componentWillUnmount() {
    this.isMount = false

    // 移除监听
    if (this.realChildDOM !== null) {
      this.realChildDOM.removeEventListener('mouseenter', this.handleMouseEnter)
      this.realChildDOM.removeEventListener('mouseleave', this.handleMouseLeave)
    }
  }

  public componentDidMount() {
    // TODO: 暂不处理多子元素的情况
    if (React.Children.count(this.props.children) > 1) {
      return null
    }

    if (!this.refs.realChilds) {
      return null
    }

    if (this.realChildDOM === undefined) {
      this.realChildDOM = ReactDOM.findDOMNode(this.refs.realChilds) as HTMLElement || null

      // 添加监听
      if (this.realChildDOM !== null) {
        this.realChildDOM.addEventListener('mouseenter', this.handleMouseEnter)
        this.realChildDOM.addEventListener('mouseleave', this.handleMouseLeave)
      }
    }
  }

  public getChildContext() {
    return {
      dyDebug: this.context.dyDebug
    }
  }

  public render() {
    return [
      React.cloneElement(this.props.children as React.ReactElement<any>, {
        [globalState.handleReRender]: this.onReRender,
        ref: 'realChilds',
        key: 0
      }),
      <RenderTo key={1}>
        <DebugBox
          ref={ref => {
            this.debugBox = ref
          }}
          dyDebug={this.context.dyDebug}
        />
      </RenderTo>
    ]
  }

  /**
   * real component rerendered by track, this method will be called
   */
  public onReRender = ({ debugId }) => {
    if (!this.isMount) {
      return
    }

    this.debugBox.setRealChildDOM(this.realChildDOM)

    // 通知 debugBox 添加一个 debugId
    this.debugBox.addDebugId(debugId)
  }

  /**
   * 鼠标移动到了元素上
   */
  private handleMouseEnter = () => {
    if (!this.realChildDOM) {
      return
    }

    const rect = this.realChildDOM.getBoundingClientRect()
  }

  /**
   * 鼠标从元素上移走了
   */
  private handleMouseLeave = () => {
    if (!this.realChildDOM) {
      return
    }
  }
}