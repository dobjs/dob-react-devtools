import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'
import { IDebugInfo } from 'dob'

import * as S from './debug-box.style'
import { Props, State } from './debug-box.type'
import { RenderTo } from '../../components/render-to/src'

import { DebugLine } from '../../tool-box/debug-line/debug-line.component'

/**
 * 根据 render 次数渲染颜色
 */
function renderCount(count: number) {
  let level = 'normal'

  if (count < 5) {
    level = 'normal'
  }

  if (count >= 5 && count < 10) {
    level = 'frequently'
  }

  if (count >= 10 && count < 20) {
    level = 'warning'
  }

  if (count >= 20) {
    level = 'danger'
  }

  return <S.RenderCount theme={{ level }}>{count}</S.RenderCount>
}

export class DebugBox extends React.PureComponent<Props, State>{
  static defaultProps = new Props()
  public state = new State()

  private restartAnimationTimeout: any = null
  private showCountTimeout: any = null

  /**
   * 对应元素 dom
   */
  private realChildDOM: HTMLElement = undefined

  /**
   * 高亮 box dom
   */
  private highLightBoxDOM: HTMLElement = null

  /**
   * 保留全部 debugIds
   */
  private allDebugIds = new Set<number>()

  /**
   * 鼠标是否在元素内
   */
  private isMouseEnter = false

  private isMount = false

  public componentWillMount() {
    this.isMount = true

    this.props.dyDebug.event.on('focusDebug', this.handleFocusDebug)
    this.props.dyDebug.event.on('unFocusDebug', this.handleUnFocusDebug)
  }

  public componentWillUnmount() {
    this.isMount = false

    this.props.dyDebug.event.off('focusDebug', this.handleFocusDebug)
    this.props.dyDebug.event.off('unFocusDebug', this.handleUnFocusDebug)
  }

  public render() {
    return (
      <S.Container>
        <S.HighLightBox
          ref={ref => {
            this.highLightBoxDOM = ReactDOM.findDOMNode(ref) as HTMLElement
          }}
          style={{
            left: this.state.left,
            top: this.state.top,
            width: this.state.width,
            height: this.state.height
          }}
        />

        {this.renderDebug()}
      </S.Container>
    )
  }

  /**
   * 外部调用 设置 realChildDOM
   */
  public setRealChildDOM = (element: HTMLElement) => {
    this.realChildDOM = element
  }

  /**
   * 外部调用 增加一个 debugId
   */
  public addDebugId = (debugId: number) => {
    if (this.allDebugIds.has(debugId)) {
      // 防止死循环
      return
    }

    if (!this.realChildDOM) {
      return
    }

    this.allDebugIds.add(debugId)

    const realChildRect = this.realChildDOM.getBoundingClientRect()

    this.setState(state => {
      const newDebugIds = state.debugIds.slice()
      newDebugIds.push(debugId)

      return {
        renderCount: state.renderCount + 1,
        showCount: true,
        debugIds: newDebugIds,
        left: realChildRect.left,
        top: realChildRect.top,
        width: realChildRect.width,
        height: realChildRect.height
      }
    })

    this.highlight()
  }

  private renderDebug = () => {
    if (this.state.showDetail) {
      return (
        <S.DebugContainer
          style={{
            left: this.state.left,
            top: this.state.top
          }}
        >
          {this.renderDebugDetail()}
        </S.DebugContainer>
      )
    } else {
      return (
        <S.DebugContainer
          style={{
            left: this.state.left,
            top: this.state.top
          }}
        >
          {this.renderDebugSimple()}
        </S.DebugContainer>
      )
    }
  }

  private renderDebugSimple = () => {
    if (!this.state.showCount) {
      return null
    }

    return (
      <S.CountTag
        onMouseEnter={() => {
          this.isMouseEnter = true
          this.setState({
            showDetail: true
          })
        }}
      >
        {renderCount(this.state.renderCount)}
      </S.CountTag>
    )
  }

  private renderDebugDetail = () => {
    if (!this.state.showCount) {
      return null
    }

    return (
      <S.DetailContainer
        onMouseLeave={() => {
          this.isMouseEnter = false
          this.setState({
            showDetail: false
          })
        }}
      >
        <S.CallContainer>
          dob rerender:&nbsp;
          <S.CallNumber>{renderCount(this.state.renderCount)}</S.CallNumber>
        </S.CallContainer>

        <S.ActionScroll>
          <S.ActionList>
            {this.renderActionList()}
          </S.ActionList>
        </S.ActionScroll>
      </S.DetailContainer>
    )
  }

  private renderActionList = () => {
    const debugInfos = this.props.dyDebug.debugInfoMap as Map<number, IDebugInfo>

    return this.state.debugIds
      .filter(debugId => debugId !== undefined && debugId !== null)
      .filter(debugId => debugInfos.has(debugId))
      .sort((left, right) => right - left)
      .map((debugId, index) => {
        return (
          <DebugLine
            onClick={() => {
              this.props.dyDebug.event.emit('toggleActionDetail', debugId)
            }}
            key={index}
            onMouseEnter={() => {
              this.props.dyDebug.event.emit('focusActionDetail', debugId)
            }}
            onMouseLeave={() => {
              this.props.dyDebug.event.emit('unFocusActionDetail', debugId)
            }}
            debugInfo={debugInfos.get(debugId)}
            dyDebug={this.props.dyDebug}
          />
        )
      })
  }

  private handleFocusDebug = (debugId: number) => {
    if (!this.allDebugIds.has(debugId)) {
      return
    }

    this.highlight()
  }

  private handleUnFocusDebug = (debugId: number) => {
    if (!this.allDebugIds.has(debugId)) {
      return
    }

    this.removeHighlight()
  }

  /**
   * 立刻闪一下
   */
  private highlight = () => {
    if (!this.realChildDOM) {
      return
    }

    // 更新位置
    const realChildRect = this.realChildDOM.getBoundingClientRect()
    this.setState({
      left: realChildRect.left,
      top: realChildRect.top,
      width: realChildRect.width,
      height: realChildRect.height
    })

    this.highLightBoxDOM.classList.remove('dob-debug-animation')

    clearTimeout(this.restartAnimationTimeout)
    this.restartAnimationTimeout = setTimeout(() => {
      if (!this.isMount) {
        return
      }

      this.highLightBoxDOM.classList.add('dob-debug-animation')

      this.removeCountLater()
    })
  }

  /**
   * 立刻移除闪动
   */
  private removeHighlight = () => {
    if (!this.realChildDOM) {
      return
    }

    this.highLightBoxDOM.classList.remove('dob-debug-animation')
    this.removeCountLater(0)
  }

  /**
   * 稍后移除 count
   */
  private removeCountLater = (timeout = 3000) => {
    clearTimeout(this.showCountTimeout)

    this.showCountTimeout = setTimeout(() => {
      // 如果鼠标还在元素上，再暂缓移除
      if (this.isMouseEnter) {
        this.removeCountLater(500)
        return
      }

      if (!this.isMount) {
        return
      }

      this.setState(state => {
        return {
          renderCount: 0,
          showCount: false,
          debugIds: []
        }
      })
    }, timeout)
  }
}