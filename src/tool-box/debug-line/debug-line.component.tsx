import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Props, State } from './debug-line.type'

import { Action } from './action/action.component'
import { Isolated } from './isolated/isolated.component'

export class DebugLine extends React.PureComponent<Props, State>{
  static defaultProps = new Props()
  public state = new State()

  public render() {
    switch (this.props.debugInfo.type) {
      case 'action':
        return (
          <Action
            searchValue={this.props.searchValue}
            debugInfo={this.props.debugInfo}
            dyDebug={this.props.dyDebug}
            onClick={this.props.onClick}
            onMouseEnter={this.props.onMouseEnter}
            onMouseLeave={this.props.onMouseLeave}
          />
        )
      case 'isolated':
        return (
          <Isolated
            searchValue={this.props.searchValue}
            debugInfo={this.props.debugInfo}
            dyDebug={this.props.dyDebug}
            onClick={this.props.onClick}
            onMouseEnter={this.props.onMouseEnter}
            onMouseLeave={this.props.onMouseLeave}
          />
        )
      default:
        return null
    }
  }
}