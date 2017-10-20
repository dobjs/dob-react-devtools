import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { dobEvent, IDebugInfo } from 'dob'
import * as PropTypes from 'prop-types'

import { Props, State } from './tool-box.type'
import * as S from './tool-box.style'

import { DebugLine } from './debug-line/debug-line.component'

import { scrollTo } from '../utils/scroll-to'
import * as debounce from 'lodash.debounce'

export class ToolBox extends React.PureComponent<Props, State>{
  static defaultProps = new Props()
  public state = new State()

  static contextTypes = {
    dyDebug: PropTypes.object
  }

  static childContextTypes = {
    dyDebug: PropTypes.object
  }

  /**
   * debugInfos 容器
   */
  private actionContainerDOM: HTMLElement = null

  getChildContext() {
    return {
      dyDebug: this.context.dyDebug
    }
  }

  public componentDidMount() {
    dobEvent.on('debug', debugInfo => {
      this.context.dyDebug.debugInfoMap.set(debugInfo.id, debugInfo)
      setTimeout(() => {
        this.forceUpdate()
      })
    })

    this.context.dyDebug.event.on('focusActionDetail', this.handleFocusActionDetail)
  }

  public componentWillUnmount() {
    this.context.dyDebug.event.on('focusActionDetail', this.handleFocusActionDetail)
  }

  public render() {
    return (
      <S.Container>
        {/* provider root */}
        <S.ChildrenContainer>
          {this.props.children}
        </S.ChildrenContainer>

        {this.renderToolBox()}
      </S.Container>
    )
  }

  private getDebugInfoArray = () => {
    return Array
      .from((this.context.dyDebug.debugInfoMap as Map<number, IDebugInfo>).values())
      .sort((left, right) => right.id - left.id)
  }

  /**
   * 高亮列表中某个 debugId，对列表来说，移动到这个元素上
   */
  private handleFocusActionDetail = (debugId: number) => {
    // 找到是列表中第几个元素
    const debugInfos = this.getDebugInfoArray()

    const debugIndex = debugInfos.findIndex(debugInfo => debugInfo.id === debugId)
    if (debugIndex === -1) {
      return
    }

    const childDOM = this.actionContainerDOM.firstChild.childNodes[debugIndex] as HTMLElement

    if (!childDOM) {
      return
    }

    this.scrollTopDebugItem(this.actionContainerDOM, childDOM)
  }

  private scrollTopDebugItem = debounce((parentDOM: HTMLElement, childDOM: HTMLElement) => {
    scrollTo(this.actionContainerDOM, childDOM.offsetTop, 50)
  }, 60)

  private renderToolBox = () => {
    const debugInfos = this.getDebugInfoArray()

    const Debugs = debugInfos.map((debugInfo, index) => {
      return (
        <DebugLine
          key={debugInfo.id}
          searchValue={this.state.searchValue}
          debugInfo={debugInfo}
          dyDebug={this.context.dyDebug}
        />
      )
    })

    return (
      <S.ToolContainer>
        <S.HelperContainer>
          <S.HelperInput onChange={event => {
            this.setState({
              searchValue: event.currentTarget.value
            })
          }} placeholder="搜索 action.." />
          <S.HelperButton onClick={this.handleClear}>清空</S.HelperButton>
        </S.HelperContainer>

        <S.ToolScrollContainer
          ref={ref => {
            if (!this.actionContainerDOM) {
              this.actionContainerDOM = ReactDOM.findDOMNode(ref) as HTMLElement
            }
          }}
        >
          <S.ActionContainer>
            {Debugs}
          </S.ActionContainer>
        </S.ToolScrollContainer>
      </S.ToolContainer>
    )
  }

  private handleClear = () => {
    this.context.dyDebug.debugInfoMap.clear()
    setTimeout(() => {
      this.forceUpdate()
    })
  }
}