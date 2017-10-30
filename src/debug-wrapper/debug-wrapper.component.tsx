import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'
import { IDebugInfo } from 'dob'

import * as S from './debug-wrapper.style'
import { globalState } from 'dob-react'
import { Props, State } from './debug-wrapper.type'
import { debugContainerId } from '../utils/isomorphic'

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

  /**
   * 放对应 debug-box 的节点
   */
  private debugContainer: HTMLElement = null

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

    try {
      ReactDOM.unmountComponentAtNode(this.debugContainer)
      document.querySelector('body').removeChild(this.debugContainer)
    } catch (error) {

    }
  }

  public componentDidMount() {
    // 渲染与当前组件一一对应的高亮节点，由于此时可能 debugContainer 不存在，因此 setTimeout 后执行
    setTimeout(() => {
      this.debugContainer = document.createElement("div")
      this.debugContainer.style.position = 'absolute'
      document.querySelector('#' + debugContainerId).appendChild(this.debugContainer)
      ReactDOM.render(
        <DebugBox
          ref={ref => {
            this.debugBox = ref
          }}
          dyDebug={this.context.dyDebug}
        />,
        this.debugContainer
      )
    })

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
    return React.cloneElement(this.props.children as React.ReactElement<any>, {
      [globalState.handleReRender]: this.onReRender,
      ref: 'realChilds',
      key: 0
    })
  }

  /**
   * real component rerendered by track, this method will be called
   */
  public onReRender = ({ debugId }) => {
    if (!this.isMount) {
      return
    }

    // 如果 debugBox 还未实例化，下个事件循环再执行
    if (!this.debugBox) {
      setTimeout(() => {
        this.onReRender({ debugId })
      })
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